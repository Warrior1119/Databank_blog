const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const ArticleController = require('../controllers/article');
const CommentController = require('../controllers/comment');
const UserController = require('../controllers/user');
const AuthController = require('../controllers/auth');
const { authorize } = require('../middlewares/auth');
const multer = require('koa-multer');
const serve = require('koa-static');

const upload = multer({ dest: 'server/uploads/' });

const router = new Router();

router.use(bodyParser());

router
  .get('/articles', ArticleController.getAllArticles)
  .post('/articles', authorize, ArticleController.createArticle)
  .get('/articles/:articleId', ArticleController.getArticle)
  .put('/articles/:articleId', authorize, ArticleController.updateArticle)
  .delete('/articles/:articleId', authorize, ArticleController.deleteArticle)
  .get('/articles/:articleId/comments', CommentController.getAllComments)
  .post(
    '/articles/:articleId/comments',
    authorize,
    CommentController.createComment,
  );

router
  .get('/comments/:commentId', CommentController.getComment)
  .put('/comments/:commentId', authorize, CommentController.updateComment)
  .delete('/comments/:commentId', authorize, CommentController.deleteComment);

router
  .get('/users', UserController.getAllUsers)
  .post('/users', UserController.createUser)
  .get('/users/:userId', UserController.getUser)
  .put('/users/:userId', UserController.updateUser)
  .delete('/users/:userId', UserController.deleteUser);

router
  .post('/login', AuthController.login)
  .post('/register', AuthController.register)
  .get('/logout', authorize, AuthController.logout)
  .get('/profile', authorize, AuthController.getProfile)
  .put('/profile', authorize, AuthController.updateProfile)
  .post('/avatar', upload.single('avatar'), AuthController.uploadAvatar);

module.exports = router;
