document.addEventListener('DOMContentLoaded', function () {
    const botaoReceptor = document.getElementById('botao-receptor');
    const botaoEmpresa = document.getElementById('botao-empresa');

    if (botaoReceptor && botaoEmpresa) {
        botaoReceptor.addEventListener('click', function () {
            mudarLabel('Nome da ONG');
            selecionarBotao('botao-receptor');
        });

        botaoEmpresa.addEventListener('click', function () {
            mudarLabel('Nome da Empresa');
            selecionarBotao('botao-empresa');
        });
    } else {
        console.error("Botões não foram encontrados, verifique os IDs");
    }
});

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