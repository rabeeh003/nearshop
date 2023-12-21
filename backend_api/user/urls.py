from django.urls import path
from .views import LocationView, LocationDetailView


urlpatterns = [
    path('location/', LocationView.as_view(), name='location'),
    path('location/<int:pk>/', LocationDetailView.as_view(), name='location-detail'),
] 

