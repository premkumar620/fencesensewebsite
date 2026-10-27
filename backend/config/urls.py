from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path, re_path
from django.views.static import serve

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/v1/", include("core.urls")),
    path("api/v1/content/", include("content.urls")),
    path("api/v1/enquiries/", include("enquiries.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += [
        re_path(
            r"^(?P<path>.*)$",
            serve,
            {"document_root": settings.BASE_DIR.parent / "frontend" / "public"},
        ),
    ]
