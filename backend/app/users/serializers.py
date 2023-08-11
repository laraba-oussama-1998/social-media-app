from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from users.models import NewUser, Profile, FollowerRelation


class CustomUserSerializer(serializers.ModelSerializer):
    """
    Currently unused in preference of the below.
    """
    user_name = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True)
    confirm_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = NewUser
        fields = ('user_name', 'email', 'password', 'confirm_password')
        extra_kwargs = {
                        'password': {'write_only': True},
                        'confirm_password': {'write_only': True}
                        }
        
        
    def validate_email(self, email):
        existing = NewUser.objects.filter(email=email).first()
        if existing:
            raise serializers.ValidationError("Someone with that email "
                "address has already registered. Was it you?")
        return email

    def validate(self, attrs):
        if not attrs.get('password') or not attrs.get('confirm_password'):
            raise serializers.ValidationError("Please enter a password and "
                "confirm it.")
        if attrs.get('password') != attrs.get('confirm_password'):
            raise serializers.ValidationError("Confirm password don't match the password.")
        return attrs

    def create(self, validated_data):
        
        password = validated_data.pop('password', None)
        #after validation the password we don't need it anymore so we gonna pop it
        validated_data.pop('confirm_password', None)
        # as long as the fields are the same, we can just use this
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
            instance.is_active = True
        instance.save()
        return instance
    
    
class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewUser
        fields = ["id","first_name", "last_name"]
    
class ProfileSerializer(serializers.ModelSerializer):

    user = UpdateUserSerializer()
    user_name = serializers.SerializerMethodField(read_only=True)
    is_following = serializers.SerializerMethodField(read_only=True)
    followers_count = serializers.SerializerMethodField(read_only=True)
    following_count = serializers.SerializerMethodField(read_only=True)
    posts_number = serializers.SerializerMethodField(read_only= True)
    
    class Meta:
        model = Profile
        fields = [
            "id",
            "user_name",
            "user",
            "avatar",
            "profession",
            "about",
            "adresse",
            "mobile",
            "birthday",
            "facebook_link",
            "instagram_link",
            "twitter_link",
            "followers_count",
            "following_count",
            "is_following",
            "posts_number"
        ]
    
    def update(self, instance, validated_data):
        
        # this for the update profil card because it didn't need the user data
        
        try:
            user = validated_data.pop('user')
            user_instance = NewUser.objects.get(user_name=instance.user.user_name)
            user_instance.first_name = user.get("first_name")
            user_instance.last_name = user.get("last_name")
            user_instance.save()
        
        except: 
            print("no user data need to change")
        
        
        instance = super().update(instance, validated_data)
        return instance
    
    
    def get_is_following(self, obj):
        # request???
        is_following = False
        context = self.context
        request = context.get("request")
        if request:
            user = request.user
            is_following = user in obj.followers.all()
        return is_following
    
    """def get_first_name(self, obj):
        return obj.user.first_name
    """
    
    def get_user_name(self, obj):
        return obj.user.user_name
    
    def get_following_count(self, obj):
        return obj.user.following.count()
    
    def get_followers_count(self, obj):
        return obj.followers.count()
    
    def get_posts_number(self,obj):
        return obj.user.user_posts.published().count()


class UserPasswordSerializer(serializers.ModelSerializer):
    
    current_password = serializers.CharField(write_only=True, required=True)
    new_password = serializers.CharField(write_only=True, required=True)
    confirm_new_password = serializers.CharField(write_only=True, required=True)
    
    class Meta():
        model = NewUser
        fields = ('current_password', 'new_password', 'confirm_new_password')
        
    
    def validate(self, attrs):
        if not attrs.get('new_password') or not attrs.get('confirm_new_password'):
            raise serializers.ValidationError("Please enter a password and "
                "confirm it.")
        if attrs.get('new_password') != attrs.get('confirm_new_password'):
            raise serializers.ValidationError("Confirm password don't match the password.")
        return attrs
    
    def validate_current_password(self, current_password):
        user = self.context['request'].user
        if not user.check_password(current_password):
            raise serializers.ValidationError("The Current password is wrong !!")
        return current_password
    
    def update(self,instance, validated_data):
        
        password = validated_data.pop("new_password")
        instance.set_password(password)
        instance.save()
        return instance

class FollowSerializer(serializers.ModelSerializer):
    
    class Meta():
        model = FollowerRelation
        fields = "__all__"


from rest_framework_simplejwt.views import TokenObtainPairView


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['profile'] = ProfileSerializer(user.profile).data

        return token

