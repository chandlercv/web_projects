/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
// eslint-disable-next-line no-unused-vars
const ejs = require('ejs');
const mongoose = require('mongoose');
const _ = require('lodash');

const port = 3145;

const homeStartingContent = 'Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.';
const aboutContent = 'Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.';
const contactContent = 'Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.';

const app = express();

const postsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: String,
});

const Post = mongoose.model('Post', postsSchema);

mongoose.connect('mongodb://dadtab:27017/dogBlog', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => Post.find({}))
  .then((posts) => {
    console.log(posts);
  })
  .catch((error) => {
    console.log(error);
  });

// const posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  Post.find({})
    .then((posts) => {
      const homePosts = posts.map((post) => {
        const homePost = {
          title: post.title,
          body: _.truncate(post.content, { length: 100 }),
          kebabTitle: _.kebabCase(post.title),
        };
        return homePost;
      });
      res.render('home', { homeStartingText: homeStartingContent, posts: homePosts });
    });
});

app.get('/about', (req, res) => {
  res.render('about', { aboutText: aboutContent });
});

app.get('/contact', (req, res) => {
  res.render('contact', { contactText: contactContent });
});

app.get('/compose', (req, res) => {
  res.render('compose');
});

app.post('/compose', (req, res) => {
  const { postTitle, postBody } = req.body;
  const newPost = new Post({ title: postTitle, content: postBody });
  newPost.save()
    .then(() => {
      res.redirect('/');
    });
});

app.get('/posts/:postTitle', (req, res) => {
  const { postTitle } = req.params;

  Post.findOne({ title: new RegExp(`^${_.lowerCase(postTitle)}$`, 'i') })
    .then((matchingPost) => {
      if (matchingPost) {
        res.render('post', { post: matchingPost });
      } else {
        res.redirect('/');
        console.log('no match found');
      }
    });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
