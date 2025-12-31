const { Evento } = require('../models');

module.exports = {
  async listarEventos(req, res) {
    try {
      const usuarioId = req.usuario.id;

      const eventos = await Evento.findAll({
        where: { user_id: usuarioId },
        order: [['criado_em', 'DESC']],
      });

      res.json(eventos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao listar eventos' });
    }
  },

  async adicionarEvento(req, res) {
    try {
      const { nome, descricao, duracao } = req.body;
      const usuarioId = req.usuario.id;

      const evento = await Evento.create({
        nome,
        descricao,
        duracao,
        user_id: usuarioId,
      });

      res.status(201).json(evento);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao criar evento' });
    }
  },

  async deletarEvento(req, res) {
    try {
      const { id } = req.params;
      const usuarioId = req.usuario.id;

      const evento = await Evento.findOne({
        where: { id, user_id: usuarioId },
      });

      if (!evento) {
        return res.status(404).json({ erro: 'Evento não encontrado' });
      }

      await evento.destroy();
      res.json({ mensagem: 'Evento excluído' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao excluir evento' });
    }
  },
  
  async publicarEvento(req, res) {
  try {
    const { id } = req.params;
    const usuarioId = req.usuario.id;

    const evento = await Evento.findOne({
      where: { id, user_id: usuarioId },
    });

    if (!evento) {
      return res.status(404).json({ erro: 'Evento não encontrado' });
    }
    if (evento.publicado && evento.slug) {
      return res.json({
        id: evento.id,
        slug: evento.slug,
        publicado: true,
      });
    }

    // SLUG ÚNICO E DEFINITIVO
    const nomeSlug = evento.nome
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w]+/g, '-')
      .replace(/^-+|-+$/g, '');

    evento.slug = `${nomeSlug}-${evento.id}`;
    evento.publicado = true;

    await evento.save();

    res.json({
      id: evento.id,
      nome: evento.nome,
      slug: evento.slug,
      publicado: evento.publicado,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao publicar evento' });
  }
}

};
