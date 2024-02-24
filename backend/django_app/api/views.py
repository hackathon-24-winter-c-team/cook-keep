from django.shortcuts import render
from django.urls import reverse_lazy
from django.views.generic import ListView, CreateView, DeleteView, UpdateView
from .models import Recipes
from django.shortcuts import render, get_list_or_404
from django.contrib import sessions
from django.shortcuts import render
from rest_framework import generics
from .serializers import RecipeSerializer


class RecipeView(ListView):
    template_name = "recipe_list.html"
    model = Recipes


class CreateRecipe(CreateView):
    template_name = "recipe_create.html"
    model = Recipes
    fields = ("id", "user_id", "recipe_name", "data_url", "memo")
    success_url = reverse_lazy("list-recipe")


class DeleteRecipe(DeleteView):
    template_name = "recipe_confirm_delete.html"
    model = Recipes
    success_url = reverse_lazy("list-recipe")


class UpdateRecipe(UpdateView):
    template_name = "recipe_update.html"
    model = Recipes
    fields = ("id", "user_id", "recipe_name", "data_url", "memo")
    success_url = reverse_lazy("list-recipe")


def recipe_list(request):

    uid = request.user.id
    recipes_list = get_list_or_404(Recipes, user_id=uid)
    template_name = "recipe_list.html"
    return render(request, template_name, {"object_list": recipes_list})


# rest framework の ViewSet を用いて作成
class RecipeList(generics.ListCreateAPIView):
    queryset = Recipes.objects.all()
    serializer_class = RecipeSerializer


class RecipeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Recipes.objects.all()
    serializer_class = RecipeSerializer
