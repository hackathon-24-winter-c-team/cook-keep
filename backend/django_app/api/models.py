from django.db import models

# Create your models here.


class Recipes(models.Model):
    id = models.BigAutoField(primary_key=True)
    user_id = models.ForeignKey("accounts.User", on_delete=models.CASCADE)
    recipe_name = models.CharField(max_length=128)
    data_url = models.URLField()
    memo = models.TextField()

    def __str__(self):
        return self.recipe_name


class Images(models.Model):
    id = models.BigAutoField(primary_key=True)
    recipe_id = models.ForeignKey(Recipes, on_delete=models.CASCADE, related_name="images")
    image_url = models.URLField()


class Tags(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=128)
    icon_url = models.URLField()


class RecipesTag(models.Model):
    id = models.BigAutoField(primary_key=True)
    recipe_id = models.ForeignKey(Recipes, on_delete=models.CASCADE, related_name="recipes")
    tag_id = models.ForeignKey(Tags, on_delete=models.CASCADE, related_name="tags")
