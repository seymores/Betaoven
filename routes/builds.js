var models = require('../models')
  , Build = models.Build
  , Project = models.Project
  ;


/**
 * GET /<USERNAME>/<PID>/<BID>
 */

exports.show = function(req, res) {

  res.render('builds/show', {
      title: 'Display build info'
  });
}


/**
 *
 */

exports.new = function(req, res) {

  res.render('builds/new', {
      title: 'Adding new build'
  });
}


/**
 * POST /project/<PID>/builds
 *
 * Process data and create new build
 */

exports.create = function(req, res) {

  res.redirect('dashboard')
}


/**
 * DELETE /project/<PID>/build/<BID>
 *
 * Delete a build
 */

exports.destory = function(req, res) {

  res.redirect('dashboard')
}