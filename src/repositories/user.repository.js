const User = require('../models/User');

module.exports = {
  async create(data) {
    return await User.create(data);
  },

  async findByEmail(email) {
    return await User.findOne({ where: { email } });
  }
};
