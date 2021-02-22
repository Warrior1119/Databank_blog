const Comment = require('../models/comment');
const User = require('../models/user');

function getAllComments(ctx, next) {
  const { articleId } = ctx.params;
  ctx.body = Comment.list(articleId);
}

function getComment(ctx, next) {
  const { commentId } = ctx.params;
  ctx.body = Comment.get(commentId);
}

function createComment(ctx, next) {
  const { body } = ctx.request;
  const { articleId } = ctx.params;
  const user = ctx.user;
  ctx.body = Comment.create(articleId, user.id, body);
}

function updateComment(ctx, next) {
  const { body } = ctx.request;
  const { commentId } = ctx.params;
  console.log(commentId, body);
  ctx.body = Comment.update(commentId, body);
}

function deleteComment(ctx, next) {
  const { commentId } = ctx.params;
  Comment.remove(commentId);
  ctx.body = '{}';
}

module.exports = {
  getAllComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
};
