from pathlib import Path

from django.core.exceptions import ValidationError

ALLOWED_IMAGE_EXTENSIONS = {
    ".png",
    ".jpg",
    ".jpeg",
    ".jpe",
    ".jfif",
    ".gif",
    ".webp",
    ".svg",
    ".avif",
    ".bmp",
    ".ico",
    ".tif",
    ".tiff",
    ".heic",
    ".heif",
}


def _read_header(uploaded):
    fileobj = getattr(uploaded, "file", None) or uploaded
    if not hasattr(fileobj, "read"):
        return b""
    position = fileobj.tell() if hasattr(fileobj, "tell") else None
    try:
        if hasattr(fileobj, "seek"):
            fileobj.seek(0)
        return fileobj.read(512) or b""
    finally:
        if position is not None and hasattr(fileobj, "seek"):
            fileobj.seek(position)


def _looks_like_image(chunk):
    if chunk.startswith(b"\x89PNG\r\n\x1a\n"):
        return True
    if chunk.startswith(b"\xff\xd8\xff"):
        return True
    if chunk.startswith((b"GIF87a", b"GIF89a")):
        return True
    if len(chunk) >= 12 and chunk.startswith(b"RIFF") and chunk[8:12] == b"WEBP":
        return True
    if chunk.startswith(b"BM"):
        return True
    text = chunk.lstrip().lower()
    return text.startswith((b"<svg", b"<?xml")) or b"<svg" in text


def validate_image_upload(uploaded):
    if uploaded in (None, False, ""):
        return

    name = str(getattr(uploaded, "name", "") or "")
    size = getattr(uploaded, "size", None)
    if not name and not size:
        return

    extension = Path(name).suffix.lower().strip()
    if extension in ALLOWED_IMAGE_EXTENSIONS:
        return

    content_type = str(getattr(uploaded, "content_type", "") or "").split(";")[0].strip().lower()
    if content_type.startswith("image/"):
        return

    try:
        if _looks_like_image(_read_header(uploaded)):
            return
    except Exception:
        pass

    raise ValidationError("Upload a PNG, JPG, WEBP, GIF, or SVG image.")


def image_src(upload, path=""):
    """Uploaded file wins. Otherwise keep the existing public path."""
    if upload:
        try:
            url = upload.url
        except ValueError:
            url = ""
        if url:
            if not url.startswith(("http://", "https://", "/")):
                return f"/{url}"
            return url
    return path or ""
