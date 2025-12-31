const UserRepository = require('../repositories/user.repository');

module.exports = {
  async login({ email, senha }) {
    const user = await UserRepository.findByEmail(email);
    if (!user) throw new Error('Usuário não encontrado');
    if (user.senha !== senha) throw new Error('Senha incorreta');

    return { mensagem: 'Login OK', user };
  },

  async register(data) {
    const exists = await UserRepository.findByEmail(data.email);
    if (exists) throw new Error('E-mail já cadastrado');

    const user = await UserRepository.create(data);
    return { mensagem: 'Usuário criado com sucesso', user };
  }
};
