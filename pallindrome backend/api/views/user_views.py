from django.contrib.auth.models import User
from rest_framework.decorators import APIView, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from api.serializers import UserSerializer, UserSerializerWithToken

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework import status
from django.contrib.auth.hashers import make_password


from django.http import HttpResponse

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data

        for k , v in serializer.items():
            data[k] = v
        
        return data

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# PERFORM CRUD OPERATION WITH USERS

class users(APIView):
    # Retrieve users
    @permission_classes([IsAdminUser])
    def get(self,request,format=None):

        # to get single user


        # to get multiple users
        users = User.objects.all()
        serializer = UserSerializerWithToken(users,many=True)

        context = {
            "detail" : "user details",
            "users" : serializer.data,
            }
        return Response(context, status=status.HTTP_200_OK)
    
    # Create a new user
    def post(self,request,format=None):
        
        data = request.data
        try:
            user = User.objects.create(
                first_name = data['username'],
                username = data["username"],
                email = data["email"],
                password = make_password(data['password'])
            )

            serializer = UserSerializerWithToken(user,many=False)

            return Response(serializer.data)
        except:
            message = {'detail' : 'User with this email alredy exist' }
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
        

    # for updation i need JWT token(access + refresh token)
    def put(self, request, format=None):

        user = request.user
        print("user = ",user.username)

        data = request.data
        if data:
            user.first_name = data.get("name","")
            user.username = data.get("username","")
            user.email = data.get("email","")
            user.is_staff = data.get("isAdmin",False)

            user.save()

            serializer = UserSerializer(user,many=False)

            context = {
                "detail" : "user updated successfully",
                "user updated" : serializer.data,
            }
            return Response(context, status=status.HTTP_200_OK)
        else:
            context = {
                "detail" : "user updation Failed",
            }
            return Response(context, status=status.HTTP_400_BAD_REQUEST)

    # delete user 
    def delete(self,request,format=None):
        # get this user by token
        user = request.user
        serializer = UserSerializer(user,many=False)

        if user and user.username:

            user.delete()
            context = {
                "detail" : "user deleted successfully",
                "user deleted" : serializer.data,
            }
            return Response(context, status=status.HTTP_200_OK)
        else:
            context = {
                "detail" : "user deletion Failed",
            }
            return Response(context, status=status.HTTP_400_BAD_REQUEST)








        

