from .models import Blog, Comment, Like
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

class BlogSerializer(serializers.ModelSerializer):
    blog_image = serializers.SerializerMethodField()

    class Meta:
        model = Blog
        fields = "__all__"

    def get_blog_image(self, obj):
        image = obj.blog_image
        return image.build_url(secure=True) if image else None

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    is_admin = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', 'is_admin']

    def get_name(self,obj):
        name = obj.first_name
        if name == '':
            name = obj.email
        return name

    def get_is_admin(self, obj):
        return obj.is_staff

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'token', 'username', 'is_admin']

   
    def get_token(self, obj):
        refresh = RefreshToken.for_user(obj)
        return str(refresh.access_token)

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Comment
        fields = "__all__"

    def get_user(self, obj):
        item = obj.user
        serializer = UserSerializer(item, many=False)
        return serializer.data

class LikeSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Like
        fields = "__all__"

    def get_user(self, obj):
        item = obj.user
        serializer = UserSerializer(item, many=False)
        return serializer.data
