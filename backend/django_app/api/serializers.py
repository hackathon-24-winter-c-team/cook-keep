from rest_framework import serializers
from .models import Recipe


class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = [
            "id",
            # "user_id",
            "recipe_name",
            "data_url",
            "memo",
            "image_1",
            "image_2",
            "image_3",
            "main_tag",
            "genre_tag",
            "jitan_tag",
        ]
        extra_kwargs = {"user_id": {"write_only": True}}

