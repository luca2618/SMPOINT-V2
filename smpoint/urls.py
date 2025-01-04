"""
URL configuration for smpoint project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
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
from smdatabase import views
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt import views as jwt_views
from smdatabase.views import MemberViewSet, ActivityViewSet, ActivityTypeViewSet
#from smdatabase import MemberViewSet


router = DefaultRouter()
router.register(r'members', MemberViewSet)
router.register(r'activities', ActivityViewSet)
router.register(r'activitytypes', ActivityTypeViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('update_points/<str:studynr>/', views.update_points, name='update_points'),
    path('add_activity/', views.add_activity, name='add_activity'),
    path('import/',views.import_data),
    path('api/', include(router.urls)),
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
]
