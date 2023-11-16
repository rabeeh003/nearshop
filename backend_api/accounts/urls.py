from .views import cus_signup,cus_signin
from django.urls import path
# from rest_framework import routers

# router = routers.DefaultRouter()
# router.register('signup', views.cus_signup, basename='signup')

urlpatterns = [
    path('signup/', cus_signup.as_view(), name='signup'),
    path('signin/', cus_signin.as_view(), name='signin'),
]

# urlpatterns += router.urls