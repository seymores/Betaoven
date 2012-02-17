var models = require('../models')
  , Build = models.Build
  , Project = models.Project
  ;


/**
 * GET /project/<PID>/builds
 *
 * Get all builds for a project
 */

exports.list = function(req, res) {

  res.render('builds/list', {
      title: 'List all builds'
  });
}


/**
 * GET /project/<PID>/build/<BID>
 */

exports.show = function(req, res) {

  res.render('builds/show', {
      title: 'Display build info'
  });
}


/**
 * POST /project/<PID>/builds
 *
 * Process data and create new build
 */

exports.create = function(req, res) {

  res.redirect('projects')
}


/**
 * GET /project/<PID>/builds/new
 *
 * Creating new project
 */

exports.new = function(req, res) {

  res.render('builds/new', {
      title: 'Creating new build'
  });
}


/**
 * DELETE /project/<PID>/build/<BID>
 *
 * Delete a build
 */

exports.destroy = function(req, res) {

  res.redirect('builds')
}