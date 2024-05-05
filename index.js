const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get('/cadastro', (req, res) => {
    res.sendFile(__dirname + '/cadastro.html');
});

app.get('/mainDoador', (req, res) => {
    res.sendFile(__dirname + '/mainDoador.html');
});

app.get('/mainReceptor', (req, res) => {
    res.sendFile(__dirname + '/mainReceptor.html');
});

app.listen(3000, () => {
    console.log('Executando na porta 3000!!')
});