from rest_framework import serializers
from blog_api.models import Post, LikesRelation, Category
from users.serializers import ProfileSerializer
import json

class PostSerializer(serializers.ModelSerializer):
    
    category_name = serializers.SerializerMethodField(read_only= True)
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
                    'category_name',
                    'date',
                    'status',
                    'image',
                    'is_liked',
                    'likes_count') 
        
    
    
    def get_category_name(self,obj):
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
    
    def create(self, validated_data):
        return Post.objects.create(**validated_data)
    
    def update(self, instance, validated_data):
        
        instance.email = validated_data.get('title', instance.title)
        instance.content = validated_data.get('content', instance.content)
        instance.image = validated_data.get('image', instance.image)
        instance.status = validated_data.get('status', instance.status)
        instance.category = validated_data.get('category', instance.category)
        instance.save()
        return instance
    

class CategorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Category
        fields = "__all__"
        read_only_fields =  ['name']

class LikeSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = LikesRelation
        fields = '__all__'
