"""drf URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.views.generic import TemplateView
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.authtoken.views import obtain_auth_token
from django.conf.urls.static import static
from users.views import CustomTokenObtainPairView

from rest_framework.schemas import get_schema_view
from rest_framework.documentation import include_docs_urls
# swagger documentation
from rest_framework import permissions
from drf_yasg.views import get_schema_view as get_schema_view_swagger
from drf_yasg import openapi

# swagger schema
schema_view = get_schema_view_swagger(
    openapi.Info(
        title="BlogApi",
        default_version='v1',
        description="Test description",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@snippets.local"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name = "blog_api/index.html")),
    path('api/', include('blog_api.urls', namespace='blog_api')),
    path('api/user/', include('users.urls', namespace='users')),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),
    path('docs',include_docs_urls(title = "BlogApi")),
    path('schema',get_schema_view(
        title = "BlogAPI",
        description = "API for the Blog api",
        version = "1.0.0",
        ), name = "openapi-schema"),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)