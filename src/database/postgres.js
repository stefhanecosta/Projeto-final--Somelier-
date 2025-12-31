const { Sequelize } = require('sequelize');
require('dotenv').config();

const dbConfig = {
  name: String(process.env.DB_NAME || 'somelier'),
  user: String(process.env.DB_USER || 'somelier'),
  pass: String(process.env.DB_PASS || '1234567'),
  host: String(process.env.DB_HOST || 'localhost'),
  port: parseInt(process.env.DB_PORT || '5432', 10),
};

console.log('=== Configuração do Banco ===');
console.log('Database:', dbConfig.name);
console.log('User:', dbConfig.user);
console.log('Password:', dbConfig.pass);
console.log('Host:', dbConfig.host);
console.log('Port:', dbConfig.port);
console.log('=============================');

const sequelize = new Sequelize(
  dbConfig.name,
  dbConfig.user,
  dbConfig.pass,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: 'postgres',
    logging: false,
  }
);

module.exports = sequelize;