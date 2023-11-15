from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('signup', views.cus_signup, basename='signup')

urlpatterns = [
]

urlpatterns += router.urls