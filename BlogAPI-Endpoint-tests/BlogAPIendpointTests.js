const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

const should = chai.should();

chai.use(chaiHttp);

describe('BlogPosts', function() {

  before(function() {
    return runServer();
  });

  after(function() {
    return closeServer();
  });

  it('Should list a blog post on GET', function() {
  	return chai.request(server)
      .get('/blog-post')
      .then(function(res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.be.above(0);
        res.body.forEach(function(item) {
          item.should.be.a('object');
          item.should.have.all.keys(
            'title', 'content', 'authorName');
        });
        done();
      });
  });


  it('Should add a blog post on POST', function() {
  	const newPost = {title: 'Post-1', content: 'This is a paragraph', authorName: 'Sally Student'};
  	return chai.request(server)
  	.post('/blog-post')
  	.send(newPost)
  	.then(function(rest) {
  		res.should.have.status(201);
  		res.should.be.json;
  		res.body.should.be.a('object');
  		res.body.should.include.keys('title', 'content', 'authorName');
  		res.body.id.should.not.be.null;
  		res.body.should.deep.equal(Object.assign(newPost, {title: res.body.title}));
  		});
  	done();
  });

  it('Should update a blog post on PUT', function() {
  	const updatePost = {
  		title: 'title',
  		content: 'stuff',
  		authorName: 'Sally Student'}
  		return chai.request(server)
  			.get('/blog-post')
  			.then(function(res) {
  				updatePost.title = res.body[0].title;
  			.then(function(res) {
  				updatePost.content = res.body[0].content;
  			.then(function(res) {
  				updatePost.authorName = res.body[0].authorName;
  				return chai.request(server)
  				.put(`/blog-post/${updatePost.title}`)
  				.put(`/blog-post/${updatePost.content}`)
  				.put(`/blog-post/${updatePost.authorName}`)
  				.send(updatePost)

  			})
  			then(function(res) {
  				res.should.have.status(200);
  				res.should.be.json;
  				res.body.should.be.a('object');
  				res.body.should.deep.equal(updatePost);
  			});
 	done();
  });

  it('Should delete a blog post on DELETE' function() {
  	return chai.request(server)
  		.get('/blog-post')
  		.then(function(res) {
  			return chai.request(server)
  				.delete(`blog-post/${res.body[0].title}`);
  				.delete(`blog-post/${res.body[0].content}`);
  				.delete(`blog-post/${res.body[0].authorName}`);
  		})
  		.then(function(res) {
  			res.should.have.status(204);

 		 });
  	done();
  });
});
