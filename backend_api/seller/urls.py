from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from .views import SellerProductView


urlpatterns = [
    path('addproduct/', SellerProductView.as_view(), name='addproduct'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

