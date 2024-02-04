
from django.urls import include, path
# from rest framework.routers import DefaultRouter
import rest_framework.authtoken.views as auth_views
from rest_framework import routers, urls
from .views import CreateUserView # , UserViewSet

"""
views.pyのUserViewsetを有効にした後で有効化の予定

router = routers.DefaultRouter()
router.register("users",UserViewSet)
"""

urlpatterns = [
    path('signup/', CreateUserView.as_view(), name='signup'),
    path("login", include("rest_framework.urls"))
 
]
