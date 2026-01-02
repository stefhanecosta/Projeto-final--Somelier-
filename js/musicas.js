const API_URL = 'https://projeto-final-somelier.onrender.com/api';

function getToken() {
  const token = localStorage.getItem('token');
  return token;
}

document.addEventListener('DOMContentLoaded', () => {
  const btnPerfil = document.getElementById('btnPerfil');
  const dropdownMenu = document.getElementById('dropdownMenu');

  if (!btnPerfil || !dropdownMenu) {
    console.error('Dropdown: elementos não encontrados');
    return;
  }

  btnPerfil.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle('ativo');
  });

  dropdownMenu.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  document.addEventListener('click', () => {
    dropdownMenu.classList.remove('ativo');
  });

// Carrega eventos e músicas ao iniciar
  carregarEventos();
  carregarMusicas();
});

function verPerfil(event) {
  event.preventDefault();
  alert('Visualizar perfil (implementar rota)');
}

function editarPerfil(event) {
  event.preventDefault();
  alert('Editar perfil (implementar rota)');
}

function verEventos(event) {
  event.preventDefault();
  alert('Meus eventos (implementar rota)');
}

function sair(event) {
  event.preventDefault();
  localStorage.removeItem('token');
  alert('Logout realizado com sucesso!');
  window.location.href = 'login.html';
}

// VARIÁVEIS GLOBAIS
const formEvento = document.getElementById('formEvento');
const formMusica = document.getElementById('formMusica');
const contadorEventos = document.querySelector('.contador-eventos');
const contadorMusicas = document.querySelector('.contador-musicas');
const btnCriarEvento = document.getElementById('btnCriarEvento');
const busca = document.getElementById('busca');

let eventos = [];
let musicas = [];
let eventoSelecionado = null;

// EVENTOS - CARREGAR, ADICIONAR, DELETAR 
async function carregarEventos() {
  const token = getToken();
  if (!token) {
    console.log('Token não encontrado');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/eventos`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      eventos = await response.json();
      atualizarContadorEventos();
      renderizarEventos();
      console.log('Eventos carregados:', eventos);
    } else {
      console.error('Erro ao carregar eventos:', response.status);
    }
  } catch (error) {
    console.error('Erro ao carregar eventos:', error);
  }
}

function atualizarContadorEventos() {
  contadorEventos.textContent = `${eventos.length} evento${eventos.length !== 1 ? 's' : ''}`;
}

function renderizarEventos() {
  const listaEventos = document.querySelectorAll('.lista-musicas')[0];
  listaEventos.innerHTML = '';

  if (eventos.length === 0) {
    listaEventos.innerHTML = `
      <div class="mensagem-vazia">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 18V5l12-2v13"></path>
          <circle cx="6" cy="18" r="3"></circle>
          <circle cx="18" cy="16" r="3"></circle>
        </svg>
        <p>Nenhum evento cadastrado ainda.<br>Crie um evento para começar!</p>
      </div>
    `;
    return;
  }

  eventos.forEach((evento) => {
    const div = document.createElement('div');
    div.classList.add('item-musica');
    if (eventoSelecionado && eventoSelecionado.id === evento.id) {
      div.classList.add('selecionado');
    }

    div.innerHTML = `
      <label style="cursor: pointer;" onclick="selecionarEvento(${evento.id})">
        <input type="checkbox" data-id="${evento.id}" ${eventoSelecionado?.id === evento.id ? 'checked' : ''}>
        <strong>${evento.nome}</strong>
        <span style="color:#888; display:block; font-size:0.9em; margin-top:4px;">${evento.descricao}</span>
        ${evento.duracao ? `<span style="color:#aaa; font-size:0.85em;"> ${evento.duracao}</span>` : ''}
      </label>
      <button class="btn-deletar" onclick="deletarEvento(${evento.id})" title="Deletar evento">
        Excluir
      </button>
    `;

    listaEventos.appendChild(div);
  });
}

formEvento.addEventListener('submit', async (e) => {
  e.preventDefault();

  const token = getToken();
  if (!token) {
    alert('Você precisa estar logado');
    return;
  }

  const nome = document.getElementById('nomeEvento').value.trim();
  const descricao = document.getElementById('descricao').value.trim();
  const duracao = document.getElementById('duracaoEvento').value.trim();

  if (!nome || !descricao) {
    alert('Preencha os campos obrigatórios');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/eventos`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome, descricao, duracao })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Evento adicionado:', data);
      
      await carregarEventos();
      formEvento.reset();
      alert('Evento adicionado com sucesso!');
    } else {
      const error = await response.json();
      alert(error.erro || 'Erro ao adicionar evento');
    }
  } catch (error) {
    console.error('Erro ao adicionar evento:', error);
    alert('Erro ao conectar com o servidor');
  }
});

async function deletarEvento(id) {
  if (!confirm('Deseja realmente deletar este evento?')) {
    return;
  }

  const token = getToken();
  if (!token) {
    alert('Você precisa estar logado');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/eventos/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      alert('Evento deletado com sucesso!');
      if (eventoSelecionado?.id === id) {
        eventoSelecionado = null;
      }
      await carregarEventos();
    } else {
      const error = await response.json();
      alert(error.erro || 'Erro ao deletar evento');
    }
  } catch (error) {
    console.error('Erro ao deletar evento:', error);
    alert('Erro ao conectar com o servidor');
  }
}

function selecionarEvento(id) {
  if (eventoSelecionado && eventoSelecionado.id === id) {
    eventoSelecionado = null;
  } else {
    eventoSelecionado = eventos.find(e => e.id === id);
  }

  renderizarEventos();
}


