const { verificarUsuario } = require('./dao/usuarioDAO');

const loginUsuario = (req, res) => {
  const { email, password } = req.body;

  console.log('Tentativa de login com:', email, password);

  // Verificação de email e senha no banco de dados
  verificarUsuario(email, password, (err, user) => {
    if (err) {
      console.log('Erro ao verificar usuário:', err);
      return res.status(500).json({ error: 'Erro no servidor' });
    }
    if (!user) {const { verificarUsuario } = require('./dao/usuarioDAO');

    const loginUsuario = (req, res) => {
      const { email, password } = req.body;
    
      console.log('Tentativa de login com:', { email, password });
    
      // Verificação de email e senha no banco de dados
      verificarUsuario(email, password, (err, user) => {
        if (err) {
          console.log('Erro ao verificar usuário:', err);
          return res.status(500).json({ error: 'Erro no servidor' });
        }
        if (!user) {
          console.log('Usuário ou senha inválidos');
          return res.status(400).json({ error: 'Usuário ou senha inválidos' });
        }
    
        // Usuário encontrado, retornar perfil do usuário
        console.log('Usuário encontrado:', user);
        res.status(200).json({ perfilUsuario: user.perfilUsuario });
      });
    };
    
    module.exports = { loginUsuario };
    
      console.log('Usuário ou senha inválidos');
      return res.status(400).json({ error: 'Usuário ou senha inválidos' });
    }

    // Usuário encontrado, retornar perfil do usuário
    console.log('Usuário encontrado:', user);
    res.status(200).json({ perfilUsuario: user.perfilUsuario });
  });
};

module.exports = { loginUsuario };
