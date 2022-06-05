from django.shortcuts import render
from rest_framework import generics
from .models import Post
from .api.serializers import PostSerializer
from rest_framework.permissions import SAFE_METHODS,BasePermission,IsAuthenticatedOrReadOnly,DjangoModelPermissionsOrAnonReadOnly


# create custom permissions to allow post editing only for authors
# SAFE_METHODS includes reading permission like heads option and get
class PostUserWritePermission(BasePermission):

    def has_object_permission(self, request, view, obj):
        message = "Editing post is restricted to the author only"

        if request.method in SAFE_METHODS:
            return True
        return obj.author == request.user


# Create your views here.
class PostList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    queryset = Post.postobjects.all()
    serializer_class = PostSerializer
    pass

class PostDetail(generics.RetrieveUpdateDestroyAPIView,PostUserWritePermission):
    permission_classes = [PostUserWritePermission]
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    pass


""" Concrete View Classes
#CreateAPIView
Used for create-only endpoints.
#ListAPIView
Used for read-only endpoints to represent a collection of model instances.
#RetrieveAPIView
Used for read-only endpoints to represent a single model instance.
#DestroyAPIView
Used for delete-only endpoints for a single model instance.
#UpdateAPIView
Used for update-only endpoints for a single model instance.
##ListCreateAPIView
Used for read-write endpoints to represent a collection of model instances.
RetrieveUpdateAPIView
Used for read or update endpoints to represent a single model instance.
#RetrieveDestroyAPIView
Used for read or delete endpoints to represent a single model instance.
#RetrieveUpdateDestroyAPIView
Used for read-write-delete endpoints to represent a single model instance.
"""