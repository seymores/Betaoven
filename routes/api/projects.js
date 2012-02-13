const models = require('../../models')
    , Project = models.Project
    , Invite = models.Invite
    ;

/**
 * Getting project info
 *
 * @methohd GET
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
 * Listing all projects
 *
 * @method POST
 * @param {String} project_name
 * @param {String} project_desc (optional)
 * @param {UUID} owner_id
 * @returns
 *  {Boolean} success
 *  {String}  message Mandatory if failed
 * @api public
 */

exports.list = function(req, res) {
  res.send(200, { message: 'Not Implemented' })
}

/**
 * Adding new Project
 *
 * curl -i -d "name=betaoven&description=Oven+to+cook+android+app&owner=4f3913f3e1cba7f528000001" localhost:3000/projects
 *
 * @method POST
 * @param {String} project_name
 * @param {String} project_desc (optional)
 * @param {UUID} owner_id
 * @returns
 *  {Boolean} success
 *  {String}  message Mandatory if failed
 * @api public
 */

exports.create = function(req, res, next) {
  var project = new Project(req.body);

  project.save(function(err){
    if (err) return next(err)

    res.send(200, { project_id: project.id })
  })
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