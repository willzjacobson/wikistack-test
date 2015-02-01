var chai = require('chai')
var should = chai.should()

var supertest = require('supertest')
var app = require('../app')
var models = require('../models')
var agent = supertest.agent(app);

describe('http requests', function() {

	beforeEach(function(done) {
		models.Page.remove({}, done)
	})

	describe('GET /', function() {
		it('should get 200 on index', function(done) {
			agent
			  .get('/')
			  .expect(200, done)
		})
	})

	describe('GET /wiki/:title', function() {
		it('should get 404 on page that doesnt exist', function(done) {
			agent
			  .get('/wiki/foo')
			  .expect(404, done)
		})

		it('should get 200 on page that does exist', function(done) {
			models.Page.create({
				title: 'foo',
				body: 'bar'
			}, function() {
				agent
				  .get('/wiki/foo')
				  .expect(200, done)
			})
		})
	})

	describe('GET /wiki/tags/:tag', function() {
		it('should get 200', function(done) {
			agent
			  .get('/wiki/tags/farf')
			  .expect(200, done)
		})
	})

	describe('GET /wiki/:title/similar', function() {
		beforeEach(function(done) {
			models.Page.create({
				title: 'flflf',
				body: 'afdslkjadfsljkfads',
				tags: ['foo', 'bar']
			}, done)
		})

		it('should get 404 for page that doesn\'t exist', function(done) {
			agent
			  .get('/wiki/fafa/similar')
			  .expect(404, done)
		})

		it('should get 200 for similar page', function(done) {
			agent
			  .get('/wiki/flflf/similar')
			  .expect(200, done)
		})
	})

	describe('GET /wiki/:title/edit', function() {
		beforeEach(function(done) {
			models.Page.create({
				title: 'flflf',
				body: 'afdslkjadfsljkfads',
				tags: ['foo', 'bar']
			}, done)
		})

		it('should get 404 for page that doesn\'t exist', function(done) {
			agent
			  .get('/wiki/fafa/edit')
			  .expect(404, done)
		})

		it('should get 200 for similar page', function(done) {
			agent
			  .get('/wiki/flflf/edit')
			  .expect(200, done)
		})
	})

	describe('POST /wiki/:title/edit', function() {
		beforeEach(function(done) {
			models.Page.create({
				title: 'flflf',
				body: 'afdslkjadfsljkfads',
				tags: ['foo', 'bar']
			}, done)
		})

		it('should get 404 for page that doesn\'t exist', function(done) {
			agent
			  .post('/wiki/fafa/edit')
			  .expect(404, done)
		})

		it('should update db', function(done) {
			agent
			  .post('/wiki/flflf/edit')
			  .send({title: 'new title', body: 'ff', tags: 'sdf, sdf'})
			  .end(function(err, res) {
			  	models.Page.find({ title: 'new title'}, function(err, pages) {
			  		pages.should.have.lengthOf(1)
			  		done()
			  	})
			  })
		})
	})

	describe('POST /add/submit', function() {
		it('should create in db', function(done) {
			agent
			  .post('/add/submit')
			  .send({title: 'title', body: 'fofof', tags: 'sdf, sdf'})
			  .end(function(err, res) {
			  	models.Page.find({ title: 'title'}, function(err, pages) {
			  		pages.should.have.lengthOf(1)
			  		done()
			  	})
			  })
		})
	})

	describe('GET /add', function() {
		it('should get 200', function(done) {
			agent.get('/add').expect(200,done)
		})
	})

})


