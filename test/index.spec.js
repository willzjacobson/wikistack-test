var chai = require('chai');
var expect = require('chai').expect;
var spies = require('chai-spies');
chai.use(spies);
var models = require('../models/');
var Page = require('../models/').Page;

describe('Page model', function() {

    describe('Validations', function() {

    	var page;
    	beforeEach(function() {
    		page = new Page();
    		page.title;
    		page.body;
    	})

      xit('errors without title', function(done) {
      	page.save(function(error, page) {
      		var isIt = (error.errors.title);
      		expect(isIt).to.be.ok;
      		done()
      	})
      });
      xit('errors without body', function(done) {
      	console.log("PAGEEEE", page)
      	page.save(function(error, page) {
      		expect(error.errors.body.message).to.equal('Path `body` is required.');
      		console.log("error.errors", error.errors.body);
      		// var isIt = (error.errors.body);
      		// expect(isIt).to.be.ok;
      		done();
      	})
      });
    });

    describe('Statics', function() {
        describe('findByTag', function() {

        	beforeEach(function(done) {
				    Page.create({
				        title: 'foo',
				        body: 'bar',
				        tags: ['foo', 'bar', 'search']
				    }, done )
					})

					afterEach(function(done) {
				    Page.find({
				        title: 'foo',
				        body: 'bar',
				        tags: ['foo', 'bar', 'search']
				    }).remove(done);
					})

            xit('gets pages with the search tag', function(done) {
            	Page.findByTag('search', function(err, pages){
            		if (err) {
            			(done(err));
            		} else {
            			console.log("PAAAAGGEEESSS", pages)
            			expect(pages.length).to.equal(1);
            			done();
            		}
            	})

            });
            xit('does not get pages without the search tag', function(done) {
            	Page.findByTag('search', function(err, pages){
            		if (err) {
            			(done(err));
            		} else {
            			expect(pages[0].tags).to.include('search')
            			done();
            		}
            	})
            });
        });
    });

    describe('Methods', function() {

        describe('computeUrlName', function() {

        		var page = new Page({
				        title: 'foo',
				        body: 'bar',
				        tags: ['foo', 'bar', 'search']
				    })

            xit('converts non-word-like chars to underscores', function() {
            	page.computeUrlName();
            	expect(page.url_name).to.equal("foo")
            });
        });

        describe('getSimilar', function(done) {

        	var page1;
        	var page2;
        	var page3;

        	beforeEach(function(done) {
				    Page.create({
				        title: 'foo',
				        body: 'bar',
				        tags: ['foo', 'bar', 'search']
				      }).then(function(page){
				    	page1 = page;
							return Page.create({
				        title: 'foo',
				        body: 'stretching',
				        tags: ['foo', 'fish']
				      })
				    }).then(function(page){
				    	page2 = page;
							return Page.create({
				        title: 'foo',
				        body: 'stretching',
				        tags: ['bar', 'moose']
				      })
				    }).then(function(page){
				    	page3 = page;
				    }).then(done);
					})

					afterEach(function(done) {
				    Page.find({}).remove(done);
					})

            xit('never gets itself', function(done) {
            	page1.getSimilar(function(err, pages) {
            		console.log('PPAAAAGGGEs', pages)
            		expect(pages[0]._id).to.not.equal(this._id);
            		done()
            	})
            });
            xit('gets other pages with any common tags', function(done) {
							page2.getSimilar(function(err, pages) {
            		expect(pages.length).to.equal(1);
            		expect(pages[0]._id).to.not.equal(this._id);
            		done()
            	})
            });
            xit('does not get other pages without any common tags', function(done) {
            	page2.getSimilar(function(err, pages) {
            		expect(pages[0]._id).to.not.equal(page3._id);
            		done();
            	});
            });
        });
    });

    describe('Virtuals', function() {

    	var thisPage;

    	beforeEach(function() {
				thisPage = new Page({
					title: "Hell Yeah",
					body: "SOME STOUGH"
				})	
				thisPage.computeUrlName();    
			})

        describe('full_route', function(done) {
            xit('returns the url_name prepended by "/wiki/"', function() {
            	expect(thisPage.full_route).to.equal("/wiki/Hell_Yeah");
            	done();
            });
        });
    });

    describe('Hooks', function() {

    	var thisPage;
    	beforeEach(function() {
				thisPage = new Page({
					title: "Hell Yeah",
					body: "SOME STOUGH"
				})
			})	

        xit('calls computeUrlName before save', function(done) {
        	var spy = chai.spy.on(thisPage, 'computeUrlName');
        	thisPage.save().then(function() {
        		expect(spy).to.have.been.called();
        		done();
        	});
        });
    })
    
    afterEach(function(done) {
				    Page.find({}).remove(done);
		})
});





