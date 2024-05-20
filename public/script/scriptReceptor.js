document.addEventListener("DOMContentLoaded", function() {
    // Abrir e fechar o modal de perfil
    let modalPerfil = document.getElementById("modal");
    let btnPerfil = document.getElementsByClassName("perfil")[0];
    let spanPerfil = document.getElementsByClassName("close")[0];
    let formPerfil = document.getElementById("updateProfileForm");
    let successMessage = document.getElementById("success-message");


    btnPerfil.onclick = function() {
        modalPerfil.style.display = "block";
    }

    spanPerfil.onclick = function() {
        modalPerfil.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modalPerfil) {
            modalPerfil.style.display = "none";
        }
    }

    formPerfil.onsubmit = function(event) {
        event.preventDefault();
        const nome = document.getElementById("nome").value;
        const telefone = document.getElementById("telefone").value;
        const endereco = document.getElementById("endereco").value;
        const organizacao = document.getElementById("organizacao").value;

        // Fechar o modal após atualização
        modalPerfil.style.display = "none";

        // Mostrar mensagem de sucesso
        successMessage.style.display = "block";

        // Ocultar a mensagem de sucesso após 3 segundos
        setTimeout(function() {
            successMessage.style.display = "none";
        }, 1000);
    }
});
