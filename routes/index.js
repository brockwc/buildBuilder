const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/users');

/* GET home page. */
router.get('/', usersController.index);
router.get('/private', isLoggedIn, usersController.privateView);

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route
router.get('/buildBuilderOAuth', passport.authenticate(
  'google',
  {
    successRedirect: '/',
    failureRedirect: '/'
  }
));

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/')
});

// Helper function for protecting pages
function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;
