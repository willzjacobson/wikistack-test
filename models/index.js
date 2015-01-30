var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/wikistack');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var Page, User;
var Schema = mongoose.Schema;

var pageSchema = new Schema({
  title: { type: String, required: true },
  url_name: String,
  owner_id:   String,
  body:   { type: String, required: true },
  date: { type: Date, default: Date.now },
  status: Number
});

pageSchema.virtual('full_route').get(function() {
	return "/wiki/" + this.url_name;
})

var userSchema = new Schema({
  name:  {
      first: { type: String, required: true },
      last: { type: String, required: true }
    },
  email: { type: String, required: true }
});

Page = mongoose.model('Page', pageSchema);
User = mongoose.model('User', userSchema);

module.exports = {
	Page: Page, 
	User: User
};