document.addEventListener("DOMContentLoaded", function() {
    var modal = document.getElementById("modal");
    var btn = document.querySelector(".card-add");
    var span = document.getElementsByClassName("close")[0];
    var form = document.getElementById("addProductForm");

    btn.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    form.onsubmit = function(event) {
        event.preventDefault();
        const fileInput = document.getElementById("productImage");
        const description = document.getElementById("productDescription").value;
        const catalog = document.querySelector(".catalogo");
        const reader = new FileReader();

        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            reader.onload = function(e) {
                const card = document.createElement("div");
                card.className = "card";
                card.innerHTML = `<img src="${e.target.result}" alt=""><h2>${description}</h2>`;
                catalog.appendChild(card);
                modal.style.display = "none";
            };
            reader.readAsDataURL(file);
        } else {
            alert("Por favor, selecione uma imagem.");
        }
    }
});