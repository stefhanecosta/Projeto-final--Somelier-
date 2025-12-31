const { Musica } = require('../models');

module.exports = {

  async listarMusicas(req, res) {
    try {
      const usuarioId = req.usuario.id;

      const musicas = await Musica.findAll({
        where: {
          user_id: usuarioId,
        },
        order: [['criado_em', 'DESC']],
      });

      return res.json(musicas);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: 'Erro ao buscar músicas' });
    }
  },

  
  async adicionarMusica(req, res) {
    try {
      const { nome, artista, genero, duracao } = req.body;
      const usuarioId = req.usuario.id;

      if (!nome || !artista || !genero) {
        return res.status(400).json({
          erro: 'Campos obrigatórios: nome, artista e genero',
        });
      }

      const musica = await Musica.create({
        nome,
        artista,
        genero,
        duracao,
        user_id: usuarioId,
      });

      return res.status(201).json(musica);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: 'Erro ao adicionar música' });
    }
  },

  async deletarMusica(req, res) {
    try {
      const { id } = req.params;
      const usuarioId = req.usuario.id;

      const musica = await Musica.findOne({
        where: {
          id,
          user_id: usuarioId,
        },
      });

      if (!musica) {
        return res.status(404).json({
          erro: 'Música não encontrada ou não pertence ao usuário',
        });
      }

      await musica.destroy();

      return res.json({ mensagem: 'Música deletada com sucesso' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: 'Erro ao deletar música' });
    }
  },
};
