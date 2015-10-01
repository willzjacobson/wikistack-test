var chai = require('chai');
var expect = require('chai').expect;
var spies = require('chai-spies');
chai.use(spies);

describe("simple addition", function() {
	xit("2 and another two is four", function() {
		expect(2+2).to.equal(4);
	})
})

describe("1000 miliseconds is one thousand ms", function() {
	xit("what we just said", function(done) {
		var t1 = new Date();
		setTimeout(function() {
			t2 = new Date();
			expect(t2.getTime() - t1.getTime()).to.be.closeTo(1000, 10);
			done();
		}, 1000)
	})
})


describe("forEach", function() {
	var testArray = [1,2,3,4,5];
	var toSpyOn = function() { };
	var spy = chai.spy(toSpyOn)
	xit('forEach runs n times', function() {
		testArray.forEach(spy)
		expect(spy).to.have.been.called.exactly(testArray.length);
	})
})