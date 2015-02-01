var chai = require('chai')
var spies = require('chai-spies')
chai.use(spies);
var should = chai.should()


var Page = require('../models').Page

describe('testing the tests', function() {
	it('should add two numbers', function() {
		var result = 2 + 2
		result.should.equal(4)
	})
})

describe('Page Model', function() {
	//maybe we should give this away
	beforeEach(function(done) {
		Page.remove({}, done)
	})

	describe('Validations', function() {
		var page
		beforeEach(function() {
			page = new Page()
		})

		it('should err without title', function(done) {
			page.validate(function(err) {
				err.errors.should.have.property('title')
				done()
			})
		})
		it('should err with title of zero length', function(done) {
			page.title = ""
			page.validate(function(err) {
				err.errors.should.have.property('title')
				done()
			})
		})
		it('should err without body', function(done) {
			page.validate(function(err) {
				err.errors.should.have.property('body')
				done()
			})
		})
	})

	describe('Statics', function() {
		describe('findBytag', function() {

			beforeEach(function(done) {
				Page.create({
					title: 'foo',
					body: 'bar',
					tags: ['foo', 'bar']
				}, done )
			})

			it('should get pages with the search tag', function(done) {
				Page.findByTag('bar', function(err, pages) {
					pages.should.have.lengthOf(1)
					done()
				})
			})

			it('should not get pages without the search tag', function(done) {
				Page.findByTag('falafel', function(err, pages) {
					pages.should.have.lengthOf(0)
					done()
				})
			})
		})
	})

	describe('Methods', function() {


		describe('computeUrlName', function() {
			it('should convert non-word-like chars to underscores', function() {
				var page = new Page({ title: 'two words' })
				page.computeUrlName()
				page.url_name.should.equal('two_words')
			})
		})

		describe('getSimilar', function() {
			var page, unsimilar
			beforeEach(function(done) {
				Page.create({
					title: 'foo',
					body: 'bar',
					tags: ['foo', 'bar']
				}, function(err, page_) {
					page = page_
					done()
				} )
			})

			//one overlap
			beforeEach(function(done) {
				Page.create({
					title: 'foo1',
					body: 'bar',
					tags: ['balafal', 'foo']
				}, done)
			})

			//no overlap
			beforeEach(function(done) {
				Page.create({
					title: 'foo2',
					body: 'bar',
					tags: ['falafel', 'balafal']
				}, function(err, page_) {
					unsimilar = page_
					done()
				})
			})

			it('should never get itself', function(done) {
				page.getSimilar(function(err, pages) {
					pages.should.not.contain(page)
					done()
				})
			})

			it('should get other pages with any common tags', function(done) {
				page.getSimilar(function(err, pages) {
					pages.should.have.lengthOf(1)
					done()
				})
			})

			it('should not get other pages without any common tags', function(done) {
				page.getSimilar(function(err, pages) {
					pages.should.not.contain(unsimilar)
					done()
				})
			})
		})
	})

	describe('Virtuals', function() {
		describe('full_route', function() {
			it('should return the url_name prepended by "/wiki/"', function() {
				var page = new Page({ title: "fluf cats" })
				page.computeUrlName()
				page.full_route.should.equal("/wiki/fluf_cats")
			})
		})
	})

	describe('Hooks', function() {
		it('should call computeUrlName before save', function(done) {
			var page = new Page({
				title: 'foo',
				body: 'bar',
				tags: ['foo', 'bar']
			})

			page.computeUrlName = chai.spy(page.computeUrlName)

			page.save(function(err, page_) {
				page.computeUrlName.should.have.been.called()
				done()
			})
		})
	})
})