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
api.get('/project/:pid', projects.get)
api.get('/project/:pid/invite', projects.invite)

api.get('/project/:pid/builds', builds.list)
api.post('/project/:pid/builds', builds.create)
api.get('/project/:pid/build/:bid', builds.get)

!module.parent
  && api.listen(PORT)
  && console.log('API listening at port ' + PORT)
