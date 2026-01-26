import logging

import yt_dlp
from yt_dlp import utils as ytdlp_utils

logging.basicConfig(level=logging.DEBUG)


def get_youtube_title(url: str) -> str:
    # TODO: Actually convert/download the video to MP3
    """Extract and return the video title without downloading."""

    ydl_opts = {
        "quiet": True,
        "no_warnings": True,
        "noplaylist": True,
        "http_headers": {"User-Agent": "Mozilla/5.0"},
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=False)
        title = info.get("title") if info else None
        if not title:
            raise ytdlp_utils.DownloadError("Could not extract title from URL")
        return title
