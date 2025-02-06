const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'movies'
})

connection.connect((err) => {
  if (err) throw err
  console.log('Connessione al Database riuscita');
})

module.exports = connection