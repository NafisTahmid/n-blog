from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from base.serializers import BlogSerializer, CommentSerializer, LikeSerializer
from base.models import Blog, Comment, Like
from rest_framework import status
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from django.db.models import Count

@api_view(['GET'])
def getBlogs(request):
    query = request.query_params.get("keyword")
    page = request.query_params.get("page");
    if page == None:
        page = 1
    page = int(page)

    blogs = Blog.objects.filter(blog_title__icontains=query).order_by("pk")
    paginator = Paginator(blogs, 8)
    try:
        blogs = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)
    serializer = BlogSerializer(blogs, many=True)
    return Response({"blogs":serializer.data, "page":page, "pages":paginator.num_pages})


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

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def addLike(request, slug):
    user = request.user
    try:
        blog = Blog.objects.get(slug=slug)
    except Blog.DoesNotExist:
        return Response({"message":"Blog doesn't exist!!!"}, status=status.HTTP_404_NOT_FOUND)
    like, created = Like.objects.get_or_create(
        blog=blog,
        user=user
    )
    if created:
        serializer = LikeSerializer(like, many=False)
        return Response(serializer.data)
    like.delete()
    return Response({"message":"Like removed successfully!!!"}, status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getBlogComments(request, slug):
    user = request.user
    blog = Blog.objects.get(slug=slug)
    blog_comments = Comment.objects.filter(blog=blog)
    serializer = CommentSerializer(blog_comments, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getBlogLikes(request, slug):
    user = request.user
    blog = Blog.objects.get(slug=slug)
    blog_likes = Like.objects.filter(blog=blog)
    serializer = LikeSerializer(blog_likes, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def top_blogs(request):
    top_blogs = Blog.objects.annotate(
        total_likes=Count("like")
    ).order_by("-total_likes")[:5]
    serializer = BlogSerializer(top_blogs, many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_blog(request, id):
    blog = Blog.objects.get(id=id)
    blog.delete()
    return Response({'message':'Blog deleted successfully!!!'}, status=status.HTTP_200_OK)