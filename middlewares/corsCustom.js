const corsCustom = (req, res, next) => {
  console.log('Middleware personalizzato in esecuzione!');
  next();
};

module.exports = corsCustom;