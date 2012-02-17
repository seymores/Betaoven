
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , middlewares = require('./middlewares')
  , config = require('./config')
  ;

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
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

// Routes

app.get('/', routes.index);
app.get('/project', routes.project);
app.get('/dashboard', routes.dashboard);
app.post('/upload', routes.upload);


!module.parent
  && app.listen(config.site.port)
  && console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
