document.addEventListener("DOMContentLoaded", function() {
    // Modal de atualizar perfil
    let modalPerfil = document.getElementById("modal-perfil");
    let btnPerfil = document.querySelector(".perfil");
    let spanPerfil = modalPerfil.querySelector(".close");
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
    
    // Modal de adicionar produto
    let modalAddProduto = document.getElementById("modal-add-produto");
    let btnAddProduto = document.querySelector(".card-add");
    let spanAddProduto = modalAddProduto.querySelector(".close");
    let formAddProduto = document.getElementById("addProductForm");

    btnAddProduto.onclick = function() {
        modalAddProduto.style.display = "block";
    }

    spanAddProduto.onclick = function() {
        modalAddProduto.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modalAddProduto) {
            modalAddProduto.style.display = "none";
        }
    }

    formAddProduto.onsubmit = function(event) {
        event.preventDefault();
        const fileInput = document.getElementById("productImage");
        const description = document.getElementById("productDescription").value;
        const quantity = document.getElementById("productQuantity").value;
        const unitySelect = document.getElementById("productUnity");
        const unity = unitySelect.options[unitySelect.selectedIndex].text;
        const filter = document.getElementById("productFilter").value;
        const catalog = document.querySelector(".catalogo");
        const reader = new FileReader();

        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            reader.onload = function(e) {
                const card = document.createElement("div");
                card.className = "card";
                card.innerHTML = `<img src="${e.target.result}" alt="">
                                  <h2>${description}</h2>
                                  <p>${quantity} ${unity}</p>`;
                catalog.appendChild(card);
                setupCardClickListener(card);
                modalAddProduto.style.display = "none";
            };
            reader.readAsDataURL(file);
        } else {
            alert("Por favor, selecione uma imagem.");
        }
    }

    // Modal para exibir informações do produto
    let modalInfoProduto = document.getElementById("modal-produto");
    let spanInfoProduto = modalInfoProduto.querySelector(".close");
    let btnRemoverProduto = modalInfoProduto.querySelector("#botao-remover");
    let currentCard;

    spanInfoProduto.onclick = function() {
        modalInfoProduto.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modalInfoProduto) {
            modalInfoProduto.style.display = "none";
        }
    }

    btnRemoverProduto.onclick = function() {
        if (currentCard) {
            const confirmRemoval = confirm("Tem certeza que deseja remover este produto da lista de doações?");
            if (confirmRemoval) {
                currentCard.remove();
                modalInfoProduto.style.display = "none";
            }
        }
    }

    // Função para configurar os event listeners nos cartões
    function setupCardClickListener(card) {
        card.onclick = function() {
            let produtoNome = card.querySelector("h2").innerText;
            let produtoImg = card.querySelector("img").src;
            let produtoQuantidade = card.querySelector("p").innerText;
            let produtoDoador = "...";
            let produtoTelefone = "...";
            let produtoEndereco = "...";

            document.querySelector("#modal-produto .info-produto img").src = produtoImg;
            document.querySelector("#modal-produto .detalhes-produto h2").innerText = produtoNome;
            document.querySelector("#modal-produto .quantidade-produto .value").innerText = produtoQuantidade;
            document.querySelector("#modal-produto .doador-produto .value").innerText = produtoDoador;
            document.querySelector("#modal-produto .telefone-produto .value").innerText = produtoTelefone;
            document.querySelector("#modal-produto .endereco-produto .value").innerText = produtoEndereco;

            currentCard = card;
            modalInfoProduto.style.display = "block";
        }
    }

    let cards = document.querySelectorAll(".catalogo .card");
    cards.forEach(setupCardClickListener);
});