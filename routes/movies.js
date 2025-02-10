const express = require('express')
const router = express.Router()

//import controller
const movieController = require('../controllers/movieController')

//rotte crud
//index
router.get('/', movieController.index)

//show
router.get('/:id', movieController.show)

//store
router.post('/:id/reviews', movieController.store)


module.exports = router