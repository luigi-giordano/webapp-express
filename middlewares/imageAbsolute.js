const setImagePath = (req, res, next) => {
  console.log('passato per setImagePath')
  req.imagePath = `${req.protocol}://${req.get('host')}/img/movies_cover`;
  next()
}

module.exports = setImagePath