const { DataTypes } = require('sequelize');
const sequelize = require('../database/postgres');

const Evento = sequelize.define('Evento',{
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    nome: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    descricao: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },

    duracao: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    slug: {
      type: DataTypes.STRING(255),
      unique: true,
    },

    publicado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: 'eventos',
    timestamps: true,
    createdAt: 'criado_em',
    updatedAt: false,
  }
);

module.exports = Evento;
