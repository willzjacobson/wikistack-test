var Promise = require('bluebird'),
    models = require('./models'),
    db = require('mongoose').connection,
    Page = models.Page,
    User = models.User;


var counter = 0,
    firstNames = ['Gabriel', 'Omri', 'Gaby', 'Nimit', 'Zeke', 'David', 'Joe', 'Scott', 'Charlotte', 'Liz', 'Mark', 'Shanna', 'Eric', 'Alex'],
    lastNames = ['Lebec', 'Bernstein', 'Medina', 'Maru', 'Nierenberg', 'Alves', 'D\'Alessdandro', 'Leasia', 'Livi', 'Davis', 'Gregory', 'Katz', 'Castillo'],
    domains = ['gmail.com', 'aol.com', 'hotmail.com', 'msn.com', 'fullstackacademy.com', 'myspace.com', 'facebook.com', 'netscape.com'],
    adverbs = ['Superbly', 'Amazingly', 'Disappointingly', 'Remarkably', 'Concerningly', 'Bizarrely', 'Oddly', 'Satisfyingly', 'Alarmingly', 'Quizzically', 'Truthfully', 'Undoubtably'],
    adjectives = ['Cool', 'Harsh', 'Wild', 'Smooth', 'Weird', 'Difficult', 'Easy', 'Bumpy', 'Colorful', 'Textured', 'Warm', 'Cold', 'Balanced', 'Wobbly'],
    nouns = ['JavaScript', 'Haskell', 'Lisp', 'Clojure', 'Scheme', 'HTML', 'CSS', 'HotSeat', 'Cohort', 'CodeWar', 'Hobbies', 'Hardware', 'Software'];

function choose(arr){
  return arr[Math.floor(Math.random() * arr.length)];
}

db.db.dropDatabase(function(err){

  users = [];

  for (var i = 0; i < 20; i++) {
    var user = User.create({});
    users.push()
  }

});

