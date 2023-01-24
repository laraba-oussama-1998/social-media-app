from rest_framework import serializers
from blog_api.models import Post
from users.serializers import ProfileSerializer
import json
class PostSerializer(serializers.ModelSerializer):
    
    
    category = serializers.SerializerMethodField(read_only= True)
    username = serializers.SerializerMethodField(read_only= True)
    avatar = serializers.SerializerMethodField(read_only= True)
    profession = serializers.SerializerMethodField(read_only= True)
    class Meta:
        model = Post
        #choose what data you need it
        fields = (  'id',
                    'author',
                    'username',
                    'avatar',
                    'profession',
                    'title',
                    'content',
                    'category',
                    'status',
                    'image') 
    
    def get_category(self,obj):
        return obj.category.name
    
    def get_username(self,obj):
        return obj.author.user_name
    
    def get_avatar(self,obj):
        request = self.context.get('request')
        photo_url = obj.author.profile.avatar.url
        return request.build_absolute_uri(photo_url)
    
    def get_profession(self,obj):
        return obj.author.profile.profession
    
    
