document.addEventListener("DOMContentLoaded", function() {
    // Modal de adicionar produto
    let modalProduto = document.querySelectorAll(".modal")[0];
    let btnProduto = document.querySelector(".card-add");
    let spanProduto = modalProduto.querySelector(".close");
    let formProduto = document.getElementById("addProductForm");

    btnProduto.onclick = function() {
        modalProduto.style.display = "block";
    }

    spanProduto.onclick = function() {
        modalProduto.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modalProduto) {
            modalProduto.style.display = "none";
        }
    }

    formProduto.onsubmit = function(event) {
        event.preventDefault();
        const fileInput = document.getElementById("productImage");
        const description = document.getElementById("productDescription").value;
        const quantity = document.getElementById("productQuantity").value;
        const unity = document.getElementById("productUnity").value;
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
                                  <p>Quantidade: ${quantity}</p>
                                  <p>Unidade: ${unity}</p>
                                  <p>Categoria: ${filter}</p>`;
                catalog.appendChild(card);
                modalProduto.style.display = "none";
            };
            reader.readAsDataURL(file);
        } else {
            alert("Por favor, selecione uma imagem.");
        }
    }

    // Modal de atualizar perfil
    let modalPerfil = document.querySelectorAll(".modal")[1];
    let btnPerfil = document.querySelectorAll(".perfil")[0];
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

        // Implementar lógica para salvar as informações atualizadas, ex:
        console.log(`Nome: ${nome}, Telefone: ${telefone}, Endereço: ${endereco}, Organização: ${organizacao}`);
        
        // Fechar o modal após atualização
        modalPerfil.style.display = "none";

        // Mostrar mensagem de sucesso
        successMessage.style.display = "block";

        // Ocultar a mensagem de sucesso após 3 segundos
        setTimeout(function() {
            successMessage.style.display = "none";
        }, 3000);
    }
});