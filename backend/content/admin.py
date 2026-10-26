from django.contrib import admin

from .models import (
    BlogPost,
    Service,
    ServiceBenefit,
    ServiceFaq,
    ServiceMethodologyStep,
    Solution,
    SolutionBenefit,
    SolutionFaq,
    SolutionMethodologyStep,
)


class ServiceBenefitInline(admin.TabularInline):
    model = ServiceBenefit
    extra = 1
    fields = ("sort_order", "title", "description", "bullets", "icon", "action_label")
    ordering = ("sort_order",)


class ServiceMethodologyInline(admin.TabularInline):
    model = ServiceMethodologyStep
    extra = 1
    fields = ("sort_order", "step", "title", "text")
    ordering = ("sort_order",)


class ServiceFaqInline(admin.TabularInline):
    model = ServiceFaq
    extra = 1
    fields = ("sort_order", "question", "answer")
    ordering = ("sort_order",)


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "slug", "is_published", "sort_order")
    list_display_links = ("title",)
    list_filter = ("category", "is_published")
    list_editable = ("sort_order", "is_published", "category")
    search_fields = ("title", "slug", "summary", "engagement_model")
    prepopulated_fields = {"slug": ("title",)}
    inlines = (ServiceBenefitInline, ServiceMethodologyInline, ServiceFaqInline)
    fieldsets = (
        (None, {"fields": ("title", "slug", "kicker", "summary", "sort_order", "is_published")}),
        ("Service-specific", {"fields": ("category", "engagement_model")}),
        ("Media", {"fields": ("hero_image", "icon")}),
        ("Body", {"fields": ("paragraphs", "points")}),
        (
            "Detail page — section headings",
            {
                "fields": ("benefits_title", "methodology_title", "cta_title", "cta_text"),
                "description": "Add Key benefits, Methodology steps, and FAQs using the tables below.",
            },
        ),
        (
            "Advanced",
            {
                "classes": ("collapse",),
                "fields": ("detail_content",),
                "description": "Only used if no benefit/methodology/FAQ rows exist.",
            },
        ),
    )


class SolutionBenefitInline(admin.TabularInline):
    model = SolutionBenefit
    extra = 1
    fields = ("sort_order", "title", "description", "bullets", "icon", "action_label")
    ordering = ("sort_order",)


class SolutionMethodologyInline(admin.TabularInline):
    model = SolutionMethodologyStep
    extra = 1
    fields = ("sort_order", "step", "title", "text")
    ordering = ("sort_order",)


class SolutionFaqInline(admin.TabularInline):
    model = SolutionFaq
    extra = 1
    fields = ("sort_order", "question", "answer")
    ordering = ("sort_order",)


@admin.register(Solution)
class SolutionAdmin(admin.ModelAdmin):
    list_display = ("title", "domain", "slug", "is_published", "sort_order")
    list_display_links = ("title",)
    list_filter = ("domain", "is_published")
    list_editable = ("sort_order", "is_published", "domain")
    search_fields = ("title", "slug", "summary", "outcome_summary")
    prepopulated_fields = {"slug": ("title",)}
    inlines = (SolutionBenefitInline, SolutionMethodologyInline, SolutionFaqInline)
    fieldsets = (
        (None, {"fields": ("title", "slug", "kicker", "summary", "sort_order", "is_published")}),
        ("Solution-specific", {"fields": ("domain", "outcome_summary")}),
        ("Media", {"fields": ("hero_image", "icon")}),
        ("Body", {"fields": ("paragraphs", "points")}),
        (
            "Detail page — section headings",
            {"fields": ("benefits_title", "methodology_title", "cta_title", "cta_text")},
        ),
        ("Advanced", {"classes": ("collapse",), "fields": ("detail_content",)}),
    )


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ("title", "slug", "published_at", "is_published")
    list_filter = ("is_published",)
    list_editable = ("is_published",)
    prepopulated_fields = {"slug": ("title",)}
    search_fields = ("title", "excerpt")
    fieldsets = (
        (None, {"fields": ("title", "slug", "excerpt", "author", "image", "published_at", "is_published")}),
        ("Card labels", {"fields": ("day_label", "month_label", "date_display")}),
        ("Article body", {"fields": ("paragraphs", "body")}),
    )
