from django.urls import path
from .views import PostView, LikeView, CategoryList
from rest_framework.routers import DefaultRouter

app_name = 'blog_api'

router = DefaultRouter()
router.register('blog',PostView, basename="blogs")

urlpatterns = router.urls


urlpatterns += [
    path('<int:post_id>/like',LikeView.as_view(),name="like"),
    path('category/',CategoryList.as_view(),name="categorylist"),
    ]


"""
    path('',PostList.as_view(),name = "listcreate"),
    path('<int:pk>/',PostDetail.as_view(),name = "detailcreate"),

]
"""
