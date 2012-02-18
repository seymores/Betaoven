
/**
 * Module dependencies.
 */

var express = require('express')
  , config = require('./config')
  ;

var app = module.exports = express.createServer();

//app.use(express.vhost(config.site.api, require('./api').server));

app.use('/api', require('./api').server);
app.use('/', require('./app'));

app.listen(config.site.port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);