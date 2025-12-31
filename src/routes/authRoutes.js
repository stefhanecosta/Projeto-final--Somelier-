const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validarLogin } = require('../middlewares/validations');


router.post('/login', validarLogin, authController.login);

module.exports = router;
