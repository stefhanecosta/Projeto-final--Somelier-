const API_URL = 'https://projeto-final-somelier.onrender.com/api';

const form = document.getElementById('form-cadastro');

form.addEventListener('submit', async function(e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value;
  const confirma = document.getElementById('confirma').value;

  
  if (!nome || !email || !senha || !confirma) {
    alert('Por favor, preencha todos os campos!');
    return;
  }

  if (senha !== confirma) {
    alert('As senhas não coincidem!');
    return;
  }

  if (senha.length < 6) {
    alert('A senha deve ter no mínimo 6 caracteres!');
    return;
  }
  
  const btnSubmit = form.querySelector('button[type="submit"]');
  btnSubmit.disabled = true;
  btnSubmit.textContent = 'Cadastrando...';

  try {
    // Envia os dados para a API
    const response = await fetch(`${API_URL}/users/cadastro`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome: nome,
        email: email,
        senha: senha,
        confirmarSenha: confirma
      })
    });

    const data = await response.json();

    if (response.ok) {
      alert('Cadastro realizado com sucesso! Você será redirecionado para o login.');
      window.location.href = "login.html";
    } else {
      if (data.errors && data.errors.length > 0) {
        const mensagensErro = data.errors.map(err => err.msg).join('\n');
        alert('Erro no cadastro:\n' + mensagensErro);
      } else if (data.message) {
        alert(data.message);
      } else {
        alert('Erro ao realizar cadastro. Tente novamente.');
      }
    }

  } catch (error) {
    console.error('Erro ao cadastrar:', error);
    alert('Erro ao conectar com o servidor. Verifique se o backend está rodando.');
  } finally {
    
    btnSubmit.disabled = false;
    btnSubmit.textContent = 'Cadastrar';
  }
});