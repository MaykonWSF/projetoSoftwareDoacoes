document.addEventListener("DOMContentLoaded", function() {
    // Abrir e fechar o modal de perfil
    let modalPerfil = document.getElementById("modal-perfil");
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

    // Modal para exibir informações do produto
    let modalInfoProduto = document.getElementById("modal-produto");
    let spanInfoProduto = modalInfoProduto.getElementsByClassName("close")[0];
    let btnReservarProduto = modalInfoProduto.querySelector("#botao-reservar");
    let btnCancelarReserva = modalInfoProduto.querySelector("#botao-cancelar");
    let reservaProdutoDiv = modalInfoProduto.querySelector(".reserva-produto");
    let detalhesSecundariosDiv = modalInfoProduto.querySelector(".detalhes-secundarios");
    let isReservarMode = true;

    spanInfoProduto.onclick = function() {
        modalInfoProduto.style.display = "none";
        resetModal();
    }

    window.onclick = function(event) {
        if (event.target == modalInfoProduto) {
            modalInfoProduto.style.display = "none";
            resetModal();
        }
    }

    btnReservarProduto.onclick = function() {
        if (isReservarMode) {
            // Mudar para o modo de confirmação
            reservaProdutoDiv.style.display = "block";
            detalhesSecundariosDiv.style.display = "none";
            btnReservarProduto.innerText = "Confirmar";
            btnReservarProduto.classList.add("confirmar");
            btnCancelarReserva.style.display = "block";
            isReservarMode = false;
        } else {
            const quantidadeReserva = document.getElementById("quantidadeReserva").value;
            const dataReserva = document.getElementById("dataReserva").value;
            alert(`Reserva confirmada!\nQuantidade: ${quantidadeReserva}\nData e Hora: ${dataReserva}`);
            modalInfoProduto.style.display = "none";
            resetModal();
        }
    }

    btnCancelarReserva.onclick = function() {
        resetModal();
    }

    function resetModal() {
        reservaProdutoDiv.style.display = "none";
        detalhesSecundariosDiv.style.display = "flex";
        btnReservarProduto.innerText = "Reservar";
        btnReservarProduto.classList.remove("confirmar");
        btnCancelarReserva.style.display = "none";
        isReservarMode = true;
    }

    // Exibir informações do produto ao clicar no card
    let cards = document.querySelectorAll(".catalogo .card");
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
            document.querySelector("#modal-produto .quantidade-produto .value").innerText = produtoQuantidade;
            document.querySelector("#modal-produto .doador-produto .value").innerText = produtoDoador;
            document.querySelector("#modal-produto .telefone-produto .value").innerText = produtoTelefone;
            document.querySelector("#modal-produto .endereco-produto .value").innerText = produtoEndereco;

            modalInfoProduto.style.display = "block";
        }
    });
});
