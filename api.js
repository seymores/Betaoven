const restify = require('restify')
    , api = restify.createServer()
    , middlewares = require('./middlewares')
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

api.use(middlewares.bodyParser());
api.use(middlewares.auth());


api.get('/token', users.token)
api.post('/letmein', users.letmein)
api.post('/auth', users.auth)

api.get('/projects', projects.list)
api.post('/projects', projects.create)
api.get('/projects/:project_id', projects.get)
api.get('/projects/invite', projects.invite)

api.post('/project/:pid/builds/', builds.create)
api.post('/builds/', builds.create)
api.get('/builds/:build_id', builds.get)

!module.parent
  && api.listen(PORT)
  && console.log('API listening at port ' + PORT)