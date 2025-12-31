require('dotenv').config();


require('./models/index');
const app = require('./app');
const sequelize = require('./database/postgres');

const http = require('http');

const { Server } = require('socket.io');
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      'http://localhost:5500',
      'http://127.0.0.1:5500',
      'https://projeto-final-somelier.vercel.app'
    ],
    methods: ['GET', 'POST']
  }
});

// DISPONIBILIZA O IO PARA OS CONTROLLERS
app.set('io', io);

io.on('connection', socket => {
  console.log(' Cliente conectado:', socket.id);
});

// BANCO
sequelize.sync()
  .then(() => {
    console.log('Banco PostgreSQL sincronizado');
  })
  .catch(err => {
    console.error('Erro no banco:', err);
  });

// INICIA SERVIDOR
server.listen(PORT, () => {
  console.log(` Servidor rodando em http://localhost:${PORT}`);
});
