const connection = require('../data/db')

const index = (req, res) => {
  const sql = 'SELECT * FROM movies';

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Query al database fallita' })
    res.json(results);
  })
}

const show = (req, res) => {

  const id = req.params.id
  res.send(`Dettagli Film con id ${id}`)
}

module.exports = {
  index,
  show
}