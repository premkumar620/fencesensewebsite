from pathlib import Path

from django.contrib import admin
from django.utils.html import format_html

from .models import (
    CompanyProfile,
    CustomerLogo,
    Offering,
    Office,
    PartnerLogo,
    SiteSettings,
    SocialLink,
    Stat,
    Testimonial,
)


@admin.register(Stat)
class StatAdmin(admin.ModelAdmin):
    list_display = ("label", "value", "suffix", "sort_order", "is_published")
    list_display_links = ("label",)
    list_editable = ("value", "suffix", "sort_order", "is_published")
    list_filter = ("is_published",)
    ordering = ("sort_order", "id")


@admin.register(Offering)
class OfferingAdmin(admin.ModelAdmin):
    list_display = ("title", "sort_order", "is_published")
    list_display_links = ("title",)
    list_editable = ("sort_order", "is_published")
    list_filter = ("is_published",)
    search_fields = ("title",)
    ordering = ("sort_order", "id")


@admin.register(SocialLink)
class SocialLinkAdmin(admin.ModelAdmin):
    list_display = ("label", "href", "sort_order", "is_published")
    list_editable = ("sort_order", "is_published")
    list_filter = ("is_published",)
    search_fields = ("label", "href")
    ordering = ("sort_order", "id")


def _image_preview(src, height=40):
    if not src:
        return "—"
    return format_html(
        '<img src="{}" alt="" style="height:{}px;max-width:220px;object-fit:contain;background:#1a1a1a;padding:4px;border-radius:4px;" />',
        src,
        height,
    )


class LogoAdmin(admin.ModelAdmin):
    """Replace a partner or customer logo from the change form."""

    list_display = ("preview", "label", "sort_order", "is_published")
    list_display_links = ("label",)
    list_editable = ("sort_order", "is_published")
    list_filter = ("is_published",)
    search_fields = ("image", "alt_text")
    ordering = ("sort_order", "id")
    readonly_fields = ("current_logo",)
    fieldsets = (
        (
            None,
            {
                "fields": ("current_logo", "image_file", "alt_text"),
                "description": "Upload a new file to replace the logo on the site. PNG, JPG, WEBP, GIF, and SVG are accepted.",
            },
        ),
        ("Order", {"fields": ("sort_order", "is_published")}),
        (
            "Advanced",
            {
                "classes": ("collapse",),
                "fields": ("image",),
                "description": "Optional path such as /partners/01.png. An uploaded file is used instead of this path.",
            },
        ),
    )

    @admin.display(description="Name")
    def label(self, obj):
        if obj.alt_text:
            return obj.alt_text
        source = obj.image or getattr(obj.image_file, "name", "") or ""
        return Path(source).name or f"Logo {obj.pk}"

    @admin.display(description="Logo")
    def preview(self, obj):
        return _image_preview(obj.resolved_image())

    @admin.display(description="Current logo")
    def current_logo(self, obj):
        src = obj.resolved_image()
        if not src:
            return "No logo yet. Upload one below."
        return _image_preview(src, height=72)


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ("preview", "name", "role", "sort_order", "is_published")
    list_editable = ("sort_order", "is_published")
    list_filter = ("is_published",)
    search_fields = ("name", "role", "quote")
    ordering = ("sort_order", "id")
    fields = ("quote", "name", "role", "logo_file", "logo", "sort_order", "is_published")

    @admin.display(description="Logo")
    def preview(self, obj):
        return _image_preview(obj.resolved_logo())


@admin.register(PartnerLogo)
class PartnerLogoAdmin(LogoAdmin):
    pass


@admin.register(CustomerLogo)
class CustomerLogoAdmin(LogoAdmin):
    pass


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    fieldsets = (
        (
            "Page copy (JSON)",
            {
                "fields": ("pages",),
                "description": (
                    "Stats, offerings, socials, testimonials, and logos are separate admin menus. "
                    "Here you only edit Home/About text in <code>pages</code> JSON."
                ),
            },
        ),
        ("Meta", {"fields": ("updated_at",)}),
    )
    readonly_fields = ("updated_at",)

    def has_add_permission(self, request):
        return not SiteSettings.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(Office)
class OfficeAdmin(admin.ModelAdmin):
    list_display = ("key", "label", "city", "is_primary", "is_published", "sort_order")
    prepopulated_fields = {"key": ("city",)}
    list_editable = ("sort_order", "is_published", "is_primary")
    list_filter = ("is_published", "is_primary")
    search_fields = ("city", "label", "address_line_1")
    fieldsets = (
        (None, {"fields": ("key", "label", "city", "region", "title", "is_primary", "sort_order", "is_published")}),
        ("Address", {"fields": ("address_line_1", "address_line_2", "address_line_3", "address_line_4")}),
        ("Contact", {"fields": ("phone", "cin")}),
    )


@admin.register(CompanyProfile)
class CompanyProfileAdmin(admin.ModelAdmin):
    readonly_fields = ("updated_at",)

    def has_add_permission(self, request):
        return not CompanyProfile.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False
