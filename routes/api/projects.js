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
 * { projects: [
 *    { projectId: ID, projectName
 * ]}
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

exports.list = function(req, res, next) {
  Project.list({
      sort: 'createdAt'
    , page: 0 // not implemented
    , perPage: 10 // not implemented
  }, function(err, projects){
    if (err) return next(err);

    res.send(200, projects)
  })
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
  var data = req.body
    , project;

  // Prevent injecting data
  delete data.owner;
  delete data.build;
  delete data.admins;

  data.owner = req.user.id;

  project = new Project(data);
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

exports.invite = function respond(){
  var data = req.body,
    invite;

  if (!req.authenticated)
    return res.send(200, { error: 'Not authenticated' })

  data.project = req.pid;
  invite = new Invite(data);

  invite.save(function(err){
    if (err) return next(err);

    res.send(200, { message: 'Invitation sent' })
  })
};