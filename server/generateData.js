const faker = require('faker');
const User = require('./models/user');
const Article = require('./models/article');
const Comment = require('./models/comment');

function generateData() {
  // Generate Users
  for (let i = 0; i < 5; i++) {
    const userData = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: '123456',
      avatar: `https://randomuser.me/api/portraits/lego/${i + 1}.jpg`,
    };
    User.create(userData);
  }

  // Create Articles
  const users = User.list();
  for (let i = 0; i < 5; i++) {
    const numArticles = Math.floor(Math.random() * 7 + 3);
    for (let j = 0; j < numArticles; j++) {
      const author = users[Math.floor(Math.random() * 5)];
      const articleData = {
        title: faker.lorem.text(10 + Math.floor(Math.random() * 30)),
        content: '<p>' + faker.lorem.paragraph() + '</p>',
      };

      const article = Article.create(author.id, articleData);

      const numComments = Math.floor(Math.random() * 5);
      for (let j = 0; j < numComments; j++) {
        const user = users[Math.floor(Math.random() * 5)];
        const commentData = {
          content: faker.lorem.paragraph(),
        };

        Comment.create(article.id, user.id, commentData);
      }
    }
  }
}

module.exports = generateData;
