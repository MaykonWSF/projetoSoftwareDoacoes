const connection = require('../connection');

const verificarUsuarioUnico = (email, telefone, callback) => {
  const query = 'SELECT * FROM Usuarios WHERE email = ? OR telefone = ?';
  connection.query(query, [email, telefone], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, results);
  });
};

const inserirUsuario = (usuario, callback) => {
  const query = `
    INSERT INTO Usuarios (nome, email, senha, telefone, endereco, perfilUsuario, nomeOrganizacao, dataCadastro)
    VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
  `;
  const { nome, email, senha, telefone, endereco, perfilUsuario, nomeOrganizacao } = usuario;
  connection.query(
    query,
    [nome, email, senha, telefone, endereco, perfilUsuario, nomeOrganizacao],
    (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    }
  );
};

const verificarUsuario = (email, senha, callback) => {
  const query = 'SELECT * FROM Usuarios WHERE email = ? AND senha = ?';
  connection.query(query, [email, senha], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    if (results.length > 0) {
      callback(null, results[0]);
    } else {
      callback(null, null);
    }
  });
};

module.exports = {
  verificarUsuarioUnico,
  inserirUsuario,
  verificarUsuario
};
