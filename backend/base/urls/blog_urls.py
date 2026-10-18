from django.urls import path
from base.views import blog_views as views

urlpatterns = [
    path('', views.getBlogs),
    path('<str:slug>/', views.getBlog),
    path('<str:slug>/post-comment/', views.postComment),
    path('<str:slug>/comments/', views.getBlogComments)
]
