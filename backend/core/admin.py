from django.contrib import admin

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


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ("name", "role", "sort_order", "is_published")
    list_editable = ("sort_order", "is_published")
    list_filter = ("is_published",)
    search_fields = ("name", "role", "quote")
    ordering = ("sort_order", "id")


@admin.register(PartnerLogo)
class PartnerLogoAdmin(admin.ModelAdmin):
    list_display = ("image", "alt_text", "sort_order", "is_published")
    list_editable = ("sort_order", "is_published")
    list_filter = ("is_published",)
    search_fields = ("image", "alt_text")
    ordering = ("sort_order", "id")


@admin.register(CustomerLogo)
class CustomerLogoAdmin(admin.ModelAdmin):
    list_display = ("image", "alt_text", "sort_order", "is_published")
    list_editable = ("sort_order", "is_published")
    list_filter = ("is_published",)
    search_fields = ("image", "alt_text")
    ordering = ("sort_order", "id")


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
