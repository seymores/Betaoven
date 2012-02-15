const db = require('../db')
    , plugins = require('./plugins')
    , Schema = require('mongoose').Schema
    , ObjectId = Schema.ObjectId
    ;


var Build = new Schema({
    project: {
        type: ObjectId
      , ref: 'Project'
      , required: true
    }
  , version_code: {
        type: String
      , trim: true
    }
  , version_label: {
        type: String
      , trim: true
    }
  , status: {
        type: String
      , default: 'pending'
    }
  , voting: [{
        type: ObjectId
      , ref: 'Voting'
    }]
  , feedbacks: [{
        type: ObjectId
      , ref: 'Feedback'
    }]
});


/**
 * Plugins
 */

Build.plugin(plugins.timestamp)


var Model
  = module.exports
  = db.model('Build', Build);