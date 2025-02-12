const multer = require('multer')

//upload immagine
const storage = multer.diskStorage({
  destination: "./public/img/movies_cover",
  filename: (req, file, cb) => {

    //nome univoco per il file
    const uniqueName = `${Date.now()}-${file.originalname}`
    cb(null, uniqueName)
  }
})

const upload = multer({ storage })

module.exports = upload