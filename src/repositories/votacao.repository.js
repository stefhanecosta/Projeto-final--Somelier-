const Votacao = require('../models/votacao');

module.exports = {
  votar(data) {
    return Votacao.create(data);
  },

  votosDoUsuario(evento_id, user_id) {
    return Votacao.findOne({ where: { evento_id, user_id } });
  }
};
