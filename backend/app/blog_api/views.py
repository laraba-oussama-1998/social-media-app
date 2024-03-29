from django.shortcuts import render,get_object_or_404
from .models import Post, Category
from .serializers import PostSerializer, CategorySerializer
from rest_framework.permissions import SAFE_METHODS,BasePermission,IsAuthenticatedOrReadOnly\
                                        ,IsAuthenticated,DjangoModelPermissionsOrAnonReadOnly,AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets, generics, filters, status
from rest_framework.views import APIView
from django.db.models import Count


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
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'content']
    

    def get_object(self, queryset = None, **kwargs):
        # here the pk is reference to the url arguments not the primary key of the post model
        # we can access it by the kwargs
        item = self.kwargs.get('pk')
        # here choose the field. in our example we will use title as url pk
        obj = get_object_or_404(Post, id = item)
        
        self.check_object_permissions(self.request, obj)
        return obj

    def get_queryset(self):
        
        query = self.request.query_params.get('category')
        
        if query is None:
            return Post.objects.published()
        else:
            return Post.objects.categorized(query=query)
        

    def create(self, request):
        data = request.data.copy()
        try:
            if data["category"] != "":
                obj, created = Category.objects.get_or_create(name=data["category"].capitalize())
                obj = Category.objects.get(name=obj)
                data["category"]= str(obj.id)
            else: del data["category"]
        except:pass
        
        
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
        

    def update(self, request, pk=None):
        instance = self.get_object()
        data = request.data.copy()
        try:
            if data["category"] != "":
                obj, created = Category.objects.get_or_create(name=data["category"].capitalize())
                obj = Category.objects.get(name=obj)
                data["category"]= str(obj.id)
            else: del data["category"]
        except:pass
        
        serializer = self.get_serializer(instance, data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        return Response(serializer.data, status=status.HTTP_200_OK)


    
    @action(detail=True, methods=['get'])
    def userposts(self, request, pk=None):
        queryset = self.get_queryset()
        if request.user.user_name == pk:
            user_posts = Post.objects.filter(author__user_name=pk)
        else: user_posts = queryset.filter(author__user_name=pk)
        
        if not user_posts.exists():
            return Response({"detail": "User not found"}, status=404)
        serializer = self.get_serializer(user_posts.all(), many=True) 
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['get'])
    def likedposts(self, request):
        serializer = self.get_serializer(request.user.liked_posts.all(), many=True) 
        
        return Response(serializer.data, status=status.HTTP_200_OK)


class LikeView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request, post_id):
    
        user = request.user
        post_to_like = Post.objects.filter(id=post_id)
        
        if not post_to_like.exists():
            return Response({"detail": "Post not found"}, status=404)

        action = request.data['action']
        post_to_like = post_to_like.first()
        if post_to_like != user:
            
            if action == "like":
                post_to_like.likes.add(user)
            elif action == "unlike":
                post_to_like.likes.remove(user)
            
        post = Post.objects.filter(id=post_id).first()
        
        
        serializer = PostSerializer(post, context={'request': request})
        
        return Response(serializer.data)


class CategoryList(generics.ListAPIView):
    
    queryset = Category.objects.all()

    def list(self, request):
        queryset = self.get_queryset().filter(post__status="published")
        queryset = queryset.annotate(num_posts=Count('post')).order_by('-num_posts')[:4]
        serializer_class = CategorySerializer(queryset, many=True)
        return Response(serializer_class.data)


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
