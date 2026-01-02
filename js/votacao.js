const API_URL = 'https://projeto-final-somelier.onrender.com/api';

const params = new URLSearchParams(window.location.search);
const slug = params.get('e');
const socket = io('https://projeto-final-somelier.onrender.com');


let evento = null;

document.addEventListener('DOMContentLoaded', () => {
  if (!slug) {
    mostrarErro();
    return;
  }

  carregarEvento(slug);

  const btn = document.getElementById('btn-copiar-link');
  if (btn) btn.addEventListener('click', copiarLink);
});

socket.on('rankingAtualizado', data => {
  if (evento && data.eventoId === evento.id) {
    carregarResultado();
  }
});

async function carregarEvento(slug) {
  try {
    const response = await fetch(`${API_URL}/votacao/${slug}`);
    if (!response.ok) throw new Error();

    evento = await response.json();

    renderizarEvento();
    renderizarVotacao();
    carregarResultado();


  } catch {
    mostrarErro();
  }
}

function renderizarEvento() {
  document.getElementById('info-evento').innerHTML = `
    <div class="info-evento-card">
      <h2>${evento.nome}</h2>
      <p>${evento.descricao || ''}</p>
    </div>
  `;
}


function renderizarVotacao() {
  if (!evento.musicas || evento.musicas.length < 2) {
    document.getElementById('interface-votacao').innerHTML =
      '<p> Este evento não possui músicas suficientes.</p>';
    return;
  }

  const musicas = embaralhar([...evento.musicas]).slice(0, 2);

  document.getElementById('interface-votacao').innerHTML = `
    <h3>🎵 Qual música você prefere?</h3>
    <div class="opcoes-votacao">
      ${musicas.map(m => `
        <div class="opcao-musica" onclick="votar(${m.id})">
          <div class="card-musica">
            <h4>${m.nome}</h4>
            <p>${m.artista}</p>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

async function votar(musicaId) {
  try {
    const response = await fetch(`${API_URL}/votacao`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventoId: evento.id,
        musicaId
      })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.erro || 'Erro ao votar');
      return;
    }

    document.getElementById('interface-votacao').style.display = 'none';
    document.getElementById('ja-votou').style.display = 'block';

    carregarResultado();

  } catch {
    alert('Erro ao votar');
  }
}

async function carregarResultado() {
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

  } catch (error) {
    console.error('Erro ao carregar ranking:', error);
  }
}

function copiarLink() {
  const link = `${window.location.origin}/acessoPublico?e=${evento.slug}`;

  navigator.clipboard.writeText(link);

  const btn = document.getElementById('btn-copiar-link');
  btn.innerText = 'Link copiado!';
  setTimeout(() => {
    btn.innerText = '🔗 Copiar link da votação';
  }, 2000);
}

function embaralhar(array) {
  return array.sort(() => Math.random() - 0.5);
}

function mostrarErro() {
  document.getElementById('votacao-especifica').style.display = 'none';
  document.getElementById('erro-evento').style.display = 'block';
}
