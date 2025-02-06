const connection = require('../data/db')

const index = (req, res) => {
  const sql = 'SELECT * FROM movies';

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Query al database fallita' })
    const imagePath = 'http://localhost:3000/img/movies'
    console.log(req.imagePath);


    const movies = results.map(movie => {
      return {
        ...movie,
        image: req.imagePath + movie
      }
    })
    res.json(movies);
  })
}

const show = (req, res) => {

  const id = req.params.id
  const sql = 'SELECT * FROM posts WHERE id = ?'

  const sqlReview = 'SELECT * FROM reviews WHERE reviews.movie_id = ?'

  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Query al database fallita' })
    if (results.lenght === 0 || results[0].id === null) return res.status(404).json({ error: 'Post non trovato' })


    connection.query(sqlReview, [id], (err, resultsReviews) => {
      if (err) return res.status(500).json({ error: 'Query al database fallita' })

      const movie = results[0];
      res.json({
        ...movie,
        image: req.imagePath + movie.image,
        reviews: resultsReviews
      });
    })

  })
}

module.exports = {
  index,
  show
}