from rest_framework import generics

from .models import BlogPost, Service, Solution
from .serializers import (
    BlogPostDetailSerializer,
    BlogPostListSerializer,
    ServiceDetailSerializer,
    ServiceListSerializer,
    SolutionDetailSerializer,
    SolutionListSerializer,
)

BlogPostSerializer = BlogPostListSerializer


class ServiceListView(generics.ListAPIView):
    serializer_class = ServiceListSerializer

    def get_queryset(self):
        return Service.objects.filter(is_published=True)


class ServiceDetailView(generics.RetrieveAPIView):
    serializer_class = ServiceDetailSerializer
    lookup_field = "slug"

    def get_queryset(self):
        return Service.objects.filter(is_published=True).prefetch_related(
            "benefit_blocks",
            "methodology_steps",
            "faq_items",
        )


class SolutionListView(generics.ListAPIView):
    serializer_class = SolutionListSerializer

    def get_queryset(self):
        return Solution.objects.filter(is_published=True)


class SolutionDetailView(generics.RetrieveAPIView):
    serializer_class = SolutionDetailSerializer
    lookup_field = "slug"

    def get_queryset(self):
        return Solution.objects.filter(is_published=True).prefetch_related(
            "benefit_blocks",
            "methodology_steps",
            "faq_items",
        )


class BlogPostListView(generics.ListAPIView):
    serializer_class = BlogPostSerializer

    def get_queryset(self):
        return BlogPost.objects.filter(is_published=True)


class BlogPostDetailView(generics.RetrieveAPIView):
    serializer_class = BlogPostDetailSerializer
    lookup_field = "slug"

    def get_queryset(self):
        return BlogPost.objects.filter(is_published=True)
