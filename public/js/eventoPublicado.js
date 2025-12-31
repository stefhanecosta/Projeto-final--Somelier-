const params = new URLSearchParams(window.location.search);
const slug = params.get('e');
const socket = io();

let evento = null;

document.addEventListener('DOMContentLoaded', () => {
  if (!slug) return;

  carregarEvento();

  document
    .getElementById('btn-copiar-link')
    .addEventListener('click', copiarLink);
});

async function carregarEvento() {
  try {
    const res = await fetch(`/api/votacao/${slug}`);
    evento = await res.json();

    document.getElementById('info-evento').innerHTML = `
      <div class="info-evento-card">
        <h2>${evento.nome}</h2>
        <p>${evento.descricao || ''}</p>
        <p><strong>Status:</strong> Publicado</p>
      </div>
    `;

    document.getElementById('link-publico').value =
      `${window.location.origin}/acessoPublico.html?e=${evento.slug}`;

    carregarRanking();

  } catch (e) {
    alert('Evento não encontrado');
  }
}

async function carregarRanking() {
  const res = await fetch(`/api/votacao/resultado/${evento.id}`);
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
}

// Ranking em tempo real
socket.on('rankingAtualizado', data => {
  if (evento && data.eventoId === evento.id) {
    carregarRanking();
  }
});

function copiarLink() {
  const input = document.getElementById('link-publico');
  input.select();
  document.execCommand('copy');
  alert('Link copiado!');
}
