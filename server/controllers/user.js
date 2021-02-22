const User = require('../models/user');

function getAllUsers(ctx, next) {
  ctx.body = User.list();
}

function getUser(ctx, next) {
  const { userId } = ctx.params;
  ctx.body = User.get(userId);
}

function createUser(ctx, next) {
  const { body } = ctx.request;
  ctx.body = User.create(body);
}

function updateUser(ctx, next) {
  const { body } = ctx.request;
  const { userId } = ctx.params;
  ctx.body = User.update(userId, body);
}

function deleteUser(ctx, next) {
  const { userId } = ctx.params;
  User.remove(userId);
  ctx.body = '{}';
}

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
