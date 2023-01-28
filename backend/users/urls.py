from django.urls import path
from .views import (CustomUserCreate,
                    BlacklistTokenUpdateView,
                    ProfileView,
                    ChangeUserPasswordView,
                    FollowView)
from rest_framework.routers import DefaultRouter
app_name = 'users'

router = DefaultRouter()
router.register('profile',ProfileView,basename="profile")
router.register('change_password',ChangeUserPasswordView,basename="change_password")

urlpatterns = router.urls

urlpatterns += [
    #path('<str:username>/follow/', FollowView.as_view(), name = "follow"),
    path('register/', CustomUserCreate.as_view(), name="create_user"),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(), name="blacklist")
]


