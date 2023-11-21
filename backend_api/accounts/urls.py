from .views import cus_signup,cus_signin, cus_signout, owner_register
from django.urls import path

urlpatterns = [
    path('signup/', cus_signup.as_view(), name='signup'),
    path('signin/', cus_signin.as_view(), name='signin'),
    path('signout/', cus_signout.as_view(), name='signout'),
    path('register/', owner_register.as_view(), name='register'),
]