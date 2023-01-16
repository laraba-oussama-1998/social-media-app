from rest_framework import serializers
from blog_api.models import Post
from users.serializers import ProfileSerializer
import json
class PostSerializer(serializers.ModelSerializer):
    
    author_obj = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Post
        #choose what data you need it
        fields = ('id', 'title', 'author','author_obj', 'excerpt', 'content', 'status', 'image') 
        
    
    def get_author_obj(self, obj):
        
        return ProfileSerializer(obj.author.profile).data
