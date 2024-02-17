from django.shortcuts import render
from django.urls import reverse_lazy
from django.views.generic import ListView, CreateView, DeleteView, UpdateView
from .models import Recipes
# Create your views here.
class RecipeView(ListView):
    template_name = 'recipe_list.html'
    model = Recipes

class CreateRecipe(CreateView):
    template_name = 'recipe_create.html'
    model = Recipes
    fields = ('id','user_id','recipe_name','data_url','memo')
    success_url = reverse_lazy('list-recipe')


class DeleteRecipe(DeleteView):
    template_name = 'recipe_confirm_delete.html'
    model = Recipes
    success_url = reverse_lazy('list-recipe')


class UpdateRecipe(UpdateView):
    template_name='recipe_update.html'
    model = Recipes
    fields = ('id','user_id','recipe_name','data_url','memo')
    success_url = reverse_lazy('list-recipe')

from django.shortcuts import render

# Create your views here.
