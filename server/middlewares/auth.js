const Auth = require('../models/auth');

function authorize(ctx, next) {
  const { authorization } = ctx.headers;

  if (!authorization) {
    ctx.status = 401;
    ctx.body = { message: 'Unauthorized' };
  }

  const token = authorization;
  const user = Auth.getUser(token);
  if (user) {
    ctx.user = user;
    next();
  } else {
    ctx.status = 401;
    ctx.body = { message: 'Unauthorized' };
  }
}

module.exports = {
  authorize,
};
