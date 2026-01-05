<div align="center">

# 🎵 Somelier Musical

### Sistema web para criação de eventos musicais e votação pública

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Render](https://img.shields.io/badge/Render-000000?style=for-the-badge&logo=render&logoColor=white)](https://render.com/)

</div>

---

## 👩‍💻 Autora

**Stefhane Pereira Costa**  
Matrícula: **2023098225**

---

## 📌 Sobre o Projeto

<table>
<tr>
<td>

O **Somelier Musical** é um sistema web desenvolvido para a criação, gerenciamento e votação de músicas em eventos musicais.

A aplicação permite que cantores ou organizadores criem eventos, cadastrem playlists e disponibilizem uma página pública para votação, onde o público pode escolher suas músicas favoritas.

**Por que usar?**
- ✅ Organização de eventos musicais
- ✅ Votação pública simples e intuitiva
- ✅ Atualização de resultados em tempo real
- ✅ Arquitetura moderna e escalável

</td>
</tr>
</table>

---

## ⚙️ Funcionalidades

### 🎤 Área do Cantor (Administrador)
- Criação de eventos musicais
- Cadastro de músicas e playlists
- Publicação de eventos para votação
- Visualização de ranking e resultados

### 🗳️ Área de Votação Pública
- Página pública acessada por link
- Sistema de votação única
- Exibição aleatória das músicas
- Confirmação e registro do voto
- Ranking atualizado em tempo real

---

## 🔄 Como Funciona

<details open>
<summary><b> Para o Cantor / Organizador</b></summary>
<br>

1. Acessa o sistema
2. Cria um evento musical
3. Cadastra as músicas da playlist
4. Publica o evento
5. Compartilha o link de votação com o público

</details>

<details>
<summary><b> Para o Público</b></summary>
<br>

1. Acessa o link público do evento
2. Visualiza as músicas disponíveis
3. Escolhe sua música preferida
4. Confirma o voto
5. Acompanha o ranking em tempo real

</details>

---

## 🧱 Arquitetura do Sistema

O projeto segue uma arquitetura **cliente-servidor**, dividida em três camadas:

- **Frontend:** Interface do usuário (HTML, CSS e JavaScript)
- **Backend:** API REST responsável pela lógica de negócio
- **Banco de Dados:** Persistência das informações

Essa separação facilita manutenção, escalabilidade e organização do código.

---

## 💻 Tecnologias Utilizadas

<div align="center">

<table>
<tr>
<td align="center" width="110">
<img src="https://skillicons.dev/icons?i=html" width="48" height="48" alt="HTML" />
<br>HTML5
</td>
<td align="center" width="110">
<img src="https://skillicons.dev/icons?i=css" width="48" height="48" alt="CSS" />
<br>CSS3
</td>
<td align="center" width="110">
<img src="https://skillicons.dev/icons?i=js" width="48" height="48" alt="JavaScript" />
<br>JavaScript
</td>
<td align="center" width="110">
<img src="https://skillicons.dev/icons?i=nodejs" width="48" height="48" alt="Node.js" />
<br>Node.js
</td>
<td align="center" width="110">
<img src="https://skillicons.dev/icons?i=postgresql" width="48" height="48" alt="PostgreSQL" />
<br>PostgreSQL
</td>
<td align="center" width="110">
<img src="https://skillicons.dev/icons?i=render" width="48" height="48" alt="Render" />
<br>Render
</td>
</tr>
</table>

</div>

---

## 🗄️ Banco de Dados

- Banco de dados **PostgreSQL**
- Hospedado na plataforma **Render**
- Manipulado através do **ORM Sequelize**
- Entidades principais:
  - Usuário
  - Evento
  - Música
  - Voto

O uso de ORM abstrai o SQL e facilita a manutenção do sistema.

---

## 🚀 Deploy

### Backend
- Hospedado no **Render**
- Deploy automático a partir do GitHub
- Uso de variáveis de ambiente para segurança

### Frontend
- Hospedado separadamente
- Consome a API pública do backend
- Comunicação em tempo real via Socket.IO

---

## 🔐 Variáveis de Ambiente

```env
DB_HOST=
DB_USER=
DB_PASS=
DB_NAME=
DB_PORT=5432
PORT=3000
