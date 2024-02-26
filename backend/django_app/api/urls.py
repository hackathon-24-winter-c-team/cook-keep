from django.urls import path
from . import views

urlpatterns = [
    path("recipes/", views.RecipeList.as_view(), name="recipe-list"),
    path("create/", views.CreateRecipe.as_view(), name="create-recipe"),
    path("recipes/<int:pk>/", views.RecipeDetail.as_view(), name="recipe-detail"),
]