// MÚSICAS - CARREGAR, ADICIONAR, DELETAR
async function carregarMusicas() {
  const token = getToken();
  if (!token) {
    console.log('Token não encontrado');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/musicas`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      musicas = await response.json();
      atualizarContadorMusicas();
      renderizarMusicas();
      console.log('Músicas carregadas:', musicas);
    } else {
      console.error('Erro ao carregar músicas:', response.status);
    }
  } catch (error) {
    console.error('Erro ao carregar músicas:', error);
  }
}

function atualizarContadorMusicas() {
  contadorMusicas.textContent = `${musicas.length} música${musicas.length !== 1 ? 's' : ''}`;
  btnCriarEvento.disabled = musicas.length === 0;
}

function renderizarMusicas(filtro = '') {
  const listaMusicas = document.querySelectorAll('.lista-musicas')[1];

  // 🔥 LIMPA A LISTA ANTES DE RENDERIZAR
  listaMusicas.innerHTML = '';

  const filtradas = musicas.filter(m =>
    m.nome.toLowerCase().includes(filtro) ||
    m.artista.toLowerCase().includes(filtro)
  );

  if (filtradas.length === 0) {
    listaMusicas.innerHTML = `
      <div class="mensagem-vazia">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 18V5l12-2v13"></path>
          <circle cx="6" cy="18" r="3"></circle>
          <circle cx="18" cy="16" r="3"></circle>
        </svg>
        <p>Nenhuma música encontrada.<br>Tente outra busca ou adicione novas músicas!</p>
      </div>
    `;
    return;
  }

  filtradas.forEach((musica) => {
    const div = document.createElement('div');
    div.classList.add('item-musica');

    div.innerHTML = `
      <label>
        <input type="checkbox" data-id="${musica.id}">
        <strong>${musica.nome}</strong> – ${musica.artista}
        <span style="color:#888">(${musica.genero})</span>
        ${musica.duracao ? `<span style="color:#aaa; margin-left: 8px;">${musica.duracao}</span>` : ''}
      </label>
      <button class="btn-deletar" onclick="deletarMusica(${musica.id})">
        Excluir
      </button>
    `;

    listaMusicas.appendChild(div);
  });
}


formMusica.addEventListener('submit', async (e) => {
  e.preventDefault();

  const token = getToken();
  if (!token) {
    alert('Você precisa estar logado');
    return;
  }

  const nome = document.getElementById('nomeMusica').value.trim();
  const artista = document.getElementById('artista').value.trim();
  const genero = document.getElementById('genero').value;
  const duracao = document.getElementById('duracao').value.trim();

  if (!nome || !artista || !genero) {
    alert('Preencha os campos obrigatórios');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/musicas`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome, artista, genero, duracao })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Música adicionada:', data);
      
      await carregarMusicas();
      formMusica.reset();
      alert('Música adicionada com sucesso!');
    } else {
      const error = await response.json();
      alert(error.message || 'Erro ao adicionar música');
    }
  } catch (error) {
    console.error('Erro ao adicionar música:', error);
    alert('Erro ao conectar com o servidor');
  }
});

async function deletarMusica(id) {
  if (!confirm('Deseja realmente deletar esta música?')) {
    return;
  }

  const token = getToken();
  if (!token) {
    alert('Você precisa estar logado');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/musicas/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      alert('Música deletada com sucesso!');
      await carregarMusicas();
    } else {
      const error = await response.json();
      alert(error.message || 'Erro ao deletar música');
    }
  } catch (error) {
    console.error('Erro ao deletar música:', error);
    alert('Erro ao conectar com o servidor');
  }
}

// BUSCA E SELEÇÃO 
busca.addEventListener('input', () => {
  renderizarMusicas(busca.value.toLowerCase());
});

function selecionarTodas() {
  const listaMusicas = document.querySelectorAll('.lista-musicas')[1];
  listaMusicas
    .querySelectorAll('input[type="checkbox"]')
    .forEach(cb => cb.checked = true);
}

function limparSelecao() {
  const listaMusicas = document.querySelectorAll('.lista-musicas')[1];
  listaMusicas
    .querySelectorAll('input[type="checkbox"]')
    .forEach(cb => cb.checked = false);
}

// CRIAR EVENTO (VINCULAR MÚSICAS AO EVENTO) 
async function criarEvento() {
  if (!eventoSelecionado) {
    alert('Selecione um evento primeiro!');
    return;
  }

  const token = getToken();
  if (!token) {
    alert('Você precisa estar logado');
    return;
  }

  const listaMusicas = document.querySelectorAll('.lista-musicas')[1];
  const selecionadas = [];

  let ordem = 1;

  listaMusicas
    .querySelectorAll('input[type="checkbox"]:checked')
    .forEach(cb => {
      selecionadas.push({
        musica_id: Number(cb.dataset.id),
        ordem: ordem++
      });
    });

  if (selecionadas.length === 0) {
    alert('Selecione ao menos uma música para vincular ao evento');
    return;
  }

  try {
    const response = await fetch(`${API_URL}/eventoMusica`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        evento_id: eventoSelecionado.id,
        musicas: selecionadas
      })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.erro || 'Erro ao salvar repertório');
      return;
    }

    alert(`Repertório salvo com sucesso para o evento "${eventoSelecionado.nome}"`);

    limparSelecao();

  } catch (error) {
    console.error('Erro ao vincular músicas:', error);
    alert('Erro ao conectar com o servidor');
  }
}

