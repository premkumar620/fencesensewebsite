# Generated manually for model extensions

from django.db import migrations, models


def office_keys(apps, schema_editor):
    import re

    Office = apps.get_model("core", "Office")
    for office in Office.objects.all():
        if not office.key:
            office.key = re.sub(r"[^a-z0-9]+", "-", office.city.lower()).strip("-")
            office.save(update_fields=["key"])


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="SiteSettings",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("stats", models.JSONField(blank=True, default=list)),
                ("offerings", models.JSONField(blank=True, default=list)),
                ("partner_logos", models.JSONField(blank=True, default=list)),
                ("customer_logos", models.JSONField(blank=True, default=list)),
                ("testimonials", models.JSONField(blank=True, default=list)),
                ("socials", models.JSONField(blank=True, default=list)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "verbose_name": "Site settings",
                "verbose_name_plural": "Site settings",
            },
        ),
        migrations.AddField(
            model_name="office",
            name="key",
            field=models.SlugField(blank=True, help_text="Stable id for frontend, e.g. new-delhi", max_length=80, null=True, unique=True),
        ),
        migrations.RunPython(office_keys, migrations.RunPython.noop),
        migrations.AlterField(
            model_name="office",
            name="key",
            field=models.SlugField(help_text="Stable id for frontend, e.g. new-delhi", max_length=80, unique=True),
        ),
    ]
