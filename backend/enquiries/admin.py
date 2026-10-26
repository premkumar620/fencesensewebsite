from django.contrib import admin

from .models import ContactEnquiry


@admin.register(ContactEnquiry)
class ContactEnquiryAdmin(admin.ModelAdmin):
    list_display = ("full_name", "email", "status", "created_at")
    list_filter = ("status", "created_at")
    search_fields = ("full_name", "email", "message")
    readonly_fields = ("created_at",)
