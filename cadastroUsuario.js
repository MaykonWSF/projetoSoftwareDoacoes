const { verificarUsuarioUnico, inserirUsuario } = require('./dao/usuarioDAO');
const bcrypt = require('bcrypt');

const cadastrarUsuario = (req, res) => {
    const { nome, email, confirmacaoEmail, senha, confirmacaoSenha, telefone, endereco, perfilUsuario, nomeOrganizacao } = req.body;

    console.log('Dados recebidos:', req.body); // Log dos dados recebidos

    // Validação básica dos dados recebidos
    if (!nome || !email || !confirmacaoEmail || !senha || !confirmacaoSenha || !telefone || !endereco || !perfilUsuario) {
        console.log('Erro: Todos os campos obrigatórios devem ser preenchidos'); // Log do erro
        return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos' });
    }

    // Verificação básica de email
    if (email !== confirmacaoEmail) {
        console.log('Erro: Os emails não coincidem'); // Log do erro
        return res.status(400).json({ error: 'Os emails não coincidem' });
    }

    //Verificação básica de senha
    if (senha !== confirmacaoSenha) {
        console.log('Erro: As senhas não coincidem'); // Log do erro
        return res.status(400).json({ error: 'As senhas não coincidem' });
    }

    //Encriptação da senha usando bcrypt
    const saltRounds = 10;
    const senhaEncriptada = bcrypt.hashSync(senha, saltRounds);

    // Verificação se email e telefone são únicos (já existem no banco)
    verificarUsuarioUnico(email, telefone, (err, results) => {
        if (err) {
            console.log('Erro ao verificar se email ou telefone são únicos:', err); // Log do erro
            return res.status(500).json({ error: 'Erro no servidor' });
        }
        if (results.length > 0) {
            console.log('Erro: Email ou telefone já estão em uso'); // Log do erro
            return res.status(400).json({ error: 'Email ou telefone já estão em uso' });
        }

        // Inserção dos dados no banco
        const usuario = { nome, email, senhaEncriptada, telefone, endereco, perfilUsuario, nomeOrganizacao };
        inserirUsuario(usuario, (err, results) => {
            if (err) {
                console.log('Erro ao cadastrar usuário:', err); // Log do erro
                return res.status(500).json({ error: 'Erro ao cadastrar usuário' });
            }
            console.log('Usuário cadastrado com sucesso:', results); // Log do sucesso
            res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
        });
    });
};

module.exports = { cadastrarUsuario };
