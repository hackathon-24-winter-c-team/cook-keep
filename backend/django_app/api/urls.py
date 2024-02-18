from django.urls import include, path
from . import views

urlpatterns = [
    path('recipes/',views.RecipeView.as_view(), name='list-recipe'),
    path('create/',views.CreateRecipe.as_view(), name='create-recipe'),
    path('<int:pk>/delete',views.DeleteRecipe.as_view(),name='delete-recipe'),
    path('<int:pk>/update/',views.UpdateRecipe.as_view(),name='update-recipi'),
    path('list',views.recipe_list),
]
