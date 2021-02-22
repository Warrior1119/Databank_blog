const Article = require('../models/article');
const User = require('../models/user');

function getAllArticles(ctx, next) {
  const articles = Article.list().map(
    ({ id, author, title, content, createdAt }) => {
      return {
        id,
        author,
        title,
        summary: content,
        createdAt,
      };
    },
  );
  ctx.body = articles;
}

function getArticle(ctx, next) {
  const { articleId } = ctx.params;
  ctx.body = Article.get(articleId);
}

function createArticle(ctx, next) {
  const { body } = ctx.request;
  const user = ctx.user;
  ctx.body = Article.create(user.id, body);
}

function updateArticle(ctx, next) {
  const { body } = ctx.request;
  const { articleId } = ctx.params;
  ctx.body = Article.update(articleId, body);
}

function deleteArticle(ctx, next) {
  const { articleId } = ctx.params;
  Article.remove(articleId);
  ctx.body = '{}';
}

module.exports = {
  getAllArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
};
