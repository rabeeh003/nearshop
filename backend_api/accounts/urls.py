from .views import cus_signup,cus_signin, cus_details, owner_register, shop_register, shopsall, shop_update, shop_login, owner_login, owner_mail_check
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('signup/', cus_signup.as_view(), name='signup'),
    path('signin/', cus_signin.as_view(), name='signin'),
    path('customer/<int:user_id>/', cus_details.as_view(), name='user-detail'),
    path('register/', owner_register.as_view(), name='register'),
    path('shop_register/', shop_register.as_view(), name='shopRegister'),
    path('shopsall/<int:pk>/', shopsall.as_view(), name='shopsall'),
    path('shop_login/', shop_login.as_view(), name='shopLogin'),
    path('shop_update/<int:pk>/', shop_update.as_view(), name='shopUpdate'),
    path('shop_mail_check/', owner_mail_check.as_view(), name='ownerMailCheck'),
    path('owner_login/', owner_login.as_view(), name='ownerLogin'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)