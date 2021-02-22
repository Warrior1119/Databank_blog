const fs = require('fs');
const User = require('../models/user');
const Auth = require('../models/auth');

function login(ctx, next) {
  const { body } = ctx.request;
  const token = Auth.login(body);

  if (!token) {
    ctx.status = 403;
    ctx.body = { message: "Password doesn't match" };
  } else {
    const user = Auth.getUser(token);
    ctx.body = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      token,
    };
  }
}

function register(ctx, next) {
  const { body } = ctx.request;
  const token = Auth.register(body);

  if (!token) {
    ctx.status = 409;
    ctx.body = { message: 'Email already in use' };
  } else {
    const user = Auth.getUser(token);
    ctx.body = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      token,
    };
  }
}

function getProfile(ctx, next) {
  const { body } = ctx.request;

  ctx.body = User.create(body);
}

function updateProfile(ctx, next) {
  const { body } = ctx.request;
  const data = {
    name: body.name,
    email: body.email,
  };
  if (body.password && body.password.length > 0) {
    data.password = body.password;
  }

  if (body.avatar && body.avatar.length > 0) {
    data.avatar = body.avatar;
  }
  const auth = ctx.user;
  const user = User.update(auth.id, data);
  if (user === -1) {
    ctx.status = 409;
    ctx.body = { message: 'Email already in use' };
  } else {
    console.log(user);
    ctx.body = user;
  }
}

function logout(ctx, next) {}

async function uploadAvatar(ctx, next) {
  try {
    if (ctx.req.file) {
      ctx.body = {
        url: `http://localhost:3030/images/${ctx.req.file.filename}`,
      };
    } else {
      ctx.status = 400;
      ctx.body = { message: 'Error uploading file' };
    }
  } catch (err) {
    console.log(`error ${err.message}`);
    ctx.body = { message: err.message };
  }
}
module.exports = {
  login,
  register,
  getProfile,
  updateProfile,
  logout,
  uploadAvatar,
};
