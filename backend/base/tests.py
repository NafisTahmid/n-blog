from django.test import SimpleTestCase
from django.urls import resolve

from base.views.user_views import MyTokenObtainPairView


class UserUrlTests(SimpleTestCase):
    def test_login_url_resolves_to_token_view(self):
        match = resolve('/api/users/login/')

        self.assertIs(match.func.view_class, MyTokenObtainPairView)
