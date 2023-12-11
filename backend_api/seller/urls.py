from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from .views import SellerProductView, AllProduct, ProductDetails, SellerProductEditView, ShopDetailAPIView
from .views import (
    OrderListCreateView, OrderDetailView,
    PaymentListCreateView, PaymentDetailView,
    MessageListCreateView, MessageDetailView,
    OrderProductListCreateView, OrderProductDetailView,
)

urlpatterns = [
    path('addproduct/', SellerProductView.as_view(), name='addproduct'),
    path('editproduct/<int:pk>/update/', SellerProductEditView.as_view(), name='addproduct'),
    path('shopproducts/', AllProduct.as_view(), name='allproduct'),
    path('shopproducts/<int:pk>/', ProductDetails.as_view(), name='productdtl'),
    path('shop/<str:shop_id>/', ShopDetailAPIView.as_view(), name='shop-detail'),
    # order, message and payment
    path('orders/', OrderListCreateView.as_view(), name='order-list-create'),
    path('orders/<int:pk>/', OrderDetailView.as_view(), name='order-detail'),
    path('payments/', PaymentListCreateView.as_view(), name='payment-list-create'),
    path('payments/<int:pk>/', PaymentDetailView.as_view(), name='payment-detail'),
    path('messages/', MessageListCreateView.as_view(), name='message-list-create'),
    path('messages/<int:pk>/', MessageDetailView.as_view(), name='message-detail'),
    path('orderproduct/', OrderProductListCreateView.as_view(), name='orderproduct'),
    path('orderproduct/<int:pk>/', OrderProductDetailView.as_view(), name='orderproduct-detail'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

