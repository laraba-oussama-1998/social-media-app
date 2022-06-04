from rest_framework import serializers
from blog_api.models import Post

class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ('id', 'title', 'author', 'excerpt', 'content', 'status') #choose what data you need it