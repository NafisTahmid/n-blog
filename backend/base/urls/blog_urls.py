from django.urls import path
from base.views import blog_views as views

urlpatterns = [
    path('top/', views.top_blogs),
    path('', views.getBlogs),
    path('<str:slug>/', views.getBlog),
    path('<str:id>/delete/',views.delete_blog),
    path('<str:slug>/post-comment/', views.postComment),
    path('<str:slug>/add-like/', views.addLike),
    path('<str:slug>/comments/', views.getBlogComments),
    path('<str:slug>/likes/', views.getBlogLikes),
]
