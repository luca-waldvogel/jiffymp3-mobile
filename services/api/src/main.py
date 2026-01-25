import logging
import os
import shutil
import tempfile
from urllib.parse import urlparse

import yt_dlp
from flask import Flask, jsonify, request
from yt_dlp import utils as ytdlp_utils

logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)


def is_valid_youtube_url(url):
    """
    Validate that the URL is from YouTube and properly formatted.

    Args:
        url: The URL to validate

    Returns:
        bool: True if the URL is valid, False otherwise
    """
    if not url or not isinstance(url, str):
        return False

    try:
        parsed = urlparse(url)

        # Check for valid scheme (http or https only)
        if parsed.scheme not in ["http", "https"]:
            return False

        # Check for allowed YouTube domains
        allowed_domains = [
            "youtube.com",
            "www.youtube.com",
            "m.youtube.com",
            "youtu.be",
            "music.youtube.com",
        ]

        if parsed.netloc not in allowed_domains:
            return False

        # Additional validation for youtube.com URLs - should have /watch or /playlist paths
        youtube_com_domains = [
            "youtube.com",
            "www.youtube.com",
            "m.youtube.com",
            "music.youtube.com",
        ]
        if parsed.netloc in youtube_com_domains:
            valid_paths = ["/watch", "/playlist", "/shorts", "/live"]
            if not any(parsed.path.startswith(path) for path in valid_paths):
                return False

        # For youtu.be, ensure there's a video ID in the path
        if parsed.netloc == "youtu.be":
            # Should have a path like /VIDEO_ID
            if not parsed.path or len(parsed.path) <= 1:
                return False

        return True

    except Exception:
        return False


COOKIE_FILE = os.environ.get("YT_DLP_COOKIE_FILE")


def get_youtube_title(url: str) -> str:
    """Extract and return the video title without downloading."""
    # Use a writable temp copy of cookies to avoid writing to a read-only mount
    temp_cookie = None
    if COOKIE_FILE:
        tmp_dir = tempfile.mkdtemp()
        temp_cookie = os.path.join(tmp_dir, "cookies.txt")
        try:
            shutil.copy(COOKIE_FILE, temp_cookie)
        except Exception as copy_err:
            logging.warning(
                "Could not copy cookie file for title extraction: %s", copy_err
            )
            temp_cookie = None

    ydl_opts = {
        "quiet": True,
        "no_warnings": True,
        "noplaylist": True,
        "http_headers": {"User-Agent": "Mozilla/5.0"},
    }
    if temp_cookie:
        ydl_opts["cookiefile"] = temp_cookie

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=False)
        title = info.get("title") if info else None
        if not title:
            raise ytdlp_utils.DownloadError("Could not extract title from URL")
        return title


def download_youtube_video_as_mp3(url, output_path):
    # If a cookie file is provided, copy it into the writable temp dir to avoid write attempts on read-only mounts
    cookiefile_path = None
    if COOKIE_FILE:
        cookiefile_path = os.path.join(output_path, "cookies.txt")
        try:
            shutil.copy(COOKIE_FILE, cookiefile_path)
        except Exception as copy_err:
            logging.warning("Could not copy cookie file: %s", copy_err)
            cookiefile_path = None

    def build_opts(prefer_non_hls: bool):
        fmt = (
            "bestaudio[protocol!*=m3u8][protocol!*=m3u8_native]/bestaudio[ext=m4a]/bestaudio[ext=webm]/bestaudio/best"
            if prefer_non_hls
            else "bestaudio/best"
        )
        opts = {
            "age_limit": 99,
            "format": fmt,
            "postprocessors": [
                {
                    "key": "FFmpegExtractAudio",
                    "preferredcodec": "mp3",
                    "preferredquality": "128",
                }
            ],
            "postprocessor_args": {
                "FFmpegExtractAudio": [
                    "-hide_banner",
                    "-loglevel",
                    "error",
                    "-protocol_whitelist",
                    "file,http,https,tcp,tls,crypto",
                ]
            },
            "outtmpl": os.path.join(output_path, "%(id)s.%(ext)s"),
            "paths": {"home": output_path},
            "retries": 5,
            "fragment_retries": 5,
            "concurrent_fragment_downloads": 3,
            "skip_unavailable_fragments": True,
            "ignoreerrors": True,
            "allow_unplayable_formats": not prefer_non_hls,
            "noplaylist": True,
            "cachedir": False,
            "hls_prefer_native": True,
            "prefer_ffmpeg": True,
            "http_chunk_size": 10 * 1024 * 1024,
            "force_ipv4": True,
            "geo_bypass": True,
            "quiet": True,
            "no_warnings": True,
            "http_headers": {"User-Agent": "Mozilla/5.0"},
        }
        if cookiefile_path:
            opts["cookiefile"] = cookiefile_path
        return opts

    # Try non-HLS first, then fallback to permissive format (may include HLS)
    for prefer_non_hls in (True, False):
        ydl_opts = build_opts(prefer_non_hls)
        logging.debug("yt-dlp options (prefer_non_hls=%s)", prefer_non_hls)
        try:
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(url, download=True)
                if not info:
                    raise ytdlp_utils.DownloadError(
                        "No info returned; requested format unavailable"
                    )
                filename = ydl.prepare_filename(info)
                mp3_filename = os.path.splitext(filename)[0] + ".mp3"
                if os.path.isfile(mp3_filename):
                    return mp3_filename
                logging.warning(
                    "MP3 not found after postprocess; trying fallback if available"
                )
        except ytdlp_utils.DownloadError as e:
            logging.warning("yt-dlp failed (prefer_non_hls=%s): %s", prefer_non_hls, e)
            continue

    raise ytdlp_utils.DownloadError(
        "Download failed in all strategies; no MP3 produced"
    )


@app.route("/convert", methods=["POST"])
def download():
    if not request.is_json:
        return jsonify(
            {"error": "Request must be JSON with Content-Type application/json"}
        ), 400

    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"error": "JSON body must be an object"}), 400
    youtube_url = data.get("url")

    if not youtube_url:
        return jsonify({"error": "No URL provided"}), 400

    # Validate the URL before processing
    if not is_valid_youtube_url(youtube_url):
        return jsonify(
            {"error": "Invalid YouTube URL. Only YouTube URLs are allowed."}
        ), 400
    try:
        title = get_youtube_title(youtube_url)
        return jsonify({"title": title}), 200
    except ytdlp_utils.DownloadError as dl_err:
        logging.error("yt-dlp error (title extraction): %s", dl_err)
        return jsonify(
            {"error": "Title extraction failed", "details": str(dl_err)}
        ), 502
    except Exception:
        logging.exception("Error during title extraction")
        return jsonify({"error": "Internal server error during title extraction"}), 500


if __name__ == "__main__":
    app.run()
