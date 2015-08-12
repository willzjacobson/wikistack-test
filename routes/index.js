'use strict';
var express = require('express');
var router = express.Router();
var Page = require('../models').Page;

/* GET home page. */
router.get('/', function(req, res, next) {
  Page.find().exec().then(function(pages){
    res.render('index', { pages: pages });
  }).catch(next);
});

module.exports = router;
