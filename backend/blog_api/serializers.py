from rest_framework import serializers
from blog_api.models import Post, LikesRelation
from users.serializers import ProfileSerializer
import json

class PostSerializer(serializers.ModelSerializer):
    
    category = serializers.SerializerMethodField(read_only= True)
    username = serializers.SerializerMethodField(read_only= True)
    avatar = serializers.SerializerMethodField(read_only= True)
    profession = serializers.SerializerMethodField(read_only= True)
    date = serializers.SerializerMethodField(read_only= True)
    is_liked = serializers.SerializerMethodField(read_only= True)
    likes_count = serializers.SerializerMethodField(read_only= True)
    
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
                    'date',
                    'status',
                    'image',
                    'is_liked',
                    'likes_count') 
    
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
    
    def get_date(self,obj):
        return obj.published
    
    def get_is_liked(self,obj):
        user = self.context.get('request').user
        
        if str(user) == 'AnonymousUser':
            return False
        else:
            
            return len(obj.likes.filter(user_name=user.user_name)) != 0 
            
    
    def get_likes_count(self,obj):
        return obj.likes.count()
    


class LikeSerializer(serializers.ModelSerializer):
    
    class meta:
        model = LikesRelation
        fields = '__all__'
