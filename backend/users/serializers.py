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
    
    

class ProfileSerializer(serializers.ModelSerializer):
    
    first_name = serializers.SerializerMethodField(read_only=True)
    is_following = serializers.SerializerMethodField(read_only=True)
    user_name = serializers.SerializerMethodField(read_only=True)
    follower_count = serializers.SerializerMethodField(read_only=True)
    following_count = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Profile
        fields = [
            "id",
            "user_name",
            "first_name",
            "avatar",
            "about",
            "adresse",
            "mobile",
            "birthday",
            "facebook_link",
            "instagram_link",
            "twitter_link",
            "follower_count",
            "following_count",
            "is_following",
        ]
        
    def get_is_following(self, obj):
        # request???
        is_following = False
        context = self.context
        request = context.get("request")
        if request:
            user = request.user
            is_following = user in obj.followers.all()
        return is_following
    
    def get_first_name(self, obj):
        return obj.user.first_name

    
    def get_user_name(self, obj):
        return obj.user.user_name
    
    def get_following_count(self, obj):
        return obj.user.following.count()
    
    def get_follower_count(self, obj):
        return obj.followers.count()


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
    
    def validate_recent_password(self, recent_password):
        user = self.context['request'].user
        if not user.check_password(recent_password):
            raise serializers.ValidationError("The Current passwor is wrong !!")
        return recent_password

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

