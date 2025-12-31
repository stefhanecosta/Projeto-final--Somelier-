const { body } = require('express-validator');

//Validação de CADASTRO
exports.validarCadastro = [
  body('nome')
    .trim()
    .notEmpty().withMessage('Nome é obrigatório')
    .isLength({ min: 3 }).withMessage('Nome deve ter no mínimo 3 caracteres'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email é obrigatório')
    .isEmail().withMessage('Email inválido')
    .normalizeEmail(),

  body('senha')
    .notEmpty().withMessage('Senha é obrigatória')
    .isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres'),

  body('confirmarSenha')
    .notEmpty().withMessage('Confirmação de senha é obrigatória')
    .custom((value, { req }) => {
      if (value !== req.body.senha) {
        throw new Error('As senhas não coincidem');
      }
      return true;
    }),
];

//Validação de LOGIN
exports.validarLogin = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email é obrigatório')
    .isEmail().withMessage('Email inválido')
    .normalizeEmail(),

  body('senha')
    .notEmpty().withMessage('Senha é obrigatória'),
];
