'use strict';
var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', function(req, res) {
  res.redirect('/');
});

router.get('/add', function(req, res) {
  res.render('addpage');
});

// // manual version
// router.get('/:urlTitle', function (req, res, next) {
//   var page;
//   Page.findOne({ urlTitle: req.params.urlTitle }).exec().then(function(foundPage){
//     page = foundPage;
//     return User.findById(foundPage.author).exec();
//   }).then(function(author){
//     res.render('wikipage', { page: page, author: author });
//   }).catch(next);
// });

router.get('/:urlTitle', function (req, res, next) {
  Page.findOne({ urlTitle: req.params.urlTitle }).populate('author').exec()
  .then(function(foundPage){
    res.render('wikipage', { page: foundPage, author: foundPage.author });
  }).catch(next);
});

router.post('/', function(req, res, next) {
  var page = new Page({
    title:   req.body.title,
    content: req.body.content
  });
  User.findOrCreate(req.body).then(function (user) {
    page.author = user._id;
    return page.save();
  }).then(function (savedPage) {
    console.log(savedPage);
    res.redirect(savedPage.route);
  }).catch(next);
});

module.exports = router;
