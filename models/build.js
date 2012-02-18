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
  , size: Number
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
  , voting: [{
        type: ObjectId
      , ref: 'Voting'
    }]
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
  .virtual('upVotes')
  .get(function() {
    var votings = this.voting;
    var up = [];

    votings.forEach(function(v){
      if (v.point > 0)
        up[up.length] = v;
    })

    return up;
  })


Build
  .virtual('downVotes')
  .get(function() {
    var votings = this.voting;
    var down = [];

    votings.forEach(function(v){
      if (v.point < 0)
        down[down.length] = v;
    })

    return down;
  })


/**
 * Plugins
 */

Build.plugin(plugins.timestamp)


var Model
  = module.exports
  = db.model('Build', Build);