from django.db import migrations, models


def copy_site_json(apps, schema_editor):
    SiteSettings = apps.get_model("core", "SiteSettings")
    Stat = apps.get_model("core", "Stat")
    Offering = apps.get_model("core", "Offering")
    SocialLink = apps.get_model("core", "SocialLink")

    settings = SiteSettings.objects.filter(pk=1).first()
    if not settings:
        return

    if not Stat.objects.exists():
        for index, row in enumerate(settings.stats or []):
            if not isinstance(row, dict):
                continue
            Stat.objects.create(
                value=int(row.get("value") or 0),
                suffix=row.get("suffix") or "",
                label=row.get("label") or "",
                sort_order=index,
                is_published=True,
            )

    if not Offering.objects.exists():
        for index, title in enumerate(settings.offerings or []):
            if not title:
                continue
            Offering.objects.create(title=str(title), sort_order=index, is_published=True)

    if not SocialLink.objects.exists():
        for index, row in enumerate(settings.socials or []):
            if not isinstance(row, dict):
                continue
            href = row.get("href") or ""
            if not href:
                continue
            SocialLink.objects.create(
                label=row.get("label") or f"Social {index + 1}",
                href=href,
                sort_order=index,
                is_published=True,
            )


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0004_testimonial_partner_customer"),
    ]

    operations = [
        migrations.CreateModel(
            name="Stat",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("value", models.PositiveIntegerField()),
                ("suffix", models.CharField(blank=True, help_text="e.g. k, +", max_length=8)),
                ("label", models.CharField(max_length=120)),
                ("sort_order", models.PositiveSmallIntegerField(default=0)),
                ("is_published", models.BooleanField(default=True)),
            ],
            options={
                "verbose_name": "Stat",
                "verbose_name_plural": "Stats (numbers band)",
                "ordering": ["sort_order", "id"],
            },
        ),
        migrations.CreateModel(
            name="Offering",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=200)),
                ("sort_order", models.PositiveSmallIntegerField(default=0)),
                ("is_published", models.BooleanField(default=True)),
            ],
            options={
                "verbose_name": "Offering",
                "verbose_name_plural": "Offerings",
                "ordering": ["sort_order", "id"],
            },
        ),
        migrations.CreateModel(
            name="SocialLink",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("label", models.CharField(max_length=80)),
                ("href", models.URLField(max_length=500)),
                ("sort_order", models.PositiveSmallIntegerField(default=0)),
                ("is_published", models.BooleanField(default=True)),
            ],
            options={
                "verbose_name": "Social link",
                "verbose_name_plural": "Social links",
                "ordering": ["sort_order", "id"],
            },
        ),
        migrations.RunPython(copy_site_json, migrations.RunPython.noop),
    ]
