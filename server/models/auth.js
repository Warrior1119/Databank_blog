const { v4: uuid } = require('uuid');
const User = require('./user');
const tokens = {};

function getUser(token) {
  const user = tokens[token];
  if (user) {
    return user;
  }
  return null;
}

function login({ email, password }) {
  const user = User.getByEmail(email);
  if (user) {
    if (user.password === password) {
      const token = uuid();
      tokens[token] = user;
      return token;
    }
  }
  return null;
}

function register({ name, email, password }) {
  let user = User.getByEmail(email);
  if (user) {
    return null;
  }

  user = User.create({ name, email, password });
  const token = uuid();
  tokens[token] = user;
  return token;
}

module.exports = {
  getUser,
  login,
  register,
};
