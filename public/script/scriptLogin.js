document.addEventListener('DOMContentLoaded', function () {
    console.log('Script carregado e DOMContentLoaded disparado');
  
    const form = document.getElementById('loginForm');
    console.log('Formulário encontrado:', form);
  
    if (form) {
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        console.log('Evento de submissão do formulário capturado');
  
        const formData = new FormData(form);
        const data = {
          email: formData.get('email'),
          password: formData.get('password')
        };
  
        console.log('Dados a serem enviados:', data)
  
        fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(response => {
          console.log('Resposta bruta do servidor:', response);
          return response.json();
        })
        .then(result => {
          console.log('Resposta do servidor:', result);
          if (result.error) {
            alert('Erro: ' + result.error);
          } else {
            if (result.perfilUsuario === 'DOADOR') {
              window.location.href = 'mainDoador';
            } else if (result.perfilUsuario === 'RECEPTOR') {
              window.location.href = 'mainReceptor';
            } else {
              alert('Perfil de usuário desconhecido');
            }
          }
        })
        .catch(error => {
          console.error('Erro ao fazer login:', error);
          alert('Erro ao fazer login');
        });
      });
    }
  });
  