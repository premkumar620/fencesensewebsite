from rest_framework import serializers

from .models import ContactEnquiry


class ContactEnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactEnquiry
        fields = ("full_name", "email", "phone", "message", "preferred_office")

    def create(self, validated_data):
        return ContactEnquiry.objects.create(**validated_data)
