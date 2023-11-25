# from .views import 
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    # path('signup/', cus_signup.as_view(), name='signup'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

