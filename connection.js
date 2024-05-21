const mysql = require('mysql2');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root', // Change this to your MySQL username
    password: 'root', // 
    database: 'projetoPIBITI',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = connection;