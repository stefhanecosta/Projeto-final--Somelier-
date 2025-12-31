const lista = document.getElementById('lista-eventos');
const loading = document.getElementById('loading');
const mensagemErro = document.getElementById('mensagem-erro');

let eventosCache = [];

function mostrarErro(msg) {
  mensagemErro.textContent = msg;
  mensagemErro.style.display = 'block';
  setTimeout(() => (mensagemErro.style.display = 'none'), 5000);
}

function formatarData(data) {
  if (!data) return 'Data não informada';
  return new Date(data).toLocaleString('pt-BR');
}

//BUSCA EVENTOS
async function carregarEventos() {
  try {
    loading.style.display = 'block';
    lista.innerHTML = '';

    const token = localStorage.getItem('token');

    const res = await fetch('/api/eventoMusica', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error('Falha ao buscar eventos');
    }

    const eventos = await res.json();
    eventosCache = eventos;

    renderizarEventos(eventos);
  } catch (error) {
    console.error(error);
    mostrarErro('Erro ao carregar eventos');
  } finally {
    loading.style.display = 'none';
  }
}

function renderizarEventos(eventos) {
  if (!Array.isArray(eventos) || eventos.length === 0) {
    lista.innerHTML = '<p>Nenhum evento cadastrado.</p>';
    return;
  }

  eventos.forEach(evento => {
    const card = document.createElement('div');
    card.className = 'evento-card';

    const musicasHtml =
      Array.isArray(evento.musicas) && evento.musicas.length > 0
        ? evento.musicas
            .sort(
              (a, b) =>
                (a.EventoMusica?.ordem ?? 0) -
                (b.EventoMusica?.ordem ?? 0)
            )
            .map(m => `<div>• ${m.nome} - ${m.artista}</div>`)
            .join('')
        : '<em>Nenhuma música cadastrada</em>';

    card.innerHTML = `
      <h3>${evento.nome}</h3>
      <p>📅 ${formatarData(evento.criado_em)}</p>
      <p>${evento.descricao || ''}</p>

      <strong> Repertório</strong>
      <div class="evento-musicas">
        ${musicasHtml}
      </div>

      <div class="evento-botoes-discretos">
        <button class="btn-publicar" onclick="publicarEvento(${evento.id})">
          Publicar
        </button>

        <button class="btn-excluir" onclick="excluirEvento(${evento.id})">
          Excluir
        </button>
      </div>

    `;

    lista.appendChild(card);
  });
}

// PUBLICAR / ABRIR VOTAÇÃO 
async function publicarEvento(eventoId) {
  if (!confirm('Deseja publicar este evento e abrir a votação pública?')) return;

  try {
    const token = localStorage.getItem('token');

    const res = await fetch(`/api/eventos/${eventoId}/publicar`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error('Erro ao publicar evento');
    }

    const data = await res.json();
    window.location.href = `eventoPublicado.html?e=${data.slug}`;

  } catch (error) {
    console.error(error);
    mostrarErro('Erro ao publicar evento');
  }
}

// EXCLUI EVENTO 
async function excluirEvento(id) {
  if (!confirm('Deseja excluir o repertório deste evento?')) return;

  try {
    const token = localStorage.getItem('token');

    const res = await fetch(`/api/eventos/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error('Falha ao excluir repertório');
    }

    carregarEventos();
  } catch (error) {
    console.error(error);
    mostrarErro('Erro ao excluir evento');
  }
}

document.addEventListener('DOMContentLoaded', carregarEventos);
