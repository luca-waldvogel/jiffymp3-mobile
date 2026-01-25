import logging
import os
import tempfile
from io import BytesIO
from urllib.parse import urlparse

import yt_dlp
from flask import Flask, jsonify, request, send_file

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
        if parsed.scheme not in ['http', 'https']:
            return False
        
        # Check for allowed YouTube domains
        allowed_domains = [
            'youtube.com',
            'www.youtube.com',
            'm.youtube.com',
            'youtu.be',
            'music.youtube.com'
        ]
        
        if parsed.netloc not in allowed_domains:
            return False
        
        # Additional validation for youtube.com URLs - should have /watch or /playlist paths
        youtube_com_domains = ['youtube.com', 'www.youtube.com', 'm.youtube.com', 'music.youtube.com']
        if parsed.netloc in youtube_com_domains:
            valid_paths = ['/watch', '/playlist', '/shorts', '/live']
            if not any(parsed.path.startswith(path) for path in valid_paths):
                return False
        
        # For youtu.be, ensure there's a video ID in the path
        if parsed.netloc == 'youtu.be':
            # Should have a path like /VIDEO_ID
            if not parsed.path or len(parsed.path) <= 1:
                return False
        
        return True
        
    except Exception:
        return False


def download_youtube_video_as_mp3(url, output_path):
    ydl_opts = {
        "cookiesfrombrowser": ("firefox",),
        "age_limit": 99,
        "extractor_args": {"youtubetab": ["skip=authcheck"]},
        "format": "bestaudio/best",
        "postprocessors": [
            {
                "key": "FFmpegExtractAudio",
                "preferredcodec": "mp3",
                "preferredquality": "128",
            }
        ],
        "outtmpl": os.path.join(output_path, "%(title)s.%(ext)s"),
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=True)
        # Get the filename that was actually created
        filename = ydl.prepare_filename(info)
        # Replace the extension with .mp3
        mp3_filename = os.path.splitext(filename)[0] + ".mp3"
        return mp3_filename


@app.route("/convert", methods=["POST"])
def download():
    data = request.json
    youtube_url = data.get("url")

    if not youtube_url:
        return jsonify({"error": "No URL provided"}), 400
    
    # Validate the URL before processing
    if not is_valid_youtube_url(youtube_url):
        return jsonify({"error": "Invalid YouTube URL. Only YouTube URLs are allowed."}), 400

    # Create a temporary directory
    with tempfile.TemporaryDirectory() as temp_dir:
        try:
            # Download the MP3 file to the temporary directory
            mp3_file_path = download_youtube_video_as_mp3(youtube_url, temp_dir)

            # Read the file into memory
            with open(mp3_file_path, "rb") as f:
                mp3_data = BytesIO(f.read())

            # Get the filename for the download
            filename = os.path.basename(mp3_file_path)

            # Return the file from memory
            mp3_data.seek(0)
            return send_file(
                mp3_data,
                as_attachment=True,
                download_name=filename,
                mimetype="audio/mpeg",
            )
        except Exception as e:
            logging.error(f"Error during download: {e}")
            return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run()
