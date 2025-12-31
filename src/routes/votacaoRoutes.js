const express = require('express');
const router = express.Router();
const votacaoController = require('../controllers/votacaoController');

router.get('/:slug', votacaoController.buscarEventoPublico);
router.post('/', votacaoController.votar);
router.get('/resultado/:eventoId', votacaoController.resultado);

module.exports = router;
