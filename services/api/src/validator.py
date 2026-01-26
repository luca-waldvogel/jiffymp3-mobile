from urllib.parse import urlparse


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
