from django.contrib.auth.models import User
from rest_framework.decorators import APIView,api_view, permission_classes
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
    # Retrieve users(used)
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
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    # Create a new user(used)
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
    @permission_classes([IsAdminUser])
    def put(self, request, format=None):

        data = request.data
        user = User.objects.filter(id=data['id']).first()
        print("user = ",user.username)

        # data = {
            # pk,
        #     name,
        #     username,
        #     email,
        #   isAdmin
        # }
        if data:
            user.first_name = data.get("name","")
            user.username = data.get("username","")
            user.email = data.get("email","")
            user.is_staff = data.get("isAdmin",False)


            user.save()

            serializer = UserSerializerWithToken(user,many=False)

            context = {
                "detail" : "user updated successfully",
                "user updated" : serializer.data,
            }
            return Response(serializer.data)
        else:
            context = {
                "detail" : "user updation Failed",
            }
            return Response(context, status=status.HTTP_400_BAD_REQUEST)

    # delete user 
    @permission_classes([IsAdminUser])
    def delete(self,request,pk,*args,**kwargs):
        # get this user by token
        # pk = user id
        print("pk = ",pk)
        user = User.objects.filter(id=pk).first()
        if user and user.username:

            user.delete()
            context = {
                "detail" : "user deleted successfully",
            }
            return Response(context)
        else:
            context = {
                "detail" : "user deletion Failed",
            }
            return Response(context, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user

    data = request.data
    # data = {
    # name : name ,
    # username : username ,
    # email : email,
    # password : password,
    # }

    user.first_name = data['name']
    user.username = data['username']
    user.email = data['email']
    
    if data['password'] != "":
        user.password = make_password(data['password'])
    else:
        pass

    user.save()

    serializer = UserSerializerWithToken(user,many=False)
    
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated,IsAdminUser])
def getUserById(request,pk):
    # pk = user id
    user = User.objects.filter(id = pk).first()
    print("user = ",user)
    serializer = UserSerializer(user, many=False)

    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request,pk):
    print("pk = ",pk)
    user = User.objects.filter(id=pk).first()
    if user and user.username:

        user.delete()
        return Response("user deleted successfully")


        

