const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const { validarCadastro } = require('../middlewares/validations');

router.post('/cadastro', validarCadastro, userController.cadastrar);
router.get('/perfil', authMiddleware, userController.perfil);

module.exports = router;