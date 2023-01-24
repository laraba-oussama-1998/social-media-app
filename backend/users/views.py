from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets, mixins
from .serializers import (CustomUserSerializer,
                            ProfileSerializer,
                            UserPasswordSerializer,
                            FollowSerializer,
                            CustomTokenObtainPairSerializer)
from blog_api.serializers import PostSerializer

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import (BasePermission,
                                        SAFE_METHODS,
                                        AllowAny,
                                        IsAuthenticatedOrReadOnly,
                                        IsAuthenticated)

from .models import Profile, NewUser, FollowerRelation
from rest_framework.decorators import action, api_view


class ProfilePermission(BasePermission):

    def has_object_permission(self, request, view, obj):
        message = "Editing post is restricted to the author only"

        if request.method in SAFE_METHODS:
            return True
        return obj.user == request.user


class CustomUserCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data) 
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BlacklistTokenUpdateView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            
            token = RefreshToken(refresh_token)
            
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        

class ProfileView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly, ProfilePermission]
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
    lookup_field = "username"
    
    def get_object(self, queryset = None, **kwargs):
        # here the pk is reference to the url arguments not the primary key of the post model
        # we can access it by the kwargs
        item = self.kwargs.get('username')
        # here choose the field. in our example we will use title as url pk
        obj = get_object_or_404(Profile, user__user_name = item)
        
        self.check_object_permissions(self.request, obj)
        return obj
    
    
    
    @action(detail=True, methods=['post'])
    def follow(self, request, username):
    
        user = request.user
        profile_to_follow = Profile.objects.filter(user__user_name=username)
        
        if not profile_to_follow.exists():
            return Response({"detail": "User not found"}, status=404)

        action = request.data['action']
        profile_to_follow = profile_to_follow.first()
        if profile_to_follow != user:
            
            if action == "follow":
                profile_to_follow.followers.add(user)
            elif action == "unfollow":
                profile_to_follow.followers.remove(user)
            
        
        return Response(status=200)
    


class FollowView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request, username):
    
        user = request.user
        profile_to_follow = Profile.objects.filter(user__user_name=username)
        
        if not profile_to_follow.exists():
            return Response({"detail": "User not found"}, status=404)

        action = request.data['action']
        profile_to_follow = profile_to_follow.first()
        if profile_to_follow != user:
            
            if action == "follow":
                profile_to_follow.followers.add(user)
            elif action == "unfollow":
                profile_to_follow.followers.remove(user)
            
        
        return Response(status=200)

class ChangeUserPasswordView(mixins.UpdateModelMixin,
                    viewsets.GenericViewSet):
    
    permission_classes = [IsAuthenticated]
    serializer_class = UserPasswordSerializer
    queryset = NewUser.objects.all()
    lookup_field = "user_name"
    
    def get_object(self, queryset = None, **kwargs):
        # here the pk is reference to the url arguments not the primary key of the post model
        # we can access it by the kwargs
        item = self.kwargs.get('user_name')
        # here choose the field. in our example we will use title as url pk
        obj = get_object_or_404(NewUser, user_name = item)
        
        self.check_object_permissions(self.request, obj)
        return obj



class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer