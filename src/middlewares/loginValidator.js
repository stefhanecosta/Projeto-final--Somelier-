const { body, validationResult } = require('express-validator');

const loginValidationRules = () => {
  return [
    body('email')
      .notEmpty()
      .withMessage('Email é obrigatório')
      .isEmail()
      .withMessage('Email inválido')
      .normalizeEmail(),
    
    body('senha')
      .notEmpty()
      .withMessage('Senha é obrigatória')
      .isLength({ min: 6 })
      .withMessage('Senha deve ter no mínimo 6 caracteres')
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Erro de validação',
      errors: errors.array().map(error => ({
        campo: error.path,
        mensagem: error.msg
      }))
    });
  }
  
  next();
};

module.exports = {
  loginValidationRules,
  validate
};