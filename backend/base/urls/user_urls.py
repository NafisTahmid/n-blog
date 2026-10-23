from django.urls import path
from base.views import user_views as views

urlpatterns=[
    
    path('delete/<str:pk>/', views.deleteUser, name='delete-user'),
    path('', views.getUsers, name='all-users'),
    path('register/', views.register_user, name='register-user'),
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/', views.getUserProfile, name='user-profile'),
    path('profile/update/', views.updateProfile, name='update-user-profile'),
]
