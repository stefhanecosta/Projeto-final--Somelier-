const sequelize = require('../database/postgres');

const User = require('./User');
const Evento = require('./Evento');
const Musica = require('./Musica');
const EventoMusica = require('./eventoMusica');
const Votacao = require('./votacao'); 


User.hasMany(Evento, {
  foreignKey: 'user_id',
  as: 'eventos',
});

Evento.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'usuario',
});


User.hasMany(Musica, {
  foreignKey: 'user_id',
  as: 'musicas',
});

Musica.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'usuario',
});


Evento.belongsToMany(Musica, {
  through: EventoMusica,
  foreignKey: 'evento_id',
  otherKey: 'musica_id',
  as: 'musicas',
});

Musica.belongsToMany(Evento, {
  through: EventoMusica,
  foreignKey: 'musica_id',
  otherKey: 'evento_id',
  as: 'eventos',
});


Evento.hasMany(EventoMusica, {
  foreignKey: 'evento_id',
  as: 'eventoMusicas',
});

EventoMusica.belongsTo(Evento, {
  foreignKey: 'evento_id',
  as: 'evento',
});

Musica.hasMany(EventoMusica, {
  foreignKey: 'musica_id',
  as: 'eventoMusicas',
});

EventoMusica.belongsTo(Musica, {
  foreignKey: 'musica_id',
  as: 'musica',
});


Evento.hasMany(Votacao, {
  foreignKey: 'evento_id',
  as: 'votos',
});

Votacao.belongsTo(Evento, {
  foreignKey: 'evento_id',
  as: 'evento',
});

Musica.hasMany(Votacao, {
  foreignKey: 'musica_id',
  as: 'votos',
});

Votacao.belongsTo(Musica, {
  foreignKey: 'musica_id',
  as: 'musica',
});

module.exports = {
  sequelize,
  User,
  Evento,
  Musica,
  EventoMusica,
  Votacao,
};
