const restify = require('restify')
    , api = restify.createServer()
    , middlewares = require('./middlewares')
    , config = require('./config')

/**
 * Routes
 */

const users = require('./routes/api/users')
    , projects = require('./routes/api/projects')
    , builds = require('./routes/api/builds')
    , feedbacks = require('./routes/api/feedbacks')
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

api.get('/project/:pid/build/:bid/feedbacks', feedbacks.list)
api.post('/project/:pid/build/:bid/feedbacks', feedbacks.create)

!module.parent
  && api.listen(config.site.port)
  && console.log('API listening at port ' + config.site.port)
