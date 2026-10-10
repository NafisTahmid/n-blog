from django.urls import path
from .views import getBlogs, getBlog
urlpatterns = [
    path('blogs/', getBlogs),
    path('blogs/<str:slug>/', getBlog)
]