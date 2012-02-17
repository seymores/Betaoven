var models = require('../models')
  , Project = models.Project
  , Invite = models.Invite
  ;


/**
 * GET /<USERNAME>
 *
 * User profile with projects of user have
 */

exports.list = function(req, res) {

  res.render('projects/list', {
      title: 'List all projects'
  })
}


/**
 * GET /<USERNAME>/<PID>
 *
 * Project info and list of all builds
 */

exports.show = function(req, res) {

  res.render('projects/show', {
      title: 'List all builds'
  });
}


/**
 * GET /projects/new
 */

exports.new = function(req, res) {

  res.render('projects/new', {
      title: 'Add new project'
  });
}


/**
 * POST /projects
 *
 * Creating new project
 */

exports.create = function(req, res) {

  res.redirect('projects')
}


/**
 * DELETE /project/<PID>
 *
 * Delete a project
 */

exports.destroy = function(req, res) {

  res.redirect('dashboard')
}


/**
 * POST /project/<ID>/invite
 *
 * Invite user to a project
 */

exports.invite = function(req, res) {

  res.redirect('projects');
}