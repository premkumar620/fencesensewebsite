from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("content", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="catalogitem",
            name="paragraphs",
            field=models.JSONField(blank=True, default=list),
        ),
        migrations.AddField(
            model_name="catalogitem",
            name="points",
            field=models.JSONField(blank=True, default=list),
        ),
        migrations.AddField(
            model_name="blogpost",
            name="day_label",
            field=models.CharField(blank=True, max_length=8),
        ),
        migrations.AddField(
            model_name="blogpost",
            name="month_label",
            field=models.CharField(blank=True, max_length=8),
        ),
        migrations.AddField(
            model_name="blogpost",
            name="date_display",
            field=models.CharField(blank=True, max_length=64),
        ),
        migrations.AddField(
            model_name="blogpost",
            name="paragraphs",
            field=models.JSONField(blank=True, default=list),
        ),
    ]
