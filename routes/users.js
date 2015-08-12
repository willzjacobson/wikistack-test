'use strict';
var express = require('express');
var router = express.Router();
var User = require('../models').User;
var Page = require('../models').Page;
var Promise = require('bluebird');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find().exec().then(function(users){
    res.render('users', { users: users });
  }).catch(next);
});

router.get('/:id', function(req, res, next){
  var userPromise = User.findById(req.params.id).exec();
  var pagesPromise = Page.find({ author: req.params.id }).exec();
  Promise.join(userPromise, pagesPromise, function(user, pages){
    res.render('user', { user: user, pages: pages });
  }).catch(next);
});

module.exports = router;
