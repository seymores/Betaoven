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
  , filename: String
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


Build
  .virtual('disapproved')
  .get(function() {
    var feedbacks = this.feedbacks;
    var up = [];

    feedbacks.forEach(function(f){
      if (f.point < 0)
        up[up.length] = f;
    })

    return up;
  })


Build
  .virtual('approved')
  .get(function() {
    var feedbacks = this.feedbacks;
    var down = [];

    feedbacks.forEach(function(f){
      if (f.point > 0)
        down[down.length] = f;
    })

    return down;
  })


Build
  .virtual('numDisapproved')
  .get(function() {
    return this.disapproved.length || 0;
  })


Build
  .virtual('numApproved')
  .get(function() {
    return this.approved.length || 0;
  })


Build
  .virtual('numDownloads')
  .get(function() {
    return this.downloads.length || 0;
  })


Build
  .virtual('numNoFeedback')
  .get(function() {
    var nd = this.downloads.length || 0
      , nf = this.feedbacks.length || 0
    return nd - nf;
  })


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