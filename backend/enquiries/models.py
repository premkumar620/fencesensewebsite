from django.db import models


class ContactEnquiry(models.Model):
    class Status(models.TextChoices):
        NEW = "new", "New"
        IN_PROGRESS = "in_progress", "In progress"
        CLOSED = "closed", "Closed"

    full_name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=32, blank=True)
    message = models.TextField()
    preferred_office = models.ForeignKey(
        "core.Office",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="enquiries",
    )
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.NEW)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name_plural = "Contact enquiries"

    def __str__(self):
        return f"{self.full_name} — {self.created_at:%Y-%m-%d}"
