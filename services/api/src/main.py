import logging

from flask import Flask, jsonify, request
from yt_dlp import utils as ytdlp_utils

from .converter import get_youtube_title
from .validator import is_valid_youtube_url

logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)


@app.route("/convert", methods=["POST"])
def convert():
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
