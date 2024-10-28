from django.urls import path
from . import views

urlpatterns = [
    path('cadastrar/', views.cadastrar_usuario, name='cadastrar_usuario'),
    path('logar/', views.login_usuario, name='login_usuario'),
    path('doador/', views.main_doador, name='main_doador'),
    path('receptor/', views.main_receptor, name='main_receptor'),
    path('login/', views.login, name='login'),
    path('cadastro/', views.cadastro, name='cadastro'),
]
