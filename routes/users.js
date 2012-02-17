var models = require('../models')
  , User = models.User
  , Invite = models.Invite
  ;


/**
 * POST /register
 */

exports.processRegister = function(req, res) {

  res.redirect('dashboard')
}


/**
 * GET /register
 */

exports.register = function(req, res) {

  res.render('users/register', {
      title: 'Register'
  });
}


/**
 * POST /login
 */

exports.processLogin = function(req, res) {

  res.redirect('dashboard')
}


/**
 * GET /login
 */

exports.login = function(req, res) {

  res.render('users/login', {
      title: 'Login'
  });
}


/**
 * GET /dashboard
 */

exports.dashboard = function(req, res) {

  res.render('dashboad', {
      title: 'Dashboard'
  });
}