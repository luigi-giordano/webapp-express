function notFound(req, res, next) {
  res.status(404);
  res.json({
    message: 'Risorsa del Server non disponibile',
    status: 404,
    error: 'Not found'
  })
}
module.exports = notFound;