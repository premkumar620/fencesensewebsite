from rest_framework.response import Response
from rest_framework.views import APIView

from content.models import BlogPost, Service, Solution
from content.serializers import BlogPostListSerializer, ServiceListSerializer, SolutionListSerializer

from .models import (
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
from .serializers import (
    CompanyProfileSerializer,
    CustomerLogoSerializer,
    OfferingSerializer,
    OfficeSerializer,
    PartnerLogoSerializer,
    SiteSettingsSerializer,
    SocialLinkSerializer,
    StatSerializer,
    TestimonialSerializer,
)


def published_stats():
    return Stat.objects.filter(is_published=True)


def published_offerings():
    return Offering.objects.filter(is_published=True)


def published_socials():
    return SocialLink.objects.filter(is_published=True)


def published_testimonials():
    return Testimonial.objects.filter(is_published=True)


def published_partner_logos():
    return PartnerLogo.objects.filter(is_published=True)


def published_customer_logos():
    return CustomerLogo.objects.filter(is_published=True)


def partner_logo_paths():
    return [row.resolved_image() for row in published_partner_logos()]


def customer_logo_paths():
    return [row.resolved_image() for row in published_customer_logos()]


def offering_titles():
    return [row.title for row in published_offerings()]


class BootstrapView(APIView):
    """Single payload for the React app initial load."""

    def get(self, request):
        company = CompanyProfile.get_solo()
        settings = SiteSettings.get_solo()
        offices = Office.objects.filter(is_published=True)
        services = Service.objects.filter(is_published=True)
        solutions = Solution.objects.filter(is_published=True)
        posts = BlogPost.objects.filter(is_published=True)
        stats = published_stats()
        offerings = published_offerings()
        socials = published_socials()
        testimonials = published_testimonials()
        partners = published_partner_logos()
        customers = published_customer_logos()

        stat_data = StatSerializer(stats, many=True).data
        offering_data = OfferingSerializer(offerings, many=True).data
        social_data = SocialLinkSerializer(socials, many=True).data
        testimonial_data = TestimonialSerializer(testimonials, many=True).data

        site = SiteSettingsSerializer(settings).data
        site["stats"] = stat_data
        site["offerings"] = offering_titles()
        site["socials"] = social_data
        site["testimonials"] = testimonial_data
        site["partner_logos"] = partner_logo_paths()
        site["customer_logos"] = customer_logo_paths()

        return Response(
            {
                "company": CompanyProfileSerializer(company).data,
                "site": site,
                "stats": stat_data,
                "offerings": offering_data,
                "socials": social_data,
                "testimonials": testimonial_data,
                "partners": PartnerLogoSerializer(partners, many=True).data,
                "customers": CustomerLogoSerializer(customers, many=True).data,
                "offices": OfficeSerializer(offices, many=True).data,
                "services": ServiceListSerializer(services, many=True).data,
                "solutions": SolutionListSerializer(solutions, many=True).data,
                "posts": BlogPostListSerializer(posts, many=True).data,
            }
        )


class StatListView(APIView):
    def get(self, request):
        return Response(StatSerializer(published_stats(), many=True).data)


class OfferingListView(APIView):
    def get(self, request):
        return Response(OfferingSerializer(published_offerings(), many=True).data)


class SocialLinkListView(APIView):
    def get(self, request):
        return Response(SocialLinkSerializer(published_socials(), many=True).data)


class TestimonialListView(APIView):
    def get(self, request):
        return Response(TestimonialSerializer(published_testimonials(), many=True).data)


class PartnerLogoListView(APIView):
    def get(self, request):
        return Response(PartnerLogoSerializer(published_partner_logos(), many=True).data)


class CustomerLogoListView(APIView):
    def get(self, request):
        return Response(CustomerLogoSerializer(published_customer_logos(), many=True).data)


class OfficeListView(APIView):
    def get(self, request):
        offices = Office.objects.filter(is_published=True)
        return Response(OfficeSerializer(offices, many=True).data)


class CompanyProfileView(APIView):
    def get(self, request):
        profile = CompanyProfile.get_solo()
        return Response(CompanyProfileSerializer(profile).data)
