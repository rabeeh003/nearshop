from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.generics import ListCreateAPIView, ListAPIView, RetrieveAPIView
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from .models import global_productes, category
from .serializers import GlobalProductAdd, GlobalCategory
import jwt
from rest_framework.response import Response
from rest_framework import status

class GlobalProduct(ListCreateAPIView):
    # authentication_classes = [TokenAuthentication]  # Use the appropriate authentication class
    permission_classes = [AllowAny]  # Ensure only authenticated users can access

    queryset = global_productes.objects.all()  # Modify the queryset according to your model
    serializer_class = GlobalProductAdd
    
    def check_token_in_header(request):
        if request.method == 'POST':
            token = request.headers.get('Authorization')

            if not token:
                return Response({'error': 'Token missing'}, status=status.HTTP_401_UNAUTHORIZED)

            try:
                decoded_token = jwt.decode(token, 'your_secret_key_here', algorithms=['HS256'])
                # Additional verification logic can go here if needed

                # If the token is valid, return True or the decoded token
                return True
            except jwt.ExpiredSignatureError:
                return Response({'error': 'Token expired'}, status=status.HTTP_401_UNAUTHORIZED)
            except jwt.InvalidTokenError:
                return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)

        return False 
    
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        try:
            return super().post(request, *args, **kwargs)
        except:
            return Response(status=404,)

class ProductDetailView(APIView):
    permission_classes = [AllowAny]  # Adjust permissions as needed

    def get(self, request, pk):
        product = get_object_or_404(global_productes, pk=pk)
        serializer = GlobalProductAdd(product)
        return Response(serializer.data)

class GlobalCategory(ListAPIView):
    permission_classes = [AllowAny]
    queryset = category.objects.all()
    serializer_class = GlobalCategory
    
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

