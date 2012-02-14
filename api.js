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

api.use(restify.queryParser({ mapParams: false }))
api.use(restify.bodyParser({ mapParams: false }))

api.post('/letmein', users.letmein)

api.post('/projects', projects.create)
api.get('/projects/:project_id', projects.get)
api.get('/projects/invite', projects.invite)

api.post('/builds/', builds.create)
api.get('/builds/:build_id', builds.get)

!module.parent
  && api.listen(PORT)
  && console.log('API listening at port ' + PORT)