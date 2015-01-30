var express = require('express');
var router = express.Router();
var models = require('../models')

/* GET home page. */
router.get('/', function(req, res, next) {
  models.Page.find({}, function(err, pages) {
    res.render('index', {
      title: 'Wikistack',
      pages: pages 
    });
  })

});

router.get('/wiki/:title', function(req, res, next) {
  //look at page name
  //find the page in the database
  //render a view with that object
  models.Page.findOne({ url_name: req.params.title }, function(err, page) {
    if(err) return next(err)
    if(!page) return res.status(404).send()
    res.render('show', { 
      title: page.title,
      body: page.body
    })
  })
})

router.post('/add/submit', function(req, res) {
  var newPage = new models.Page(req.body)

  newPage.save(function(err, page) {
    console.log(page)
    res.redirect(page.full_route)
  })
})

router.get('/add', function(req, res) {
  res.render('add')
})

module.exports = router;
