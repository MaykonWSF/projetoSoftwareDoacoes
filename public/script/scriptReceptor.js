document.addEventListener("DOMContentLoaded", function() {
    // Abrir e fechar o modal de perfil
    let modalPerfil = document.getElementById("modal");
    let btnPerfil = document.getElementsByClassName("perfil")[0];
    let spanPerfil = modalPerfil.getElementsByClassName("close")[0];
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
        }, 3000);
    }

    // Abrir e fechar o modal de produto
    let modalProduto = document.getElementById("modal-produto");
    let spanProduto = modalProduto.getElementsByClassName("close")[0];

    spanProduto.onclick = function() {
        modalProduto.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modalProduto) {
            modalProduto.style.display = "none";
        }
    }

    // Exibir informações do produto ao clicar no card
    let cards = document.querySelectorAll(".card");
    cards.forEach(function(card) {
        card.onclick = function() {
            let produtoNome = card.querySelector("h2").innerText;
            let produtoImg = card.querySelector("img").src;
            let produtoQuantidade = "...";
            let produtoDoador = card.querySelector("p").innerText;
            let produtoTelefone = "...";
            let produtoEndereco = "...";

            document.querySelector("#modal-produto .info-produto img").src = produtoImg;
            document.querySelector("#modal-produto .detalhes-produto h2").innerText = produtoNome;
            document.querySelector("#modal-produto .quantidade-produto .value").innerHTML = produtoQuantidade;
            document.querySelector("#modal-produto .doador-produto .value").innerHTML = produtoDoador;
            document.querySelector("#modal-produto .telefone-produto .value").innerHTML = produtoTelefone;
            document.querySelector("#modal-produto .endereco-produto .value").innerHTML = produtoEndereco;

            modalProduto.style.display = "block";
        }
    });
});
