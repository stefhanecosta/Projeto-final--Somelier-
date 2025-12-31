const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const musicasController = require('../controllers/musicasController');

router.use(authMiddleware);

router.get('/', musicasController.listarMusicas);
router.post('/', musicasController.adicionarMusica);
router.delete('/:id', musicasController.deletarMusica);

module.exports = router;