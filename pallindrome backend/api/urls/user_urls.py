
from django.urls import path
from api.views import user_views as views

# "" : "api/users/"
urlpatterns = [
    path('',views.users.as_view(), name="user_page"),
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    

]
