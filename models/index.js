'use strict';
var marked = require('marked');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/wikistack');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var statuses = ['open', 'closed'];

var pageSchema = new mongoose.Schema({
  title:    {type: String, required: true},
  urlTitle: {type: String, required: true},
  content:  {type: String, required: true},
  status:   {type: String, enum: statuses},
  date:     {type: Date, default: Date.now },
  author:   {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

pageSchema.virtual('route').get(function(){
  return '/wiki/' + this.urlTitle;
});

pageSchema.virtual('renderedContent').get(function(){
  var doubleBracketTags = /\[\[(.*?)\]\]/g;
  var renderedContent = this.content.replace(doubleBracketTags, replacer);
  function replacer(match, innerText) {
    return '<a href="/wiki/' + generateUrlTitle(innerText) + '">' + innerText + '</a>';
  }
  return marked(renderedContent);
});

function generateUrlTitle (title) {
  if (typeof title !== 'undefined' && title !== '') {
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
  } else return Math.random().toString(36).substring(2, 7);
}

// made this a static so I could easily require it in an optional filter
pageSchema.statics.generateUrlTitle = generateUrlTitle;

pageSchema.pre('validate', function(next) {
  this.urlTitle = generateUrlTitle(this.title);
  next();
});

var userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true}
});

userSchema.statics.findOrCreate = function (props) {
  var self = this;
  return self.findOne({email: props.email}).exec().then(function(user){
    if (user) return user;
    else return self.create({
      email: props.email,
      name:  props.name
    });
  });
};

// callback version
// userSchema.statics.findOrCreate = function (props, cb) {
//   var self = this;
//   self.findOne({ email: props.email }).exec(function(err, user){
//     if (err) cb(err);
//     else if (user) cb(null, user);
//     else {
//       self.create({
//         email: props.email,
//         name:  props.email
//       }, cb);
//     }
//   });
// };

var Page = mongoose.model('Page', pageSchema);
var User = mongoose.model('User', userSchema);

module.exports = {
  Page: Page,
  User: User
};
