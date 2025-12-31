const { Evento, Musica, EventoMusica } = require('../models');

module.exports = {
  // LISTA EVENTOS DO USUÁRIO (COM REPERTÓRIO)
  async listarEventos(req, res) {
    try {
      const usuarioId = req.usuario.id;

      const eventos = await Evento.findAll({
        where: { user_id: usuarioId },

        include: [
          {
            model: Musica,
            as: 'musicas',
            through: {
              attributes: ['ordem'],
            },
          },
        ],

        order: [
          ['criado_em', 'DESC'],
          [
            { model: Musica, as: 'musicas' },
            { model: EventoMusica },
            'ordem',
            'ASC',
          ],
        ],
      });

      return res.json(eventos);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        erro: 'Erro ao listar eventos musicais',
      });
    }
  },

  // CRIA / ATUALIZA REPERTÓRIO DO EVENTO
  async criarEventoMusica(req, res) {
    try {
      const usuarioId = req.usuario.id;
      const { evento_id, musicas } = req.body;

      if (!evento_id || !Array.isArray(musicas) || musicas.length === 0) {
        return res.status(400).json({
          erro: 'Evento e músicas são obrigatórios',
        });
      }

      const evento = await Evento.findOne({
        where: { id: evento_id, user_id: usuarioId },
      });

      if (!evento) {
        return res.status(404).json({
          erro: 'Evento não encontrado ou não pertence ao usuário',
        });
      }

      await EventoMusica.destroy({
        where: { evento_id },
      });

      const registros = musicas.map((m, index) => ({
        evento_id,
        musica_id: m.musica_id,
        ordem: m.ordem ?? index + 1,
      }));

      await EventoMusica.bulkCreate(registros);

      return res.status(201).json({
        mensagem: 'Repertório salvo com sucesso',
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        erro: 'Erro ao salvar repertório',
      });
    }
  },

  async excluirEvento(req, res) {
    try {
      const usuarioId = req.usuario.id;
      const { id } = req.params;

      const evento = await Evento.findOne({
        where: { id, user_id: usuarioId },
      });

      if (!evento) {
        return res.status(404).json({
          erro: 'Evento não encontrado',
        });
      }

      await EventoMusica.destroy({
        where: { evento_id: id },
      });

      return res.json({
        mensagem: 'Repertório removido com sucesso',
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        erro: 'Erro ao excluir repertório',
      });
    }
  },
};
