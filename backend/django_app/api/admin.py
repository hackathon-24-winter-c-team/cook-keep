from django.contrib import admin
from .models import Recipes, Images, Tags, RecipesTag

# Register your models here.


admin.site.register(Recipes)
admin.site.register(Images)
admin.site.register(Tags)
admin.site.register(RecipesTag)
