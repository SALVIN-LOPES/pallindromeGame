
from django.urls import path
from api.views import user_views as views

# "" : "api/users/"
urlpatterns = [
    path('',views.users.as_view(), name="user_page"),
    path('user/<str:pk>/',views.getUserById, name="getUserById"),
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),

    path('delete/<str:pk>/', views.deleteUser, name='deleteUser'),
    path('update/', views.updateUserProfile, name='updateUser'),
    
]
