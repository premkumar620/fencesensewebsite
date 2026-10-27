from django.core.exceptions import ValidationError
from django.db import models

from .images import image_src, validate_image_upload


class CompanyProfile(models.Model):
    """Global contact and legal details (single row in admin)."""

    name = models.CharField(max_length=200, default="Fencesense Technologies Pvt. Ltd.")
    phone = models.CharField(max_length=32, default="9650731119")
    email = models.EmailField(default="info@fencesense.com")
    cin = models.CharField("CIN", max_length=32, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Company profile"
        verbose_name_plural = "Company profile"

    def __str__(self):
        return self.name

    @classmethod
    def get_solo(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj


class SiteSettings(models.Model):
    """Singleton JSON-backed home/marketing content editable in admin."""

    stats = models.JSONField(default=list, blank=True)
    offerings = models.JSONField(default=list, blank=True)
    partner_logos = models.JSONField(default=list, blank=True)
    customer_logos = models.JSONField(default=list, blank=True)
    testimonials = models.JSONField(default=list, blank=True)
    socials = models.JSONField(default=list, blank=True)
    pages = models.JSONField(
        default=dict,
        blank=True,
        help_text="Marketing copy for Home, About, etc. (JSON). See backend/ADMIN-GUIDE.md.",
    )
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Site settings"
        verbose_name_plural = "Site settings"

    def __str__(self):
        return "Site settings"

    @classmethod
    def get_solo(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj


class Stat(models.Model):
    """Home / About stats band (e.g. 10k Satisfied Clients)."""

    value = models.PositiveIntegerField()
    suffix = models.CharField(max_length=8, blank=True, help_text="e.g. k, +")
    label = models.CharField(max_length=120)
    sort_order = models.PositiveSmallIntegerField(default=0)
    is_published = models.BooleanField(default=True)

    class Meta:
        ordering = ["sort_order", "id"]
        verbose_name = "Stat"
        verbose_name_plural = "Stats (numbers band)"

    def __str__(self):
        return f"{self.value}{self.suffix} {self.label}"


class Offering(models.Model):
    """Capability / offering bullet lists on Home and About."""

    title = models.CharField(max_length=200)
    sort_order = models.PositiveSmallIntegerField(default=0)
    is_published = models.BooleanField(default=True)

    class Meta:
        ordering = ["sort_order", "id"]
        verbose_name = "Offering"
        verbose_name_plural = "Offerings"

    def __str__(self):
        return self.title


class SocialLink(models.Model):
    """Footer and contact social icons."""

    label = models.CharField(max_length=80)
    href = models.URLField(max_length=500)
    sort_order = models.PositiveSmallIntegerField(default=0)
    is_published = models.BooleanField(default=True)

    class Meta:
        ordering = ["sort_order", "id"]
        verbose_name = "Social link"
        verbose_name_plural = "Social links"

    def __str__(self):
        return self.label


class Testimonial(models.Model):
    """Trusted by Our Customers — quote slider."""

    quote = models.TextField()
    name = models.CharField(max_length=120)
    role = models.CharField(max_length=200, help_text="e.g. CIO - Company name")
    logo = models.CharField(
        max_length=500,
        blank=True,
        help_text="Optional path, e.g. /testimonials/logo.svg. Ignored when a file is uploaded.",
    )
    logo_file = models.FileField(
        upload_to="testimonials/",
        blank=True,
        validators=[validate_image_upload],
        help_text="Upload a logo. This is used instead of the path above.",
    )
    sort_order = models.PositiveSmallIntegerField(default=0)
    is_published = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)

    def resolved_logo(self):
        return image_src(self.logo_file, self.logo)

    def clean(self):
        super().clean()
        if not self.logo and not self.logo_file:
            raise ValidationError("Upload a logo or enter an image path.")

    class Meta:
        ordering = ["sort_order", "id"]
        verbose_name = "Customer testimonial"
        verbose_name_plural = "Customer testimonials (Trusted by Our Customers)"

    def __str__(self):
        return f"{self.name} — {self.role[:40]}"


class PartnerLogo(models.Model):
    """Partner companies marquee logos."""

    image = models.CharField(
        max_length=500,
        blank=True,
        help_text="Optional path, e.g. /partners/01.png. Ignored when a file is uploaded.",
    )
    image_file = models.FileField(
        upload_to="partners/",
        blank=True,
        validators=[validate_image_upload],
        help_text="Upload a logo. This is used instead of the path above.",
    )
    alt_text = models.CharField(max_length=200, blank=True)
    sort_order = models.PositiveSmallIntegerField(default=0)
    is_published = models.BooleanField(default=True)

    class Meta:
        ordering = ["sort_order", "id"]
        verbose_name = "Partner logo"
        verbose_name_plural = "Partner logos"

    def resolved_image(self):
        return image_src(self.image_file, self.image)

    def clean(self):
        super().clean()
        if not self.image and not self.image_file:
            raise ValidationError("Upload a logo or enter an image path.")

    def __str__(self):
        return self.alt_text or self.image or "Partner logo"


class CustomerLogo(models.Model):
    """Our Customers logo strip (below testimonials)."""

    image = models.CharField(
        max_length=500,
        blank=True,
        help_text="Optional path, e.g. /customers/01.png. Ignored when a file is uploaded.",
    )
    image_file = models.FileField(
        upload_to="customers/",
        blank=True,
        validators=[validate_image_upload],
        help_text="Upload a logo. This is used instead of the path above.",
    )
    alt_text = models.CharField(max_length=200, blank=True)
    sort_order = models.PositiveSmallIntegerField(default=0)
    is_published = models.BooleanField(default=True)

    class Meta:
        ordering = ["sort_order", "id"]
        verbose_name = "Customer logo"
        verbose_name_plural = "Customer logos"

    def resolved_image(self):
        return image_src(self.image_file, self.image)

    def clean(self):
        super().clean()
        if not self.image and not self.image_file:
            raise ValidationError("Upload a logo or enter an image path.")

    def __str__(self):
        return self.alt_text or self.image or "Customer logo"


class Office(models.Model):
    key = models.SlugField(max_length=80, unique=True, help_text="Stable id for frontend, e.g. new-delhi")
    label = models.CharField(max_length=120, help_text="e.g. Registered office")
    city = models.CharField(max_length=80)
    region = models.CharField(max_length=80, blank=True)
    title = models.CharField(max_length=200, default="Fencesense Technologies Pvt. Ltd.")
    address_line_1 = models.CharField(max_length=255)
    address_line_2 = models.CharField(max_length=255, blank=True)
    address_line_3 = models.CharField(max_length=255, blank=True)
    address_line_4 = models.CharField(max_length=255, blank=True)
    phone = models.CharField(max_length=32, blank=True)
    cin = models.CharField("CIN", max_length=32, blank=True)
    is_primary = models.BooleanField(default=False)
    sort_order = models.PositiveSmallIntegerField(default=0)
    is_published = models.BooleanField(default=True)

    class Meta:
        ordering = ["sort_order", "city"]

    def __str__(self):
        return f"{self.label} — {self.city}"

    @property
    def lines(self):
        return [line for line in [self.address_line_1, self.address_line_2, self.address_line_3, self.address_line_4] if line]
