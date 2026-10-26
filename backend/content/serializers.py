from rest_framework import serializers

from .detail_sections import build_service_detail_content, build_solution_detail_content
from .models import BlogPost, Service, Solution


class ServiceListSerializer(serializers.ModelSerializer):
    heroImage = serializers.CharField(source="hero_image")
    engagementModel = serializers.CharField(source="engagement_model")

    class Meta:
        model = Service
        fields = (
            "slug",
            "title",
            "kicker",
            "summary",
            "paragraphs",
            "points",
            "heroImage",
            "icon",
            "category",
            "engagementModel",
            "sort_order",
        )


class ServiceDetailSerializer(ServiceListSerializer):
    detailContent = serializers.SerializerMethodField()

    class Meta(ServiceListSerializer.Meta):
        fields = ServiceListSerializer.Meta.fields + ("detailContent",)

    def get_detailContent(self, obj):
        return build_service_detail_content(obj)


class SolutionListSerializer(serializers.ModelSerializer):
    heroImage = serializers.CharField(source="hero_image")
    outcomeSummary = serializers.CharField(source="outcome_summary")

    class Meta:
        model = Solution
        fields = (
            "slug",
            "title",
            "kicker",
            "summary",
            "paragraphs",
            "points",
            "heroImage",
            "icon",
            "domain",
            "outcomeSummary",
            "sort_order",
        )


class SolutionDetailSerializer(SolutionListSerializer):
    detailContent = serializers.SerializerMethodField()

    class Meta(SolutionListSerializer.Meta):
        fields = SolutionListSerializer.Meta.fields + ("detailContent",)

    def get_detailContent(self, obj):
        return build_solution_detail_content(obj)


class BlogPostListSerializer(serializers.ModelSerializer):
    day = serializers.CharField(source="day_label")
    month = serializers.CharField(source="month_label")
    date = serializers.CharField(source="date_display")

    class Meta:
        model = BlogPost
        fields = ("slug", "title", "excerpt", "author", "image", "day", "month", "date")


class BlogPostDetailSerializer(BlogPostListSerializer):
    class Meta(BlogPostListSerializer.Meta):
        fields = BlogPostListSerializer.Meta.fields + ("paragraphs",)
