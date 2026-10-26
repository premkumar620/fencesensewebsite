from django.urls import path

from .views import ContactEnquiryCreateView

urlpatterns = [
    path("", ContactEnquiryCreateView.as_view(), name="enquiry-create"),
]
