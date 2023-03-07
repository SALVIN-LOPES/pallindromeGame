from django.contrib.auth.models import User
from rest_framework.decorators import APIView,api_view,permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.http import HttpResponse
from api.models import Game
from rest_framework import status
from api.serializers import GameSerializer

# Import string and random module
import string
import random


@api_view(['GET'])
def game_page(request):

    context = {"detail" : "game page"}
    return Response(context)


class startGame(APIView):
    # page which says to start a new game
    @permission_classes(IsAuthenticated)
    def get(self,request,Format=None):
        data = request.data
        # data = {
        #     id,
        #     user,
        #     string,
        #     result,
        # } 
        game = Game.objects.get(id=data['pk'])

        if len(game.string) < 6:
            # user added user_user_string to game
            # computer added user_string to game
            com_string = random.choice(string.ascii_letters)
            game.string += com_string
            game.save()
            serializer = GameSerializer(game, many=False)

        return Response(serializer.data)

    # create/start a new game
    @permission_classes(IsAuthenticated)
    def post(self,request,Format=None):
        # get the user
        user = request.user
        print("user = ",user)
        # at start user_user_string = ""
        game = Game.objects.create(
            user = user,
            string = "",
        )
        game.save()

        serializer = GameSerializer(game,many=False)
        return Response(serializer.data)

    # update the existing game
    @permission_classes(IsAuthenticated)
    def put(self,request,Format=None):
        data = request.data
        game = Game.objects.filter(id=data['id']).first()
        user_string = data['string']
        print("user_string = ",user_string)
        result = False
        if len(game.string) < 6:
            # updated the new string
            game.string = user_string
            game.save()
            serializer = GameSerializer(game,many=False)

        return Response(serializer.data)

@api_view(['PUT'])
def getBoard(request):
    data = request.data
        # data = {
        #     id,
        #     user,
        #     string,
        #     result,
        # } 
    game = Game.objects.get(id=data['pk'])

    if len(game.string) < 6:
        # user added user_user_string to game
        # computer added user_string to game
        com_string = random.choice(string.ascii_letters)
        game.string += com_string
        game.save()
        serializer = GameSerializer(game, many=False)

    return Response(serializer.data)