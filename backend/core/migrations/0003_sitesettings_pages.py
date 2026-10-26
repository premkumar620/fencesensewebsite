from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core", "0002_sitesettings_office_key"),
    ]

    operations = [
        migrations.AddField(
            model_name="sitesettings",
            name="pages",
            field=models.JSONField(
                blank=True,
                default=dict,
                help_text="Marketing copy for Home, About, etc. (JSON). See backend/ADMIN-GUIDE.md.",
            ),
        ),
    ]
