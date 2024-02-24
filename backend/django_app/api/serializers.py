from rest_framework import serializers
from .models import Recipes, Images, Tags, RecipesTag


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tags
        fields = ["id", "name", "icon_url"]


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Images
        fields = ["image_url"]


class RecipeTagSerializer(serializers.ModelSerializer):
    tag = TagSerializer(read_only=True, source="tag_id")

    class Meta:
        model = RecipesTag
        fields = ["tag"]


class RecipeSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True)
    recipe_tags = RecipeTagSerializer(many=True, read_only=True)

    class Meta:
        model = Recipes
        fields = [
            "id",
            "user_id",
            "recipe_name",
            "data_url",
            "memo",
            "images",
            "recipe_tags",
        ]
