from django.db import migrations, models


SERVICE_CATEGORY_BY_SLUG = {
    "professional-services": "consulting",
    "managed-security-services": "managed",
    "on-demand-professional-expertise": "expertise",
    "cloud-services": "cloud",
    "bas-penetration-testing": "assessment",
    "threat-hunting": "detection",
    "breach-detection": "detection",
}

SOLUTION_DOMAIN_BY_SLUG = {
    "security-solution": "security",
    "network-solution": "network",
    "application-delivery-solution": "application",
    "identity-access-management-iam": "iam",
    "cloud-solution": "cloud",
    "digital-solutions": "digital",
}


def migrate_catalog_to_service_solution(apps, schema_editor):
    CatalogItem = apps.get_model("content", "CatalogItem")
    Service = apps.get_model("content", "Service")
    Solution = apps.get_model("content", "Solution")

    for row in CatalogItem.objects.filter(kind="service"):
        Service.objects.update_or_create(
            slug=row.slug,
            defaults={
                "title": row.title,
                "kicker": row.kicker,
                "summary": row.summary,
                "paragraphs": row.paragraphs,
                "points": row.points,
                "hero_image": row.hero_image,
                "icon": row.icon,
                "category": SERVICE_CATEGORY_BY_SLUG.get(row.slug, "other"),
                "detail_content": row.detail_content,
                "sort_order": row.sort_order,
                "is_published": row.is_published,
            },
        )

    for row in CatalogItem.objects.filter(kind="solution"):
        Solution.objects.update_or_create(
            slug=row.slug,
            defaults={
                "title": row.title,
                "kicker": row.kicker,
                "summary": row.summary,
                "paragraphs": row.paragraphs,
                "points": row.points,
                "hero_image": row.hero_image,
                "icon": row.icon,
                "domain": SOLUTION_DOMAIN_BY_SLUG.get(row.slug, "other"),
                "outcome_summary": row.kicker,
                "detail_content": row.detail_content,
                "sort_order": row.sort_order,
                "is_published": row.is_published,
            },
        )


class Migration(migrations.Migration):

    dependencies = [
        ("content", "0002_catalog_blog_fields"),
    ]

    operations = [
        migrations.CreateModel(
            name="Service",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("slug", models.SlugField(max_length=120, unique=True)),
                ("title", models.CharField(max_length=200)),
                ("kicker", models.CharField(blank=True, max_length=200)),
                ("summary", models.TextField(blank=True)),
                ("paragraphs", models.JSONField(blank=True, default=list)),
                ("points", models.JSONField(blank=True, default=list)),
                ("hero_image", models.CharField(blank=True, help_text="Banner, e.g. /services/banners/….png", max_length=500)),
                ("icon", models.CharField(blank=True, help_text="Optional list icon", max_length=500)),
                (
                    "category",
                    models.CharField(
                        choices=[
                            ("consulting", "Consulting & professional services"),
                            ("managed", "Managed security / SOC"),
                            ("expertise", "On-demand expertise"),
                            ("cloud", "Cloud services"),
                            ("assessment", "Assessment & testing (VA/PT/BAS)"),
                            ("detection", "Detection & response"),
                            ("other", "Other"),
                        ],
                        default="other",
                        help_text="How this service is delivered / grouped in admin.",
                        max_length=32,
                    ),
                ),
                (
                    "engagement_model",
                    models.CharField(
                        blank=True,
                        help_text="e.g. Project-based consulting, 24/7 managed SOC, retainer",
                        max_length=255,
                    ),
                ),
                (
                    "detail_content",
                    models.JSONField(blank=True, default=dict, help_text="Benefits, methodology, FAQs (detail page JSON)."),
                ),
                ("sort_order", models.PositiveSmallIntegerField(default=0)),
                ("is_published", models.BooleanField(default=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "verbose_name": "Service",
                "verbose_name_plural": "Services",
                "ordering": ["sort_order", "title"],
            },
        ),
        migrations.CreateModel(
            name="Solution",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("slug", models.SlugField(max_length=120, unique=True)),
                ("title", models.CharField(max_length=200)),
                ("kicker", models.CharField(blank=True, max_length=200)),
                ("summary", models.TextField(blank=True)),
                ("paragraphs", models.JSONField(blank=True, default=list)),
                ("points", models.JSONField(blank=True, default=list)),
                ("hero_image", models.CharField(blank=True, help_text="Banner, e.g. /solutions/banners/….jpg", max_length=500)),
                ("icon", models.CharField(blank=True, help_text="Card icon, e.g. /solutions/security.png", max_length=500)),
                (
                    "domain",
                    models.CharField(
                        choices=[
                            ("security", "Security"),
                            ("network", "Network"),
                            ("application", "Application delivery"),
                            ("iam", "Identity & access (IAM)"),
                            ("cloud", "Cloud"),
                            ("digital", "Digital"),
                            ("other", "Other"),
                        ],
                        default="other",
                        help_text="Solution area shown in admin and API.",
                        max_length=32,
                    ),
                ),
                (
                    "outcome_summary",
                    models.CharField(
                        blank=True,
                        help_text="Short outcome line for listings (optional).",
                        max_length=255,
                    ),
                ),
                (
                    "detail_content",
                    models.JSONField(blank=True, default=dict, help_text="Benefits, methodology, FAQs (detail page JSON)."),
                ),
                ("sort_order", models.PositiveSmallIntegerField(default=0)),
                ("is_published", models.BooleanField(default=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "verbose_name": "Solution",
                "verbose_name_plural": "Solutions",
                "ordering": ["sort_order", "title"],
            },
        ),
        migrations.RunPython(migrate_catalog_to_service_solution, migrations.RunPython.noop),
        migrations.DeleteModel(
            name="CatalogItem",
        ),
    ]
