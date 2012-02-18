const db = require('../db')
    , plugins = require('./plugins')
    , Schema = require('mongoose').Schema
    , ObjectId = Schema.ObjectId
    ;


var Download = new Schema({
    build: { type: ObjectId, ref: 'Build' }
  , by: { type: ObjectId, ref: 'User' }
});


/**
 * Plugins
 */

Download.plugin(plugins.timestamp)


var Model
  = module.exports
  = db.model('Download', Download);