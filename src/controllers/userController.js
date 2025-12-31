const { validationResult } = require('express-validator');
const User = require('../models/User');

//CADASTRO DE USUÁRIO
exports.cadastrar = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nome, email, senha } = req.body;
    const usuarioExistente = await User.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({
        message: 'Este email já está cadastrado',
      });
    }

    const novoUsuario = await User.create({
      nome,
      email,
      senha,
    });

    return res.status(201).json({
      message: 'Usuário cadastrado com sucesso!',
      usuario: {
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
      },
    });

  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    return res.status(500).json({
      message: 'Erro ao cadastrar usuário',
    });
  }
};

//PERFIL DO USUÁRIO (PROTEGIDO)
exports.perfil = async (req, res) => {
  try {
    const usuario = await User.findByPk(req.userId, {
      attributes: ['id', 'nome', 'email', 'createdAt'],
    });

    if (!usuario) {
      return res.status(404).json({
        message: 'Usuário não encontrado',
      });
    }

    return res.status(200).json(usuario);

  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    return res.status(500).json({
      message: 'Erro ao buscar perfil do usuário',
    });
  }
};
