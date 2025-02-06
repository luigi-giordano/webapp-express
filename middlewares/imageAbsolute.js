const setImagePath = (req, res, next) => {
  req.imagepath = `${req.protocol}://${req.get('host')}/img/movies_cover`
  next()
}

module.exports = setImagePath