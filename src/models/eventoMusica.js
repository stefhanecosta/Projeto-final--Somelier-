const { DataTypes } = require('sequelize');
const sequelize = require('../database/postgres');

const EventoMusica = sequelize.define('EventoMusica', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    evento_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    musica_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    ordem: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    tableName: 'evento_musicas',
    timestamps: false,
    indexes: [
      {
        fields: ['evento_id'],
      },
      {
        fields: ['musica_id'],
      },
    ],
  });

module.exports = EventoMusica;
