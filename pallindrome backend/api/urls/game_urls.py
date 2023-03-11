from django.urls import path
from api.views import game_views as views

# "" : "api/games/userGames/"
urlpatterns = [
    path('',views.game_page, name="game_page"),
    path('start/',views.startGame.as_view(), name="start-game"),
    path('start/getGame/',views.getBoard, name="getBoard"),
    path('usergames/',views.getUserGames, name="getUserGames"),

]
