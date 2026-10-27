import mimetypes

from django.apps import AppConfig


class CoreConfig(AppConfig):
    name = "core"

    def ready(self):
        mimetypes.add_type("image/jpeg", ".jfif")
        mimetypes.add_type("image/jpeg", ".jpe")
        mimetypes.add_type("image/svg+xml", ".svg")
