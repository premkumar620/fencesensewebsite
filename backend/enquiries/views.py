from django.conf import settings
from django.core.mail import send_mail
from rest_framework import generics, status
from rest_framework.response import Response

from .models import ContactEnquiry
from .serializers import ContactEnquirySerializer


class ContactEnquiryCreateView(generics.CreateAPIView):
    queryset = ContactEnquiry.objects.all()
    serializer_class = ContactEnquirySerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        enquiry = serializer.save()

        notify_to = getattr(settings, "ENQUIRY_NOTIFY_EMAIL", None)
        if notify_to:
            send_mail(
                subject=f"Website enquiry from {enquiry.full_name}",
                message=(
                    f"Name: {enquiry.full_name}\n"
                    f"Email: {enquiry.email}\n"
                    f"Phone: {enquiry.phone}\n\n"
                    f"{enquiry.message}"
                ),
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[notify_to],
                fail_silently=True,
            )

        return Response({"ok": True, "id": enquiry.id}, status=status.HTTP_201_CREATED)
