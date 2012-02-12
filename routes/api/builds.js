const Build = require('../../models/build')


/**
 * Handle upload of new build
 *
 * @method POST
 * @param {UUID} project_id
 * @param {File} upload_file
 * @returns
 *  {UUID} build_id Set on successful
 *  {Boolean} success true if success, false if fail
 * @api public
 *
 */

exports.create = function(req, res) {
  res.send(200, { message: 'Not Implemented' })
}


/**
 * Getting build info
 *
 * @method GET
 * @param {UUID} build_id
 * @returns
 *  {UUID}    build_id
 *  {String}  desc
 *  {String}  version_code
 *  {String}  version_label
 *  {Array}   voting
 *  {Array}   feedbacks
 * @api public
 */

exports.get = function(req, res) {
  res.send(200, { message: 'Not Implemented' })
}