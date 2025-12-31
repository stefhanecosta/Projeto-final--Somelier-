const API_URL = 'https://projeto-final-somelier.onrender.com/api';

document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value;

  console.log('Iniciando login...');

  if (!email || !senha) {
    alert('Preencha todos os campos');
    return;
  }

  try {
    console.log('Enviando requisição para /api/auth/login');

    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, senha })
    });

    console.log('Status da resposta:', response.status);

    const data = await response.json();
    console.log('Resposta do servidor:', data);

    if (!response.ok) {
      console.log('Login falhou:', data.message);
      alert(data.message || 'Erro ao fazer login');
      return;
    }

    console.log('Login realizado com sucesso!');

    // Salvar token e usuário
    localStorage.setItem('token', data.token);
    localStorage.setItem('usuario', JSON.stringify(data.usuario));

    console.log('Token salvo');
    console.log('Usuário salvo:', data.usuario);

    alert('Login realizado com sucesso!');
    setTimeout(() => {
      window.location.href = 'cadastrarMusica.html';
    }, 800);

  } catch (error) {
    console.error('Erro no login:', error);
    alert('Erro ao conectar com o servidor. Verifique se o backend está rodando.');
  }

});
