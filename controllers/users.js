const User = require('../models/user');

module.exports = {
  index,
  privateView
}

function index(req, res) {
  console.log(req.user);
  User.find({}, function(err, foundUsers) {
    res.render('index', {
      foundUsers,
      user: req.user,
      title: 'Welcome to OAuth'
    });
  });
}

function privateView(req, res) {
  res.send("You found something private.");
}