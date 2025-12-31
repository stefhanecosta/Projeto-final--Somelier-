const { DataTypes } = require('sequelize');
const sequelize = require('../database/postgres');

const Musica = sequelize.define('Musica', {
  id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
  },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false,
  },
    artista: {
      type: DataTypes.STRING(255),
      allowNull: false,
  },
    genero: {
      type: DataTypes.STRING(100),
      allowNull: false,
  },
    duracao: {
      type: DataTypes.STRING(20),
      allowNull: true,
  },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
  },
},
{
  tableName: 'musicas',
  timestamps: true,
  createdAt: 'criado_em',
  updatedAt: false,
});

module.exports = Musica;
