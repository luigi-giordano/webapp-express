function errorsHandler (err, req, res, next) {
  res.status(500);
  res.json({
    message: err.message,
    status: 500,
    error: 'Errore interno del Server'
  })
}
module.exports = errorsHandler;