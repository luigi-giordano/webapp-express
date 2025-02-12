const connection = require('../data/db')

const index = (req, res) => {
  const sql = 'SELECT * FROM movies';

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Query al database fallita' })

    const movies = results.map(movie => {
      const imagePath = req.imagePath + movie.image;
      // console.log(imagePath);
      return {
        ...movie,
        image: imagePath
      };
    });

    res.json(movies);
  })
}

const show = (req, res) => {

  const id = req.params.id
  const sql = 'SELECT * FROM movies WHERE id = ?'

  const sqlReview = 'SELECT * FROM reviews WHERE reviews.movie_id = ?'

  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Query al database film fallita' })
    if (results.length === 0 || results[0].id === null) return res.status(404).json({ error: 'Post non trovato' })


    connection.query(sqlReview, [id], (err, resultsReviews) => {
      if (err) return res.status(500).json({ error: 'Query al database recensioni fallita' })

      const movie = results[0];
      res.json({
        ...movie,
        image: req.imagePath + movie.image,
        reviews: resultsReviews
      });
    })

  })
}

const storeReviews = (req, res) => {
  const id = req.params.id
  const { name, vote, text } = req.body
  const sql = 'INSERT INTO reviews(name, vote, text, movie_id) VALUES (?, ?, ?, ?)'

  connection.query(sql, [name, vote, text, id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Query al database film fallita' })
    res.status(201)

    res.json({ message: 'Recensione Aggiunta', id: results.insertId })
  })
}

const store = (req, res) => {
  // console.log(req.file);
  const { title, director, abstract } = req.body
  const imageName = req.file.filename

  const sql = 'INSERT INTO movies (title, director, abstract, image) VALUES(?, ?, ?, ?)'
  connection.query(
    sql,
    [title, director, abstract, imageName],
    (err, results) => {
      // console.log(err);

      if (err) return res.status(500).json({ error: 'Query al database film fallita' })
      res.status(201).json({ status: 'success', message: 'Film aggiunto con successo' })
    }
  )
}

const destroy = (req, res) => {
  const id = req.params.id
  const sqlDelete = 'DELETE FROM movies WHERE id = ?'

  connection.query(sqlDelete, [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Query al database film fallita' })
    res.json({ message: 'Film eliminato con successo' })
  })
}

module.exports = {
  index,
  show,
  storeReviews,
  store,
  destroy
}