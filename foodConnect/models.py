from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.utils import timezone

# Gerenciador de Usuário
class UsuarioManager(BaseUserManager):
    def create_user(self, email, nome, senha=None, **extra_fields):
        if not email:
            raise ValueError("O usuário deve ter um endereço de email")
        email = self.normalize_email(email)
        usuario = self.model(email=email, nome=nome, **extra_fields)
        usuario.set_password(senha)
        usuario.save(using=self._db)
        return usuario

# Gerenciador de Produto
class ProdutoManager(models.Manager):
    def produtos_disponiveis(self):
        return self.filter(status='DISPONÍVEL')

    def buscar_por_tipo(self, tipo):
        return self.filter(tipo=tipo)

# Gerenciador de Doacao
class DoacaoManager(models.Manager):
    def doacoes_por_doador(self, doador_id):
        return self.filter(idDoador_id=doador_id)

    def doacoes_por_receptor(self, receptor_id):
        return self.filter(idReceptor_id=receptor_id)

# Modelo de Usuário
class Usuario(AbstractBaseUser):
    idUsuario = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=200, null=False)
    email = models.EmailField(max_length=200, unique=True, null=False)
    senha = models.CharField(max_length=200, null=False)
    telefone = models.CharField(max_length=20, unique=True, null=False)
    endereco = models.CharField(max_length=200, null=False)
    perfilUsuario = models.CharField(max_length=20, null=False)
    nomeOrganizacao = models.CharField(max_length=200, null=True, blank=True)
    dataCadastro = models.DateTimeField(default=timezone.now, null=False)
    lastEdit = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=7, choices=[('ATIVO', 'ATIVO'), ('INATIVO', 'INATIVO')], default='ATIVO')

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nome']

    objects = UsuarioManager()

    class Meta:
        db_table = 'foodConnect_usuario' 

    def __str__(self):
        return self.email

# Modelo de Produto
class Produto(models.Model):
    idProduto = models.AutoField(primary_key=True)
    imagem = models.CharField(max_length=255, null=False, unique=True)
    descricao = models.CharField(max_length=200, null=False)
    quantidade = models.DecimalField(max_digits=10, decimal_places=3, null=False)
    unidade = models.CharField(max_length=20, null=False)
    tipo = models.CharField(max_length=20, null=False)
    status = models.CharField(
        max_length=15, 
        choices=[('DISPONÍVEL', 'DISPONÍVEL'), ('INDISPONÍVEL', 'INDISPONÍVEL'), ('DOADO', 'DOADO')], 
        default='DISPONÍVEL', 
        null=False
    )
    idDoador = models.ForeignKey(Usuario, on_delete=models.CASCADE, db_column='idDoador', related_name='produtos')
    dataPostagem = models.DateTimeField(default=timezone.now, null=False)

    objects = ProdutoManager()

    class Meta:
        db_table = 'foodConnect_produto'

    def __str__(self):
        return self.descricao

# Modelo de Doacao
class Doacao(models.Model):
    idDoacao = models.AutoField(primary_key=True)
    quantidade = models.DecimalField(max_digits=10, decimal_places=3, null=False)
    idProduto = models.ForeignKey(Produto, on_delete=models.CASCADE, db_column='idProduto', related_name='doacoes')
    idDoador = models.ForeignKey(Usuario, on_delete=models.CASCADE, db_column='idDoador', related_name='doacoes_doador')
    idReceptor = models.ForeignKey(Usuario, on_delete=models.CASCADE, db_column='idReceptor', related_name='doacoes_receptor')
    dataDoacao = models.DateTimeField(default=timezone.now, null=False)

    objects = DoacaoManager()

    class Meta:
        db_table = 'foodConnect_doacao'

    def __str__(self):
        return f'Doação {self.idDoacao} - {self.quantidade}'
