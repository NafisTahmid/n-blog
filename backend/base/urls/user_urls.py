from django.urls import path
from base.views import user_views as views

urlpatterns=[
    path('<str:id>/', views.get_user_by_id, name='get-user-by-id'),
    path('update/<str:id>/', views.update_user, name='update-user'),
    path('delete/<str:pk>/', views.deleteUser, name='delete-user'),
    path('', views.getUsers, name='all-users'),
    path('register/', views.register_user, name='register-user'),
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/', views.getUserProfile, name='user-profile'),
    path('profile/update/', views.updateProfile, name='update-user-profile'),
]
