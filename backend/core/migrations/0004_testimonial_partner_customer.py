from django.db import migrations, models


def copy_json_to_models(apps, schema_editor):
    SiteSettings = apps.get_model("core", "SiteSettings")
    Testimonial = apps.get_model("core", "Testimonial")
    PartnerLogo = apps.get_model("core", "PartnerLogo")
    CustomerLogo = apps.get_model("core", "CustomerLogo")

    settings = SiteSettings.objects.filter(pk=1).first()
    if not settings:
        return

    if not Testimonial.objects.exists():
        for index, row in enumerate(settings.testimonials or []):
            if not isinstance(row, dict):
                continue
            Testimonial.objects.create(
                quote=row.get("quote", ""),
                name=row.get("name", f"Customer {index + 1}"),
                role=row.get("role", ""),
                logo=row.get("logo", ""),
                sort_order=index,
                is_published=True,
            )

    if not PartnerLogo.objects.exists():
        for index, path in enumerate(settings.partner_logos or []):
            if not path:
                continue
            PartnerLogo.objects.create(image=path, sort_order=index, is_published=True)

    if not CustomerLogo.objects.exists():
        for index, path in enumerate(settings.customer_logos or []):
            if not path:
                continue
            CustomerLogo.objects.create(image=path, sort_order=index, is_published=True)


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0003_sitesettings_pages"),
    ]

    operations = [
        migrations.CreateModel(
            name="Testimonial",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("quote", models.TextField()),
                ("name", models.CharField(max_length=120)),
                ("role", models.CharField(help_text="e.g. CIO - Company name", max_length=200)),
                ("logo", models.CharField(help_text="Image path or URL, e.g. /testimonials/logo.svg", max_length=500)),
                ("sort_order", models.PositiveSmallIntegerField(default=0)),
                ("is_published", models.BooleanField(default=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "verbose_name": "Customer testimonial",
                "verbose_name_plural": "Customer testimonials (Trusted by Our Customers)",
                "ordering": ["sort_order", "id"],
            },
        ),
        migrations.CreateModel(
            name="PartnerLogo",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("image", models.CharField(help_text="e.g. /partners/01.png", max_length=500)),
                ("alt_text", models.CharField(blank=True, max_length=200)),
                ("sort_order", models.PositiveSmallIntegerField(default=0)),
                ("is_published", models.BooleanField(default=True)),
            ],
            options={
                "verbose_name": "Partner logo",
                "verbose_name_plural": "Partner logos",
                "ordering": ["sort_order", "id"],
            },
        ),
        migrations.CreateModel(
            name="CustomerLogo",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("image", models.CharField(help_text="e.g. /customers/01.png", max_length=500)),
                ("alt_text", models.CharField(blank=True, max_length=200)),
                ("sort_order", models.PositiveSmallIntegerField(default=0)),
                ("is_published", models.BooleanField(default=True)),
            ],
            options={
                "verbose_name": "Customer logo",
                "verbose_name_plural": "Customer logos",
                "ordering": ["sort_order", "id"],
            },
        ),
        migrations.RunPython(copy_json_to_models, migrations.RunPython.noop),
    ]
