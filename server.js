const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 3000


//import middleware
const errorsHandler = require('./middlewares/errorsHandler')
const notFound = require('./middlewares/notFound')
const imageAbsolute = require('./middlewares/imageAbsolute')

//import router
const movieRouter = require('./routes/movies')

//middleware cors
app.use(cors({ origin: 'http://localhost:5173' }))

//middleware parsing body
app.use(express.json())

//middleware assets static
app.use(express.static('public'))

//middleware immagini
app.use(imageAbsolute)

//rotte principale
app.get('/', (req, res) => {
  res.send('Server dei Film')
})

//rotta movies
app.use('/api/movies', movieRouter)

//middleware errore
app.use(errorsHandler)

//middleware nessun risultato
app.use(notFound)

//ascolto porta
app.listen(port, () => {
  console.log(`Sono in ascolto alla porta ${port}`)
})