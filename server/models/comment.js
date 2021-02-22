const { v4: uuid } = require('uuid');
const User = require('./user');

const comments = {};

function populateUser(comment) {
  if (!comment) {
    return null;
  }

  const populated = { ...comment };
  if (populated['authorId']) {
    const user = User.get(populated['authorId']);
    delete populated['authorId'];
    populated['author'] = {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
    };
  }

  return populated;
}

function get(id) {
  return populateUser(comments[id]);
}

function list(articleId) {
  return Object.values(comments)
    .filter(comment => comment.articleId === articleId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map(comment => populateUser(comment));
}

function create(articleId, authorId, data) {
  const id = uuid();
  const createdAt = new Date().toISOString();
  const newData = { id, ...data, authorId, articleId, createdAt };
  comments[id] = newData;
  return populateUser(newData);
}

function update(commentId, data) {
  if (comments[commentId]) {
    const newData = { ...comments[commentId], ...data };
    console.log(newData);
    comments[commentId] = newData;
    return populateUser(newData);
  }
  return null;
}

function remove(id) {
  if (comments[id]) {
    delete comments[id];
  }
}

module.exports = {
  get,
  list,
  create,
  update,
  remove,
};
