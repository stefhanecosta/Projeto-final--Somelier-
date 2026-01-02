const API_URL = 'https://projeto-final-somelier.onrender.com/api';

const params = new URLSearchParams(window.location.search);
const slug = params.get('e');

let evento = null;
let socket = null;

document.addEventListener('DOMContentLoaded', () => {
  if (!slug) {
    alert('Evento inválido');
    return;
  }

  // Inicializa socket APÓS o DOM carregar
  socket = io('https://projeto-final-somelier.onrender.com', {
    transports: ['websocket'],
  });

  socket.on('connect', () => {
    console.log('🟢 Socket conectado:', socket.id);
  });

  socket.on('disconnect', () => {
    console.log('🔴 Socket desconectado');
  });

  socket.on('connect_error', err => {
    console.error('❌ Erro no socket:', err.message);
  });

  socket.on('rankingAtualizado', data => {
    if (evento && data.eventoId === evento.id) {
      carregarRanking();
    }
  });

  carregarEvento();

  document
    .getElementById('btn-copiar-link')
    .addEventListener('click', copiarLink);
});

async function carregarEvento() {
  try {
    const res = await fetch(`${API_URL}/votacao/${slug}`);

    if (!res.ok) throw new Error('Evento não encontrado');

    evento = await res.json();

    document.getElementById('info-evento').innerHTML = `
      <div class="info-evento-card">
        <h2>${evento.nome}</h2>
        <p>${evento.descricao || ''}</p>
        <p><strong>Status:</strong> Publicado</p>
      </div>
    `;

    document.getElementById('link-publico').value =
      `${window.location.origin}/acessoPublico?e=${evento.slug}`;

    carregarRanking();
  } catch (e) {
    alert('Evento não encontrado');
    console.error(e);
  }
}

async function carregarRanking() {
  try {
    const res = await fetch(`${API_URL}/votacao/resultado/${evento.id}`);
    const ranking = await res.json();

    const div = document.getElementById('resultado-votacao');
    div.innerHTML = '<h3>📊 Ranking (Top 10)</h3>';

    if (!ranking.length) {
      div.innerHTML += '<p>Sem votos ainda</p>';
      return;
    }

    ranking.slice(0, 10).forEach((item, index) => {
      div.innerHTML += `
        <div class="ranking-item ${index === 0 ? 'vencedor' : ''}">
          ${index + 1}º
          ${item.musica.nome} — ${item.total} votos
        </div>
      `;
    });
  } catch (err) {
    console.error('Erro ao carregar ranking:', err);
  }
}

function copiarLink() {
  const input = document.getElementById('link-publico');
  input.select();
  document.execCommand('copy');
  alert('Link copiado!');
}
