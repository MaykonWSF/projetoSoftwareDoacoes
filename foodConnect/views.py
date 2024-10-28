from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Usuario
from .serializers import UsuarioSerializer
from django.contrib.auth.hashers import check_password
from django.contrib.auth.hashers import make_password
from django.shortcuts import render

@api_view(['POST'])
def cadastrar_usuario(request):
    if request.method == 'POST':
        serializer = UsuarioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['password'] = make_password(request.data['senha'])
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_usuario(request):
    email = request.data.get('email')
    senha = request.data.get('senha')
    
    try:
        usuario = Usuario.objects.get(email=email)
        
        if check_password(senha, usuario.password):
            return Response({
                'message': 'Login bem-sucedido',
                'perfilUsuario': usuario.perfilUsuario
            }, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Credenciais inválidas'}, status=status.HTTP_400_BAD_REQUEST)

    except Usuario.DoesNotExist:
        return Response({'message': 'Usuário não encontrado'}, status=status.HTTP_404_NOT_FOUND)

def main_doador(request):
    return render(request, 'foodConnect/mainDoador.html')

def main_receptor(request):
    return render(request, 'foodConnect/mainReceptor.html')

def login(request):
    return render(request, 'foodConnect/login.html')

def cadastro(request):
    return render(request, 'foodConnect/cadastro.html')