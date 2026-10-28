from unittest.mock import patch

from cloudinary.models import CloudinaryResource
from django.test import SimpleTestCase
from django.urls import resolve

from base.models import Blog
from base.serializers import BlogSerializer
from base.views.user_views import MyTokenObtainPairView


class BlogImageSerializerTests(SimpleTestCase):
    def test_blog_image_is_serialized_as_a_secure_cloudinary_url(self):
        image = CloudinaryResource(
            public_id='n-blog/test-image',
            type='upload',
            resource_type='image',
            format='png',
        )
        blog = Blog(blog_image=image)
        url = 'https://res.cloudinary.com/example/image/upload/test-image.png'

        with patch.object(
            CloudinaryResource,
            'build_url',
            return_value=url,
        ) as build_url:
            serialized_image = BlogSerializer(blog).data['blog_image']

        self.assertEqual(serialized_image, url)
        build_url.assert_called_once_with(secure=True)


class UserUrlTests(SimpleTestCase):
    def test_login_url_resolves_to_token_view(self):
        match = resolve('/api/users/login/')

        self.assertIs(match.func.view_class, MyTokenObtainPairView)
