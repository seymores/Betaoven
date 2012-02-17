var models = require('../models')
  , Project = models.Project
  , Invite = models.Invite
  ;



/**
 * GET /projects
 *
 * List all projects
 */

exports.list = function(req, res) {

  res.render('projects/list', {
      title: 'List all projects'
  })
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
 * GET /project/<ID>
 *
 * Get project details
 */

exports.show = function(req, res) {

  res.render('projects/show', {
      title: 'Show project'
  });
}


/**
 * POST /project/<ID>/invite
 *
 * Invite user to a project
 */

exports.invite = function(req, res) {

  res.redirect('projects');
}