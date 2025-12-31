const { DataTypes } = require('sequelize');
const sequelize = require('../database/postgres');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    senha: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    timestamps: true, 
    hooks: {
      beforeCreate: async (user) => {
        if (user.senha) {
          const salt = await bcrypt.genSalt(10);
          user.senha = await bcrypt.hash(user.senha, salt);
        }
      },
    },
  });

// Método para comparar senhas
User.prototype.compararSenha = async function(senhaInformada) {
  return await bcrypt.compare(senhaInformada, this.senha);
};

module.exports = User;