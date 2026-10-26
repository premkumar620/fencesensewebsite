from urllib.parse import quote

from rest_framework import serializers

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


def office_maps(lines):
    query = f"{', '.join(lines)}, India"
    return {
        "mapsQuery": query,
        "mapsHref": f"https://www.google.com/maps/search/?api=1&query={quote(query)}",
        "mapsEmbedSrc": f"https://www.google.com/maps?q={quote(query)}&hl=en&z=16&output=embed",
    }


class OfficeSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source="key")
    lines = serializers.ListField(child=serializers.CharField(), read_only=True)
    primary = serializers.BooleanField(source="is_primary")
    mapsHref = serializers.SerializerMethodField()
    mapsEmbedSrc = serializers.SerializerMethodField()

    class Meta:
        model = Office
        fields = (
            "id",
            "label",
            "city",
            "region",
            "title",
            "lines",
            "phone",
            "cin",
            "primary",
            "sort_order",
            "mapsHref",
            "mapsEmbedSrc",
        )

    def get_mapsHref(self, obj):
        return office_maps(obj.lines)["mapsHref"]

    def get_mapsEmbedSrc(self, obj):
        return office_maps(obj.lines)["mapsEmbedSrc"]


class CompanyProfileSerializer(serializers.ModelSerializer):
    phoneHref = serializers.SerializerMethodField()

    class Meta:
        model = CompanyProfile
        fields = ("name", "phone", "phoneHref", "email", "cin")

    def get_phoneHref(self, obj):
        digits = "".join(ch for ch in obj.phone if ch.isdigit())
        suffix = digits[-10:] if len(digits) >= 10 else digits
        return f"tel:+91{suffix}" if suffix else f"tel:{obj.phone}"


class StatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stat
        fields = ("id", "value", "suffix", "label", "sort_order")


class OfferingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Offering
        fields = ("id", "title", "sort_order")


class SocialLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialLink
        fields = ("id", "label", "href", "sort_order")


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = ("id", "quote", "name", "role", "logo", "sort_order")


class PartnerLogoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PartnerLogo
        fields = ("id", "image", "alt_text", "sort_order")


class CustomerLogoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerLogo
        fields = ("id", "image", "alt_text", "sort_order")


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = ("pages",)
