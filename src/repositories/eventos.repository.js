const Evento = require('../models/Evento');

module.exports = {
  listar() {
    return Evento.findAll();
  },

  detalhes(id) {
    return Evento.findByPk(id);
  }
};
