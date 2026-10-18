from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from base.serializers import BlogSerializer, CommentSerializer
from base.models import Blog, Comment
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

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def postComment(request, slug):
    user = request.user
    data = request.data
    blog = Blog.objects.get(slug=slug)
    newComment = Comment.objects.create(
        blog=blog,
        comment=data["comment"],
        user=user
    )
    serializer = CommentSerializer(newComment, many=False)
    return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getBlogComments(request, slug):
    user = request.user
    blog = Blog.objects.get(slug=slug)
    blog_comments = Comment.objects.filter(blog=blog)
    serializer = CommentSerializer(blog_comments, many=True)
    return Response(serializer.data)