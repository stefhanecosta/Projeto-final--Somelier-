const { DataTypes } = require('sequelize');
const sequelize = require('../database/postgres');

const Votacao = sequelize.define('Votacao', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    evento_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    musica_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    identificador: {
      type: DataTypes.STRING,
      allowNull: false
    },
    criado_em: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, 
  {
    tableName: 'votos',
    timestamps: false
  });

module.exports = Votacao;
