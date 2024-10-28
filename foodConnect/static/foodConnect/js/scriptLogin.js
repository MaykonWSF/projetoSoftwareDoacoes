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
        senha: formData.get('password')
      };

      console.log('Dados a serem enviados:', data);

      fetch('/foodconnect/logar/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken')
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
            window.location.href = '/foodconnect/doador/';
          } else if (result.perfilUsuario === 'RECEPTOR') {
            window.location.href = '/foodconnect/receptor/';
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

  function getCookie(name) {
      let cookieValue = null;
      if (document.cookie && document.cookie !== '') {
          const cookies = document.cookie.split(';');
          for (let i = 0; i < cookies.length; i++) {
              const cookie = cookies[i].trim();
              if (cookie.substring(0, name.length + 1) === (name + '=')) {
                  cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                  break;
              }
          }
      }
      return cookieValue;
  }
});
