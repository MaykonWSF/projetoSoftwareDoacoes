const express = require('express');
const app = express();
const { cadastrarUsuario } = require('./cadastroUsuario.js'); // Importando a função de cadastro
const { loginUsuario } = require('./login.js');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

app.get('/cadastro', (req, res) => {
  res.sendFile(__dirname + '/cadastro.html');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

app.get('/mainDoador', (req, res) => {
  res.sendFile(__dirname + '/mainDoador.html');
});

app.get('/mainReceptor', (req, res) => {
  res.sendFile(__dirname + '/mainReceptor.html');
});

// Endpoint para cadastro de usuários
app.post('/api/cadastro', cadastrarUsuario);

// Endpoint para login de usuários
app.post('/api/login', loginUsuario);

app.listen(3000, () => {
    console.log('Executando na porta 3000!!');
});