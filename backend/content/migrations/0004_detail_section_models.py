from django.db import migrations, models
import django.db.models.deletion


def import_from_legacy_json(apps, schema_editor):
    Service = apps.get_model("content", "Service")
    Solution = apps.get_model("content", "Solution")
    ServiceBenefit = apps.get_model("content", "ServiceBenefit")
    ServiceMethodologyStep = apps.get_model("content", "ServiceMethodologyStep")
    ServiceFaq = apps.get_model("content", "ServiceFaq")
    SolutionBenefit = apps.get_model("content", "SolutionBenefit")
    SolutionMethodologyStep = apps.get_model("content", "SolutionMethodologyStep")
    SolutionFaq = apps.get_model("content", "SolutionFaq")

    def bullets(items):
        if not items:
            return ""
        return "\n".join(str(x) for x in items)

    def load_service(service):
        data = service.detail_content or {}
        if not data:
            return
        service.benefits_title = data.get("benefitsTitle") or ""
        service.methodology_title = data.get("methodologyTitle") or ""
        service.cta_title = data.get("ctaTitle") or ""
        service.cta_text = data.get("ctaText") or ""
        service.save()
        for index, row in enumerate(data.get("benefits") or []):
            if not isinstance(row, dict):
                continue
            ServiceBenefit.objects.create(
                service=service,
                title=row.get("title") or f"Benefit {index + 1}",
                description=row.get("description") or "",
                bullets=bullets(row.get("items")),
                icon=row.get("icon") or "",
                action_label=row.get("actionLabel") or "",
                sort_order=index,
            )
        for index, row in enumerate(data.get("methodology") or []):
            if not isinstance(row, dict):
                continue
            ServiceMethodologyStep.objects.create(
                service=service,
                step=row.get("step") or f"{index + 1:02d}",
                title=row.get("title") or "",
                text=row.get("text") or "",
                sort_order=index,
            )
        for index, row in enumerate(data.get("faqs") or []):
            if not isinstance(row, dict):
                continue
            ServiceFaq.objects.create(
                service=service,
                question=row.get("question") or "",
                answer=row.get("answer") or "",
                sort_order=index,
            )

    def load_solution(solution):
        data = solution.detail_content or {}
        if not data:
            return
        solution.benefits_title = data.get("benefitsTitle") or ""
        solution.methodology_title = data.get("methodologyTitle") or ""
        solution.cta_title = data.get("ctaTitle") or ""
        solution.cta_text = data.get("ctaText") or ""
        solution.save()
        for index, row in enumerate(data.get("benefits") or []):
            if not isinstance(row, dict):
                continue
            SolutionBenefit.objects.create(
                solution=solution,
                title=row.get("title") or f"Benefit {index + 1}",
                description=row.get("description") or "",
                bullets=bullets(row.get("items")),
                icon=row.get("icon") or "",
                action_label=row.get("actionLabel") or "",
                sort_order=index,
            )
        for index, row in enumerate(data.get("methodology") or []):
            if not isinstance(row, dict):
                continue
            SolutionMethodologyStep.objects.create(
                solution=solution,
                step=row.get("step") or f"{index + 1:02d}",
                title=row.get("title") or "",
                text=row.get("text") or "",
                sort_order=index,
            )
        for index, row in enumerate(data.get("faqs") or []):
            if not isinstance(row, dict):
                continue
            SolutionFaq.objects.create(
                solution=solution,
                question=row.get("question") or "",
                answer=row.get("answer") or "",
                sort_order=index,
            )

    for service in Service.objects.all():
        if not service.benefit_blocks.exists():
            load_service(service)
    for solution in Solution.objects.all():
        if not solution.benefit_blocks.exists():
            load_solution(solution)


