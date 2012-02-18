
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes/prototype')
  , middlewares = require('./middlewares')
  , config = require('./config')
  , ejs = require('ejs')
  ;

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');

  app.use(express.bodyParser());
  app.use(express.methodOverride());

  app.use(express.cookieParser());
  app.use(express.session({ secret: config.session.secret }))

  app.use(middlewares.mobileDetector());

  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});


app.helpers({
    site: {
        name: 'AndroidRocket'
      , desc: 'Deploy & Distribute Immediately'
    }
});

// Routes

//app.get('/', routes.index);
app.get('/projects', routes.projects);
app.get(
    '/project/:pid'
  , routes.loadProject
  , routes.loadBuilds
  , routes.project
);
app.get(
    '/project/:pid/:bid'
  , routes.loadProject
  , routes.loadBuild
  , routes.loadFeedbacks
  , routes.build
);
app.get(
    '/project/:pid/:bid/download'
  , routes.loadProject
  , routes.loadBuild
  , routes.download
);

//app.get('/dashboard', routes.dashboard);

app.get('/upload/:pid', routes.loadProject, routes.upload);
app.get('/upload', routes.upload);
app.post('/upload', routes.handleUpload)




!module.parent
  && app.listen(config.site.port)
  && console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
