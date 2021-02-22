const { v4: uuid } = require('uuid');

const users = {};

function get(id) {
  return users[id];
}

function getByEmail(email) {
  const user = Object.values(users).find(user => user.email === email);
  return user;
}

function list() {
  return Object.values(users);
}

function create(data) {
  const id = uuid();
  const createdAt = new Date().toISOString();
  const newData = { id, ...data, createdAt };
  users[id] = newData;
  return newData;
}

function update(userId, data) {
  const existing = getByEmail(data.email);
  if (existing && existing.id !== userId) {
    return -1;
  }

  if (users[userId]) {
    const newData = { ...users[userId], ...data };
    console.log(data, newData);
    users[userId] = newData;
    return newData;
  }
  return null;
}

function remove(id) {
  if (users[id]) {
    delete users[id];
  }
}

module.exports = {
  get,
  getByEmail,
  list,
  create,
  update,
  remove,
};
