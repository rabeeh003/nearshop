from .views import cus_signup,cus_signin, owner_register, shop_register, owner_login, owner_mail_check
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('signup/', cus_signup.as_view(), name='signup'),
    path('signin/', cus_signin.as_view(), name='signin'),
    path('register/', owner_register.as_view(), name='register'),
    path('shop_register/', shop_register.as_view(), name='shopRegister'),
    path('shop_mail_check/', owner_mail_check.as_view(), name='ownerMailCheck'),
    path('owner_login/', owner_login.as_view(), name='ownerLogin'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

