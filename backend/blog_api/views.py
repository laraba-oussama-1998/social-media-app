from django.shortcuts import render,get_object_or_404
from rest_framework import generics
from .models import Post
from .serializers import PostSerializer
from rest_framework.parsers import MultiPartParser, FormParser

from rest_framework.permissions import SAFE_METHODS,BasePermission,IsAuthenticatedOrReadOnly\
                                        ,IsAuthenticated,DjangoModelPermissionsOrAnonReadOnly,AllowAny
from rest_framework import viewsets
from rest_framework.response import Response


# create custom permissions to allow post editing only for authors
# SAFE_METHODS includes reading permission like heads option and get

class PostUserWritePermission(BasePermission):

    def has_object_permission(self, request, view, obj):
        message = "Editing post is restricted to the author only"

        if request.method in SAFE_METHODS:
            return True
        return obj.author == request.user


# let's now use the model viewsets
class PostView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly, PostUserWritePermission]
    serializer_class = PostSerializer

    def get_object(self, queryset = None, **kwargs):
        # here the pk is reference to the url arguments not the primary key of the post model
        # we can access it by the kwargs
        item = self.kwargs.get('pk')
        # here choose the field. in our example we will use title as url pk
        obj = get_object_or_404(Post, id = item)
        
        self.check_object_permissions(self.request, obj)
        return obj

    def get_queryset(self):
        return Post.postobjects.all()




# creation of the viewsets views
# class PostList(viewsets.ViewSet):
#     permission_classes = [IsAuthenticated]
#     queryset = Post.postobjects.all()
#
#     def list(self, request):
#         serializer_class = PostSerializer(self.queryset, many=True)
#         return Response(serializer_class.data)
#
#     def retrieve(self, request, pk=None):
#         post = get_object_or_404(self.queryset, pk=pk)
#         serializer_class = PostSerializer(post)
#         return Response(serializer_class.data)

    # methods that could be implement when using viewsets
    # def list(self, request):
    #     pass
    #
    # def create(self, request):
    #     pass
    #
    # def retrieve(self, request, pk=None):
    #     pass
    #
    # def update(self, request, pk=None):
    #     pass
    #
    # def partial_update(self, request, pk=None):
    #     pass
    #
    # def destroy(self, request, pk=None):
    #     pass



# Create your views here.
# class PostList(generics.ListCreateAPIView):
#     #permission_classes = [IsAuthenticatedOrReadOnly]
#     queryset = Post.postobjects.all()
#     serializer_class = PostSerializer
#     pass
#
# class PostDetail(generics.RetrieveUpdateDestroyAPIView,PostUserWritePermission):
#     #permission_classes = [PostUserWritePermission]
#     queryset = Post.objects.all()
#     serializer_class = PostSerializer
#     pass


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
