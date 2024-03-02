from django.db import models


class Recipe(models.Model):
    id = models.BigAutoField(primary_key=True)
    user_id = models.ForeignKey("accounts.User", on_delete=models.CASCADE)
    recipe_name = models.CharField(max_length=128)
    data_url = models.URLField(blank=True)
    memo = models.TextField(blank=True)
    image_1 = models.ImageField(upload_to="images/", blank=True)
    image_2 = models.ImageField(upload_to="images/", blank=True)
    image_3 = models.ImageField(upload_to="images/", blank=True)
    main_tag = models.CharField(max_length=128, blank=True)
    genre_tag = models.CharField(max_length=128, blank=True)
    jitan_tag = models.BooleanField(default=False)

    def __str__(self):
        return self.recipe_name
