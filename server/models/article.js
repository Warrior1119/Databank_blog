const { v4: uuid } = require('uuid');
const User = require('./user');

const articles = {};

function populateUser(article) {
  if (!article) {
    return null;
  }

  const populated = { ...article };
  if (populated['authorId']) {
    const author = User.get(populated['authorId']);
    delete populated['authorId'];
    populated['author'] = {
      id: author.id,
      name: author.name,
      avatar: author.avatar,
    };
  }

  return populated;
}

function get(id) {
  return populateUser(articles[id]);
}

function list() {
  return Object.values(articles)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map(article => populateUser(article));
}

function create(authorId, data) {
  const id = uuid();
  const createdAt = new Date().toISOString();
  const newData = { id, ...data, authorId, createdAt };
  articles[id] = newData;
  return populateUser(newData);
}

function update(articleId, data) {
  if (articles[articleId]) {
    const newData = { ...articles[articleId], ...data };
    articles[articleId] = newData;
    return populateUser(newData);
  }
  return null;
}

function remove(id) {
  if (articles[id]) {
    delete articles[id];
  }
}

module.exports = {
  get,
  list,
  create,
  update,
  remove,
};
