const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middlewares globais
app.use(cors({
  origin: [
    'http://localhost:5500',
    'http://127.0.0.1:5500',
    'https://projeto-final-somelier.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas da API
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const eventoRoutes = require('./routes/eventoRoutes'); 
const musicasRoutes = require('./routes/musicasRoutes');
const eventoMusicaRoutes = require('./routes/eventoMusicaRoutes');
const votacaoRoutes = require('./routes/votacaoRoutes');

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/eventos', eventoRoutes);   
app.use('/api/musicas', musicasRoutes);
app.use('/api/eventoMusica', eventoMusicaRoutes);
app.use('/api/votacao', votacaoRoutes);

app.use(express.static(path.join(__dirname, '..', 'public')));

// Rota teste da API
app.get('/api', (req, res) => {
  res.json({ message: 'API Sommelier rodando!' });
});


module.exports = app;
