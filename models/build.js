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
  , filename: {
        type: String
      , default: 'untitled.apk'
    }
  , size: {
        type: Number
      , default: 0
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
  , changelog: {
      type: String
    , trim: true
  }
  , feedbacks: [{
        type: ObjectId
      , ref: 'Feedback'
    }]
  , downloads: [{
        type: ObjectId
      , ref: 'Download'
    }]
});


var sizes = {
    b: 1
  , kb: 1024
  , mb: 1024000
  , gb: 1024000000
}
Build
  .virtual('prettySize')
  .get(function() {
    var size = this.size
      , unit = this.size > 1024000000
        ? 'gb'
        : this.size > 1024000
        ? 'mb'
        : this.size > 1024
        ? 'kb'
        : 'b';

    return Math.round(size / sizes[unit]) + (size % sizes[unit]) + unit;
  })


/**
 * Plugins
 */

Build.plugin(plugins.timestamp)


var Model
  = module.exports
  = db.model('Build', Build);