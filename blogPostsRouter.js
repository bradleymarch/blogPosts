const express = require('express');
const blogPostsRouter = express.blogPostsRouter();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const {BlogPosts} = require('./models');

const jsonParser = bodyParser.json();
const app = express();

// log the http layer
app.use(morgan('common'));

// we're going to add some items to ShoppingList
// so there's some data to look at
BlogPosts.create('Post1', 'linkToContent', 'John A');
BlogPosts.create('Post2', 'linkToContent', 'John B');
BlogPosts.create('Post3', 'linkToContent', 'John C';


BlogPosts.get('/blog-posts', (req, res) => {
  res.json(BlogPosts.get());
});

BlogPosts.post('/blog-posts', jsonParser, (req, res) => {
  // ensure `name` and `budget` are in request body
  const requiredFields = ['title', 'content', 'authorName'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }

  const item = BlogPosts.create(req.body.name, req.body.budget);
  res.status(201).json(item);
});

// when PUT request comes in with updated item, ensure has
// required fields. also ensure that item id in url path, and
// item id in updated item object match. if problems with any
// of that, log error and send back status code 400. otherwise
// call `ShoppingList.update` with updated item.
BlogPosts.put('/blog-posts/:id', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'authorName' 'id'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body.id) {
    const message = (
      `Request path id (${req.params.id}) and request body id `
      `(${req.body.id}) must match`);
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating Blog Post \`${req.params.id}\``);
  const updatedItem = BLogPosts.update({
    id: req.params.id,
    title: req.params.body.title
    content: req.params.body.content,
    authorName: req.params.body.authorName 
    
  });
  res.status(204).json(updatedItem);
});

// when DELETE request comes in with an id in path,
// try to delete that item from ShoppingList.
BlogPosts.delete('/blog-posts/:id', (req, res) => {
  BlogPosts.delete(req.params.id);
  console.log(`Deleted blog post \`${req.params.ID}\``);
  res.status(204).end();
});


app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});