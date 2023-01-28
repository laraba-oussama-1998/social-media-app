from django.urls import path
from .views import PostView, LikeView
from rest_framework.routers import DefaultRouter

app_name = 'blog_api'

router = DefaultRouter()
router.register('',PostView,basename="blogs")
urlpatterns = router.urls


urlpatterns += [
    path('<int:post_id>/like',LikeView.as_view(),name="like"),
    ]


"""
    path('',PostList.as_view(),name = "listcreate"),
    path('<int:pk>/',PostDetail.as_view(),name = "detailcreate"),

]
"""
