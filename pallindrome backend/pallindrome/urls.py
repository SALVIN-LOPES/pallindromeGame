
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/users/', include('api.urls.user_urls')),
    path('api/games/', include('api.urls.game_urls')),
]
