'use strict';
module.exports = function(swig) {

  function pageLink (page) {
    return '<a href="' + page.route + '">' + page.title + '</a>';
  }
  pageLink.safe = true;
  swig.setFilter('pageLink', pageLink);

  // optional: using marked as a filter instead of in a renderedContent virtual
  var marked = require('marked');
  function markedFilter (body) {
    return marked(body);
  }
  markedFilter.safe = true;
  swig.setFilter('marked', markedFilter);

  // optional: using wiki as a filter instead of in a renderedContent virtual
  var generateUrlTitle = require('../models').Page.generateUrlTitle;
  function wiki (text) {
    var doubleBracketTags = /\[\[(.*?)\]\]/g;
    return text.replace(doubleBracketTags, replacer);
    function replacer(match, innerText) {
      return '<a href="/wiki/' + generateUrlTitle(innerText) + '">' + innerText + '</a>';
    }
  }
  wiki.safe = true;
  swig.setFilter('wiki', wiki);

};
