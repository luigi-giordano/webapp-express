const express = require('express')
const router = express.Router()
const upload = require('../middlewares/multer')

//import controller
const movieController = require('../controllers/movieController')

//rotte crud
//index
router.get('/', movieController.index)

//show
router.get('/:id', movieController.show)

//storeReviews
router.post('/:id/reviews', movieController.storeReviews)

//store
router.post('/', upload.single('image'), movieController.store)

//delete
router.delete('/:id', movieController.destroy)


module.exports = router