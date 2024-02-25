from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token
from accounts import urls
from api import urls

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls")),
    path("api-auth/login/recipes/", include("api.urls")),
    path("", include("accounts.urls")),
    # path("api/", include('router.urls')),
    # path("api-token-auth/", views.obtain_auth_token),
]

"""
ユーザーがこのエンドポイントにusernameとpasswordをPOSTするとトークンを返し、
以降、このトークンを使用して認証が必要なAPIにアクセスする。
"""
urlpatterns += [
    path("api-token-auth/", obtain_auth_token, name="api_token_auth"),
]
