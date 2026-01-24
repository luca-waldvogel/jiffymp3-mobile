import yt_dlp
import os


def download_youtube_video_as_mp3(url, output_path):
    # Optionen für yt-dlp, um das Audio als MP3 zu extrahieren
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
        "outtmpl": os.path.join(
            output_path, "%(title)s.%(ext)s"
        ),  # Speicherort und Dateiname
    }

    # Verwenden von yt-dlp zum Herunterladen und Konvertieren
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])


# Beispielaufruf der Funktion
download_youtube_video_as_mp3(
    "https://www.youtube.com/watch?v=16jA-6hiSUo", "./downloads"
)
