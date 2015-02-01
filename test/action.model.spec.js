var should = require('should')
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
		it('should err without title', function() {
			Page.schema.validatesPresenceOf('title')
		})
		it('should err with title of zero length')
		it('should err without body')
	})

	describe('Statics', function() {
		describe('findBytag', function() {
			it('should get pages with the search tag')
			it('should not get pages without the search tag')
		})
	})

	describe('Methods', function() {
		describe('computerUrlName', function() {
			it('should convert non-word-like chars to underscores')
		})

		describe('getSimilar', function() {
			it('should never get itself')
			it('should get other pages with any common tags')
			it('should not get other pages without any common tags')
			it('should be order-independent')
		})
	})

	describe('Virtuals', function() {
		describe('full_route', function() {
			it('should return the url_name prepended by "/wiki/"')
		})
	})

	describe('Hooks', function() {
		it('should call computerUrlName before save')
	})
})