class Migration(migrations.Migration):

    dependencies = [
        ("content", "0003_service_solution_models"),
    ]

    operations = [
        migrations.AddField(
            model_name="service",
            name="benefits_title",
            field=models.CharField(blank=True, help_text="Detail page — Key benefits section heading.", max_length=255),
        ),
        migrations.AddField(
            model_name="service",
            name="cta_text",
            field=models.TextField(blank=True, help_text="Expert CTA band paragraph."),
        ),
        migrations.AddField(
            model_name="service",
            name="cta_title",
            field=models.CharField(blank=True, help_text="Expert CTA band heading.", max_length=255),
        ),
        migrations.AddField(
            model_name="service",
            name="methodology_title",
            field=models.CharField(blank=True, help_text="Detail page — methodology section heading.", max_length=255),
        ),
        migrations.AddField(
            model_name="solution",
            name="benefits_title",
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name="solution",
            name="cta_text",
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name="solution",
            name="cta_title",
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name="solution",
            name="methodology_title",
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AlterField(
            model_name="service",
            name="detail_content",
            field=models.JSONField(blank=True, default=dict, help_text="Legacy JSON fallback if benefit/methodology rows are empty."),
        ),
        migrations.AlterField(
            model_name="solution",
            name="detail_content",
            field=models.JSONField(blank=True, default=dict, help_text="Legacy JSON fallback if benefit/methodology rows are empty."),
        ),
        migrations.CreateModel(
            name="ServiceBenefit",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=200)),
                ("description", models.TextField(blank=True, help_text="Optional paragraph under the title (use this OR bullet lines below).")),
                ("bullets", models.TextField(blank=True, help_text="One bullet per line — shown as Key benefit body when filled.")),
                ("icon", models.CharField(blank=True, help_text="Optional icon path.", max_length=500)),
                ("action_label", models.CharField(blank=True, max_length=120)),
                ("sort_order", models.PositiveSmallIntegerField(default=0)),
                ("service", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="benefit_blocks", to="content.service")),
            ],
            options={"verbose_name": "Key benefit", "verbose_name_plural": "Key benefits", "ordering": ["sort_order", "id"]},
        ),
        migrations.CreateModel(
            name="ServiceMethodologyStep",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("step", models.CharField(help_text="e.g. 01", max_length=8)),
                ("title", models.CharField(max_length=120)),
                ("text", models.TextField()),
                ("sort_order", models.PositiveSmallIntegerField(default=0)),
                ("service", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="methodology_steps", to="content.service")),
            ],
            options={"verbose_name": "Methodology step", "verbose_name_plural": "Methodology steps", "ordering": ["sort_order", "id"]},
        ),
        migrations.CreateModel(
            name="ServiceFaq",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("question", models.CharField(max_length=500)),
                ("answer", models.TextField()),
                ("sort_order", models.PositiveSmallIntegerField(default=0)),
                ("service", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="faq_items", to="content.service")),
            ],
            options={"verbose_name": "FAQ", "verbose_name_plural": "FAQs", "ordering": ["sort_order", "id"]},
        ),
        migrations.CreateModel(
            name="SolutionBenefit",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=200)),
                ("description", models.TextField(blank=True)),
                ("bullets", models.TextField(blank=True, help_text="One bullet per line.")),
                ("icon", models.CharField(blank=True, max_length=500)),
                ("action_label", models.CharField(blank=True, max_length=120)),
                ("sort_order", models.PositiveSmallIntegerField(default=0)),
                ("solution", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="benefit_blocks", to="content.solution")),
            ],
            options={"verbose_name": "Key benefit", "verbose_name_plural": "Key benefits", "ordering": ["sort_order", "id"]},
        ),
        migrations.CreateModel(
            name="SolutionMethodologyStep",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("step", models.CharField(max_length=8)),
                ("title", models.CharField(max_length=120)),
                ("text", models.TextField()),
                ("sort_order", models.PositiveSmallIntegerField(default=0)),
                ("solution", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="methodology_steps", to="content.solution")),
            ],
            options={"verbose_name": "Methodology step", "verbose_name_plural": "Methodology steps", "ordering": ["sort_order", "id"]},
        ),
        migrations.CreateModel(
            name="SolutionFaq",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("question", models.CharField(max_length=500)),
                ("answer", models.TextField()),
                ("sort_order", models.PositiveSmallIntegerField(default=0)),
                ("solution", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="faq_items", to="content.solution")),
            ],
            options={"verbose_name": "FAQ", "verbose_name_plural": "FAQs", "ordering": ["sort_order", "id"]},
        ),
        migrations.RunPython(import_from_legacy_json, migrations.RunPython.noop),
    ]
