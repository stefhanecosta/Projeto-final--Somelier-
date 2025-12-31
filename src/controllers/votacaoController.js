const { Evento, Musica, EventoMusica, Votacao } = require('../models');
const { Sequelize } = require('sequelize');

module.exports = {
  async buscarEventoPublico(req, res) {
    try {
      const { slug } = req.params;

      const evento = await Evento.findOne({
        where: {
          slug,
          publicado: true
        },
        include: [
          {
            model: Musica,
            as: 'musicas',
            through: { attributes: ['ordem'] }
          }
        ],
        order: [
          [{ model: Musica, as: 'musicas' }, EventoMusica, 'ordem', 'ASC']
        ]
      });

      if (!evento) {
        return res.status(404).json({ erro: 'Evento não encontrado' });
      }

      res.json(evento);

    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao buscar evento público' });
    }
  },

  async votar(req, res) {
    try {
      const { eventoId, musicaId } = req.body;

      const identificador =
        req.headers['x-forwarded-for'] ||
        req.socket.remoteAddress;

      const jaVotou = await Votacao.findOne({
        where: {
          evento_id: eventoId,
          identificador
        }
      });

      if (jaVotou) {
        return res.status(400).json({ erro: 'Você já votou neste evento' });
      }

      await Votacao.create({
        evento_id: eventoId,
        musica_id: musicaId,
        identificador
      });

    // ATUALIZAÇÃO EM TEMPO REAL
    const io = req.app.get('io');
    io.emit('rankingAtualizado', { eventoId });

      res.json({ mensagem: 'Voto computado com sucesso' });

    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao votar' });
    }
  },

  //RESULTADO / RANKING
  async resultado(req, res) {
    try {
      const { eventoId } = req.params;

      const resultado = await Votacao.findAll({
        where: { evento_id: eventoId },
        attributes: [
          'musica_id',
          [Sequelize.fn('COUNT', Sequelize.col('musica_id')), 'total']
        ],
        include: [
          {
            model: Musica,
            as: 'musica',
            attributes: ['id', 'nome', 'artista']
          }
        ],
        group: ['musica_id', 'musica.id'],
        order: [[Sequelize.literal('total'), 'DESC']]
      });

      res.json(resultado);

    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao buscar resultado' });
    }
  }
};
