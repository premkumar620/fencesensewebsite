from django.urls import path

from .views import (
    BootstrapView,
    CompanyProfileView,
    CustomerLogoListView,
    OfferingListView,
    OfficeListView,
    PartnerLogoListView,
    SocialLinkListView,
    StatListView,
    TestimonialListView,
)

urlpatterns = [
    path("bootstrap/", BootstrapView.as_view(), name="bootstrap"),
    path("stats/", StatListView.as_view(), name="stat-list"),
    path("offerings/", OfferingListView.as_view(), name="offering-list"),
    path("socials/", SocialLinkListView.as_view(), name="social-list"),
    path("testimonials/", TestimonialListView.as_view(), name="testimonial-list"),
    path("partners/", PartnerLogoListView.as_view(), name="partner-list"),
    path("customers/", CustomerLogoListView.as_view(), name="customer-list"),
    path("offices/", OfficeListView.as_view(), name="office-list"),
    path("company/", CompanyProfileView.as_view(), name="company-profile"),
]
