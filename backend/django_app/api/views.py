from .models import Recipe
from .serializers import RecipeSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from rest_framework.authentication import TokenAuthentication
from django.urls import reverse_lazy


class RecipeList(generics.ListAPIView):
    serializer_class = RecipeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Recipe.objects.filter(user_id=user.id)


# class RecipeDetail(generics.RetrieveUpdateDestroyAPIView):
#     serializer_class = RecipeSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         return Recipe.objects.filter(user_id=self.request.user.id)

#     def get_object(self):
#         obj = super().get_object()

#         if obj.user != self.request.user:
#             raise PermissionDenied("この操作は許可されていません。")

#         return obj
"""
レシピ登録でuser_idを含めなくてもtokenから判定し自動でセットされるようserializers.pyを修正しました。ただ、そうすると
既存のレシピ詳細コードではエラーが出てしまいました。以下のコードにすると、user_idはログイン中のものが自動で付与され、
URLに別のユーザーのレシピIDをセットすると「見つかりませんでした」を返します。こんな感じでどうでしょうか？
"""
class RecipeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    def get_queryset(self):
        user = self.request.user
        return Recipe.objects.filter(user_id=user.id)


class CreateRecipe(generics.CreateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    authentication_classes = (TokenAuthentication,)  # トークン認証を有効化
    permission_classes = (IsAuthenticated,)  # 認証されたユーザーのみ許可
   
    def perform_create(self, serializer):
        # ここでは self.request.user が認証済みユーザーのインスタンスを返す
        serializer.save(user_id=self.request.user)

    success_url = reverse_lazy("recipe-list")
