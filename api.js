const restify = require('restify')
    , api = restify.createServer()
    , PORT = 3000

/**
 * Routes
 */

const users = require('./routes/api/users')
    , projects = require('./routes/api/projects')
    , builds = require('./routes/api/builds')
    ;


module.exports = api;

api.get('/letmein', users.letmein)

api.get('/projects', projects.index)
api.get('/projects/:project_id', projects.get)
api.get('/projects/invite', projects.invite)

api.get('/builds/', builds.index)
api.get('/builds/:build_id', builds.get)

!module.parent
  && api.listen(PORT)
  && console.log('API listening at port ' + PORT)