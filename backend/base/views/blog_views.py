from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from base.serializers import BlogSerializer
from base.models import Blog
from rest_framework import status

@api_view(['GET'])
def getBlogs(request):
    blogs = Blog.objects.all()
    serializer = BlogSerializer(blogs, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getBlog(request, slug):
    blog = Blog.objects.get(slug=slug)
    serializer = BlogSerializer(blog, many=False)
    return Response(serializer.data)