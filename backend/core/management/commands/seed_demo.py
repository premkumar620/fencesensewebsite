import json
from pathlib import Path

from django.core.management.base import BaseCommand

from content.detail_sections import import_detail_json_to_service, import_detail_json_to_solution
from content.models import BlogPost, Service, Solution
from content.seed_maps import SERVICE_CATEGORY_BY_SLUG, SOLUTION_DOMAIN_BY_SLUG
from core.defaults import DEFAULT_PAGES
from core.models import (
    CompanyProfile,
    CustomerLogo,
    Offering,
    Office,
    PartnerLogo,
    SiteSettings,
    SocialLink,
    Stat,
    Testimonial,
)


class Command(BaseCommand):
    help = "Seed database from backend/seed_data/snapshot.json (run scripts/build-snapshot.cjs first)."

    def handle(self, *args, **options):
        snapshot_path = Path(__file__).resolve().parents[3] / "seed_data" / "snapshot.json"
        if not snapshot_path.is_file():
            self.stderr.write(
                self.style.ERROR(
                    f"Missing {snapshot_path}. Run: node scripts/build-snapshot.cjs"
                )
            )
            return

        data = json.loads(snapshot_path.read_text(encoding="utf-8"))
        detail_content = data.get("detailContent") or {}

        profile, _ = CompanyProfile.objects.update_or_create(
            pk=1,
            defaults={
                "name": "Fencesense Technologies Pvt. Ltd.",
                "phone": data.get("phone", "9650731119"),
                "email": data.get("email", "info@fencesense.com"),
                "cin": data.get("cin", ""),
            },
        )
        self.stdout.write(f"Company profile: {profile.name}")

        SiteSettings.objects.update_or_create(
            pk=1,
            defaults={"pages": data.get("pages") or DEFAULT_PAGES},
        )
        self.stdout.write("Site settings updated")

        for index, row in enumerate(data.get("stats", [])):
            Stat.objects.update_or_create(
                label=row.get("label", ""),
                defaults={
                    "value": int(row.get("value") or 0),
                    "suffix": row.get("suffix") or "",
                    "sort_order": index,
                    "is_published": True,
                },
            )
        self.stdout.write(f"Stats: {Stat.objects.count()}")

        for index, title in enumerate(data.get("offerings", [])):
            Offering.objects.update_or_create(
                title=str(title),
                defaults={"sort_order": index, "is_published": True},
            )
        self.stdout.write(f"Offerings: {Offering.objects.count()}")

        for index, row in enumerate(data.get("socials", [])):
            SocialLink.objects.update_or_create(
                label=row.get("label", ""),
                defaults={
                    "href": row.get("href", ""),
                    "sort_order": index,
                    "is_published": True,
                },
            )
        self.stdout.write(f"Social links: {SocialLink.objects.count()}")

        for index, row in enumerate(data.get("testimonials", [])):
            Testimonial.objects.update_or_create(
                name=row.get("name", ""),
                role=row.get("role", ""),
                defaults={
                    "quote": row.get("quote", ""),
                    "logo": row.get("logo", ""),
                    "sort_order": index,
                    "is_published": True,
                },
            )
        self.stdout.write(f"Testimonials: {Testimonial.objects.count()}")

        for index, path in enumerate(data.get("partnerLogos", [])):
            PartnerLogo.objects.update_or_create(
                image=path,
                defaults={"sort_order": index, "is_published": True},
            )
        self.stdout.write(f"Partner logos: {PartnerLogo.objects.count()}")

        for index, path in enumerate(data.get("customerLogos", [])):
            CustomerLogo.objects.update_or_create(
                image=path,
                defaults={"sort_order": index, "is_published": True},
            )
        self.stdout.write(f"Customer logos: {CustomerLogo.objects.count()}")

        for index, row in enumerate(data.get("offices", [])):
            lines = row.get("lines") or []
            Office.objects.update_or_create(
                key=row.get("id") or row.get("city", "").lower().replace(" ", "-"),
                defaults={
                    "label": row.get("label", ""),
                    "city": row.get("city", ""),
                    "region": row.get("region", ""),
                    "title": row.get("title", profile.name),
                    "address_line_1": lines[0] if len(lines) > 0 else "",
                    "address_line_2": lines[1] if len(lines) > 1 else "",
                    "address_line_3": lines[2] if len(lines) > 2 else "",
                    "address_line_4": lines[3] if len(lines) > 3 else "",
                    "phone": row.get("phone", profile.phone),
                    "cin": row.get("cin", ""),
                    "is_primary": bool(row.get("primary")),
                    "sort_order": index,
                    "is_published": True,
                },
            )
        self.stdout.write(f"Offices: {Office.objects.count()}")

        for index, item in enumerate(data.get("services", [])):
            slug = item["slug"]
            detail_key = f"service:{slug}"
            service, _ = Service.objects.update_or_create(
                slug=slug,
                defaults={
                    "title": item.get("title", slug),
                    "kicker": item.get("kicker", ""),
                    "summary": item.get("summary", ""),
                    "paragraphs": item.get("paragraphs", []),
                    "points": item.get("points", []),
                    "hero_image": item.get("heroImage", ""),
                    "icon": item.get("icon", ""),
                    "category": SERVICE_CATEGORY_BY_SLUG.get(slug, Service.Category.OTHER),
                    "engagement_model": item.get("engagementModel", ""),
                    "sort_order": index,
                    "is_published": True,
                    "detail_content": detail_content.get(detail_key) or {},
                },
            )
            import_detail_json_to_service(service, detail_content.get(detail_key) or {})
        self.stdout.write(f"Services: {Service.objects.count()}")

        for index, item in enumerate(data.get("solutions", [])):
            slug = item["slug"]
            detail_key = f"solution:{slug}"
            solution, _ = Solution.objects.update_or_create(
                slug=slug,
                defaults={
                    "title": item.get("title", slug),
                    "kicker": item.get("kicker", ""),
                    "summary": item.get("summary", ""),
                    "paragraphs": item.get("paragraphs", []),
                    "points": item.get("points", []),
                    "hero_image": item.get("heroImage", ""),
                    "icon": item.get("icon", ""),
                    "domain": SOLUTION_DOMAIN_BY_SLUG.get(slug, Solution.Domain.OTHER),
                    "outcome_summary": item.get("outcomeSummary") or item.get("kicker", ""),
                    "sort_order": index,
                    "is_published": True,
                    "detail_content": detail_content.get(detail_key) or {},
                },
            )
            import_detail_json_to_solution(solution, detail_content.get(detail_key) or {})
        self.stdout.write(f"Solutions: {Solution.objects.count()}")

        for post in data.get("posts", []):
            BlogPost.objects.update_or_create(
                slug=post["slug"],
                defaults={
                    "title": post.get("title", ""),
                    "excerpt": post.get("excerpt", ""),
                    "author": post.get("author", ""),
                    "image": post.get("image", ""),
                    "day_label": post.get("day", ""),
                    "month_label": post.get("month", ""),
                    "date_display": post.get("date", ""),
                    "paragraphs": post.get("paragraphs", []),
                    "body": "\n\n".join(post.get("paragraphs", [])),
                    "is_published": True,
                },
            )
        self.stdout.write(f"Blog posts: {BlogPost.objects.count()}")
        self.stdout.write(self.style.SUCCESS("Seed complete from snapshot.json."))
