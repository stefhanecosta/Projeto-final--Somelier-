module.exports = (err, req, res, next) => {
  console.error('Erro:', err.message);
  res.status(400).json({ erro: err.message });
};
