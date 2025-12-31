const { validationResult } = require('express-validator');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, senha } = req.body;

    const usuario = await User.findOne({ where: { email } });
    if (!usuario) {
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }

    const senhaValida = await usuario.compararSenha(senha);
    if (!senhaValida) {
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }

    const token = jwt.sign(
      { 
        id: usuario.id,
        email: usuario.email 
      },
      process.env.JWT_SECRET || 'chave_padrao_temporaria',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login realizado com sucesso',
      token: token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      }
    });

  } catch (error) {
    console.error('Erro no login:', error);
    console.error('JWT_SECRET configurado?', !!process.env.JWT_SECRET);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};