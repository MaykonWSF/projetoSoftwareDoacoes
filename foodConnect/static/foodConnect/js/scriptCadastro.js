document.addEventListener('DOMContentLoaded', function () {
    const botaoReceptor = document.getElementById('botao-receptor');
    const botaoEmpresa = document.getElementById('botao-empresa');
    let perfilUsuario = '';

    if (botaoReceptor && botaoEmpresa) {
        botaoReceptor.addEventListener('click', function () {
            mudarLabel('Nome da ONG');
            selecionarBotao('botao-receptor');
            perfilUsuario = 'RECEPTOR';
        });

        botaoEmpresa.addEventListener('click', function () {
            mudarLabel('Nome da Empresa');
            selecionarBotao('botao-empresa');
            perfilUsuario = 'DOADOR';
        });
    } else {
        console.error("Botões não foram encontrados, verifique os IDs");
    }

    function mudarLabel(texto) {
        const labelOng = document.getElementById('label-ong');
        const inputOng = document.getElementById('ong');
        if (labelOng && inputOng) {
            labelOng.innerText = texto;
            let placeholderText = texto === "Nome da ONG" ? "Digite o nome de sua ONG" : "Digite o nome de sua Empresa";
            inputOng.placeholder = placeholderText;
        } else {
            console.error("Elementos de input ou label não encontrados");
        }
    }

    function selecionarBotao(botaoId) {
        const botaoReceptor = document.getElementById('botao-receptor');
        const botaoEmpresa = document.getElementById('botao-empresa');
        if (botaoReceptor && botaoEmpresa) {
            botaoReceptor.classList.remove('botao-selecionado');
            botaoEmpresa.classList.remove('botao-selecionado');

            const botaoSelecionado = document.getElementById(botaoId);
            if (botaoSelecionado) {
                botaoSelecionado.classList.add('botao-selecionado');
            } else {
                console.error("Botão selecionado não encontrado");
            }
        } else {
            console.error("Botões para seleção não foram encontrados");
        }
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

    const form = document.getElementById('cadastroForm');

    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const formData = new FormData(form);
            const data = {
                nome: formData.get('nome'),
                email: formData.get('email'),
                confirmacaoEmail: formData.get('confirmacao-email'),
                senha: formData.get('senha'),
                confirmacaoSenha: formData.get('confirmacao-senha'),
                telefone: formData.get('telefone'),
                endereco: formData.get('endereco'),
                perfilUsuario: perfilUsuario,
                nomeOrganizacao: formData.get('nomeOrganizacao')
            };

            console.log('Dados a serem enviados:', data);

            fetch('/foodconnect/cadastrar/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken')
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
                if (result.error) {
                    console.error('Erro recebido do servidor:', result.error); 
                    alert('Erro: ' + result.error);
                } else {
                    console.log('Resposta de sucesso do servidor:', result); 
                    alert('Usuário cadastrado com sucesso!');
                    form.reset(); 
                    perfilUsuario = '';
                }
            })
            .catch(error => {
                console.error('Erro ao cadastrar usuário:', error); 
                alert('Erro ao cadastrar usuário');
            });
        });
    }
});
