from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from api.models import Game



# 20022001@Sc
class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    # _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id','username','email','name','isAdmin']

    # method field
    def get_name(self,obj):
        # obj = User model
        name = obj.username
        if name == '':
            name = obj.email
        return name

    def get__id(self,obj):
        return obj.id
    
    def get_isAdmin(self,obj):
        return obj.is_staff

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id','username','email','name','isAdmin','token']

    def get_token(self,obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ['id','string','result','createdAt']