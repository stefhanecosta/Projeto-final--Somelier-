const express = require('express');
const eventoMusicaController = require('../controllers/eventoMusicaController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/', eventoMusicaController.listarEventos);
router.post('/', eventoMusicaController.criarEventoMusica);
router.delete('/:id', eventoMusicaController.excluirEvento);



module.exports = router;
