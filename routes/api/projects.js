const models = require('../../models')
    , Project = models.Project
    , Invite = models.Invite
    ;

/**
 * Getting project info
 *
 * @param {UUID} project_id
 * @returns
 *  {UUID}    project_id
 *  {String}  project_name
 *  {String}  project_desc
 *  {UUID}    owner_id
 *  {UUID}    owner_display_name
 *  {Array}   builds
 * @api public
 */

exports.get = function(req, res) {
  res.send(200, { message: 'Not Implemented' })
}


/**
 * Adding new Project
 *
 * @param {String} project_name
 * @param {String} project_desc (optional)
 * @param {UUID} owner_id
 * @returns
 *  {Boolean} success
 *  {String}  message Mandatory if failed
 * @api public
 */

exports.index = function(req, res) {
  res.send(200, { message: 'Not Implemented' })
}


/**
 * Invite collaborators to project
 *
 * @method POST
 * @param {UUID} project_id
 * @param {Email} email
 * @returns
 *  {Boolean} success
 *  {String}  message Mandatory if failed
 * @api public
 */

exports.invite = function(req, res) {
  res.send(200, { message: 'Not Implemented' })
}