var supertest = require('supertest');
var app = require('../app');
var agent = supertest.agent(app);
var Page = require('../models').Page;

describe('http requests', function() {

    describe('GET /', function() {
        xit('gets 200 on index', function(done) {
        	agent
        	.get('/')
      		.expect(200, done);
        });
    });

    describe('GET /wiki/:title', function(done) {

    			afterEach(function(done) {
				    Page.find({title: 'fishstix'}).remove(done);
					})

        xit('gets 404 on page that doesnt exist', function(done) {
        	Page.create({
        		title: 'fishstix',
        		body: 'i wouldnt read this'
        	}).then(function() {
        		console.log("RRREEEEESSSS")
        		agent
        		.get('/wiki/whalestix')
        		.expect(404, done);
        	});
        });
        xit('gets 200 on page that does exist', function(done) {
        	Page.create({
        		title: 'fishstix',
        		body: 'i wouldnt read this'
        	}).then(function() {
        		console.log("RRREEEEESSSS")
        		agent
        		.get('/wiki/fishstix')
        		.expect(200, done);
        	});
        });
    });

    describe('GET /wiki/tags/:tag', function() {
    	  afterEach(function(done) {
				    Page.find({title: 'fishstix'}).remove(done);
					})

        xit('gets 200', function(done) {
        	Page.create({
        		title: 'fishstix',
        		body: 'i wouldnt read this',
        		tags: ['tangy']
        	}).then(function() {
        		agent
        		.get('/wiki/tags/fishy')
        		.expect(200, done);
        	});
        });
    });

    describe('GET /wiki/:title/similar', function() {

    		 afterEach(function(done) {
				    Page.find({title: 'fishstix'}).remove(done);
					})

        xit('gets 404 for page that doesn\'t exist', function(done) {
					Page.create({
        		title: 'fishstix',
        		body: 'i wouldnt read this',
        		tags: ['tangy']
        	}).then(function() {
        		agent
        		.get('/wiki/whalestix/similar')
        		.expect(404, done);
        	});        		
        });
        xit('gets 200 for similar page', function(done) {
        	Page.create({
        		title: 'fishstix',
        		body: 'i wouldnt read this',
        		tags: ['tangy']
        	}).then(function() {
        		agent
        		.get('/wiki/fishstix/similar')
        		.expect(200, done);
        	});        		
        });
    });

    describe('GET /wiki/:title/edit', function() {

    		 afterEach(function(done) {
				    Page.find({title: 'fishstix'}).remove(done);
					})

        xit('gets 404 for page that doesn\'t exist', function(done) {

        	Page.create({
        		title: 'fishstix',
        		body: 'i wouldnt read this',
        		tags: ['tangy']
        	}).then(function() {
        		agent
        		.get('/wiki/whalestix/edit')
        		.expect(404, done);
        	});    

        });
        xit('gets 200 for page that exists', function(done) {
        	Page.create({
        		title: 'fishstix',
        		body: 'i wouldnt read this',
        		tags: ['tangy']
        	}).then(function() {
        		agent
        		.get('/wiki/fishstix/edit')
        		.expect(200, done);
        	});    
        });
    });

    describe('GET /add', function() {

        xit('gets 200', function(done) {
        	agent
        		.get('/add')
        		.expect(200, done);
        });
    });

    describe('POST /wiki/:title/edit', function() {

				afterEach(function(done) {
				    Page.find({title: {$in: ['fishstix', 'whalestix']}}).remove(done);
					})    		

        xit('gets 404 for page that doesn\'t exist', function(done) {
        	Page.create({
        		title: 'fishstix',
        		body: 'i wouldnt read this',
        		tags: ['tangy']
        	}).then(function() {
        		agent
        		.post('/wiki/whalestix/edit')
        		.expect(404, done);
        	});  
        });

        xit('updates db', function(done) {
        	Page.create({
        		title: 'fishstix',
        		body: 'i wouldnt read this',
        		tags: ['tangy']
        	}).then(function() {
        		var body = {title: 'whalestix', tags: 'tangy', body: 'fishy body'};
        		agent
        		.post('/wiki/fishstix/edit')
        		.send(body)
        		.expect(200)
        		.end(function(){
        			agent
        			.get('/wiki/whalestix')
        			.expect(200, done);
        		})
        	})
        });
    });

    describe('POST /add/submit', function(done) {
        it('creates in db', function(done) {

        	afterEach(function(done) {
				    Page.find({title: {$in: ['fishstix', 'whalestix']}}).remove(done);
					}) 
        	
        	var body = {title: 'whalestix', tags: 'tangy', body: 'fishy body'};
        		agent
        		.post('/add/submit')
        		.send(body)
        		.expect(200)
        		.end(function(){
        			agent
        			.get('/wiki/whalestix')
        			.expect(200, done);
        		})

        });
    });

});