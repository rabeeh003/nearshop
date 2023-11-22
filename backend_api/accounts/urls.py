from .views import cus_signup,cus_signin, cus_signout, owner_register, shop_register, owner_login
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('signup/', cus_signup.as_view(), name='signup'),
    path('signin/', cus_signin.as_view(), name='signin'),
    path('signout/', cus_signout.as_view(), name='signout'),
    path('register/', owner_register.as_view(), name='register'),
    path('shop_register/', shop_register.as_view(), name='shopRegister'),
    path('owner_login/', owner_login.as_view(), name='ownerLogin'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

