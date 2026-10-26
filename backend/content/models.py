from django.db import models


class Service(models.Model):
    """Professional / managed services — separate from product-style solutions."""

    class Category(models.TextChoices):
        CONSULTING = "consulting", "Consulting & professional services"
        MANAGED = "managed", "Managed security / SOC"
        EXPERTISE = "expertise", "On-demand expertise"
        CLOUD = "cloud", "Cloud services"
        ASSESSMENT = "assessment", "Assessment & testing (VA/PT/BAS)"
        DETECTION = "detection", "Detection & response"
        OTHER = "other", "Other"

    slug = models.SlugField(max_length=120, unique=True)
    title = models.CharField(max_length=200)
    kicker = models.CharField(max_length=200, blank=True)
    summary = models.TextField(blank=True)
    paragraphs = models.JSONField(default=list, blank=True)
    points = models.JSONField(default=list, blank=True)
    hero_image = models.CharField(max_length=500, blank=True, help_text="Banner, e.g. /services/banners/….png")
    icon = models.CharField(max_length=500, blank=True, help_text="Optional list icon")
    category = models.CharField(
        max_length=32,
        choices=Category.choices,
        default=Category.OTHER,
        help_text="How this service is delivered / grouped in admin.",
    )
    engagement_model = models.CharField(
        max_length=255,
        blank=True,
        help_text="e.g. Project-based consulting, 24/7 managed SOC, retainer",
    )
    benefits_title = models.CharField(
        max_length=255,
        blank=True,
        help_text="Detail page — Key benefits section heading.",
    )
    methodology_title = models.CharField(
        max_length=255,
        blank=True,
        help_text="Detail page — methodology section heading.",
    )
    cta_title = models.CharField(max_length=255, blank=True, help_text="Expert CTA band heading.")
    cta_text = models.TextField(blank=True, help_text="Expert CTA band paragraph.")
    detail_content = models.JSONField(
        default=dict,
        blank=True,
        help_text="Legacy JSON fallback if benefit/methodology rows are empty.",
    )
    sort_order = models.PositiveSmallIntegerField(default=0)
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["sort_order", "title"]
        verbose_name = "Service"
        verbose_name_plural = "Services"

    def __str__(self):
        return self.title


class Solution(models.Model):
    """Platform / domain solutions — separate fields from services."""

    class Domain(models.TextChoices):
        SECURITY = "security", "Security"
        NETWORK = "network", "Network"
        APPLICATION = "application", "Application delivery"
        IAM = "iam", "Identity & access (IAM)"
        CLOUD = "cloud", "Cloud"
        DIGITAL = "digital", "Digital"
        OTHER = "other", "Other"

    slug = models.SlugField(max_length=120, unique=True)
    title = models.CharField(max_length=200)
    kicker = models.CharField(max_length=200, blank=True)
    summary = models.TextField(blank=True)
    paragraphs = models.JSONField(default=list, blank=True)
    points = models.JSONField(default=list, blank=True)
    hero_image = models.CharField(max_length=500, blank=True, help_text="Banner, e.g. /solutions/banners/….jpg")
    icon = models.CharField(max_length=500, blank=True, help_text="Card icon, e.g. /solutions/security.png")
    domain = models.CharField(
        max_length=32,
        choices=Domain.choices,
        default=Domain.OTHER,
        help_text="Solution area shown in admin and API.",
    )
    outcome_summary = models.CharField(
        max_length=255,
        blank=True,
        help_text="Short outcome line for listings (optional).",
    )
    benefits_title = models.CharField(max_length=255, blank=True)
    methodology_title = models.CharField(max_length=255, blank=True)
    cta_title = models.CharField(max_length=255, blank=True)
    cta_text = models.TextField(blank=True)
    detail_content = models.JSONField(
        default=dict,
        blank=True,
        help_text="Legacy JSON fallback if benefit/methodology rows are empty.",
    )
    sort_order = models.PositiveSmallIntegerField(default=0)
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["sort_order", "title"]
        verbose_name = "Solution"
        verbose_name_plural = "Solutions"

    def __str__(self):
        return self.title


class ServiceBenefit(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name="benefit_blocks")
    title = models.CharField(max_length=200)
    description = models.TextField(
        blank=True,
        help_text="Optional paragraph under the title (use this OR bullet lines below).",
    )
    bullets = models.TextField(
        blank=True,
        help_text="One bullet per line — shown as Key benefit body when filled.",
    )
    icon = models.CharField(max_length=500, blank=True, help_text="Optional icon path.")
    action_label = models.CharField(max_length=120, blank=True)
    sort_order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["sort_order", "id"]
        verbose_name = "Key benefit"
        verbose_name_plural = "Key benefits"

    def __str__(self):
        return self.title

    def bullet_items(self):
        return [line.strip() for line in self.bullets.splitlines() if line.strip()]


class ServiceMethodologyStep(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name="methodology_steps")
    step = models.CharField(max_length=8, help_text="e.g. 01")
    title = models.CharField(max_length=120)
    text = models.TextField()
    sort_order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["sort_order", "id"]
        verbose_name = "Methodology step"
        verbose_name_plural = "Methodology steps"

    def __str__(self):
        return f"{self.step} {self.title}"


class ServiceFaq(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name="faq_items")
    question = models.CharField(max_length=500)
    answer = models.TextField()
    sort_order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["sort_order", "id"]
        verbose_name = "FAQ"
        verbose_name_plural = "FAQs"

    def __str__(self):
        return self.question[:60]


class SolutionBenefit(models.Model):
    solution = models.ForeignKey(Solution, on_delete=models.CASCADE, related_name="benefit_blocks")
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    bullets = models.TextField(blank=True, help_text="One bullet per line.")
    icon = models.CharField(max_length=500, blank=True)
    action_label = models.CharField(max_length=120, blank=True)
    sort_order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["sort_order", "id"]
        verbose_name = "Key benefit"
        verbose_name_plural = "Key benefits"

    def __str__(self):
        return self.title

    def bullet_items(self):
        return [line.strip() for line in self.bullets.splitlines() if line.strip()]


class SolutionMethodologyStep(models.Model):
    solution = models.ForeignKey(Solution, on_delete=models.CASCADE, related_name="methodology_steps")
    step = models.CharField(max_length=8)
    title = models.CharField(max_length=120)
    text = models.TextField()
    sort_order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["sort_order", "id"]
        verbose_name = "Methodology step"
        verbose_name_plural = "Methodology steps"

    def __str__(self):
        return f"{self.step} {self.title}"


class SolutionFaq(models.Model):
    solution = models.ForeignKey(Solution, on_delete=models.CASCADE, related_name="faq_items")
    question = models.CharField(max_length=500)
    answer = models.TextField()
    sort_order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ["sort_order", "id"]
        verbose_name = "FAQ"
        verbose_name_plural = "FAQs"

    def __str__(self):
        return self.question[:60]


class BlogPost(models.Model):
    slug = models.SlugField(max_length=160, unique=True)
    title = models.CharField(max_length=255)
    excerpt = models.TextField(blank=True)
    body = models.TextField(blank=True)
    author = models.CharField(max_length=120, blank=True)
    image = models.CharField(max_length=500, blank=True)
    day_label = models.CharField(max_length=8, blank=True)
    month_label = models.CharField(max_length=8, blank=True)
    date_display = models.CharField(max_length=64, blank=True)
    paragraphs = models.JSONField(default=list, blank=True)
    published_at = models.DateField(null=True, blank=True)
    is_published = models.BooleanField(default=True)

    class Meta:
        ordering = ["-published_at", "-id"]

    def __str__(self):
        return self.title
