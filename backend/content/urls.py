from django.urls import path

from .views import (
    BlogPostDetailView,
    BlogPostListView,
    ServiceDetailView,
    ServiceListView,
    SolutionDetailView,
    SolutionListView,
)

urlpatterns = [
    path("services/", ServiceListView.as_view(), name="service-list"),
    path("services/<slug:slug>/", ServiceDetailView.as_view(), name="service-detail"),
    path("solutions/", SolutionListView.as_view(), name="solution-list"),
    path("solutions/<slug:slug>/", SolutionDetailView.as_view(), name="solution-detail"),
    path("blog/", BlogPostListView.as_view(), name="blog-list"),
    path("blog/<slug:slug>/", BlogPostDetailView.as_view(), name="blog-detail"),
]
