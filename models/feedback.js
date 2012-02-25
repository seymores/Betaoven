const db = require('../db')
    , plugins = require('./plugins')
    , Schema = require('mongoose').Schema
    , ObjectId = Schema.ObjectId
    ;


var Feedback = new Schema({
    by: {
        type: ObjectId
      , ref: 'User'
      , required: true
    }
  , build: {
        type: ObjectId
      , ref: 'Build'
      , required: true
    }
  , project: {
        type: ObjectId
      , ref: 'Project'
      , required: true
    }
  , point: {
        type: Number
      , required: true
      , default: 0
      , min: -1
      , max: 1
    }
  , details: {
        type: String
      , required: true
      , trim: true
    }
  , deviceInfo: {
        type: String
      , default: ''
    }
});


Feedback
  .virtual('approved')
  .get(function() {
    return this.point > 0;
  })


Feedback
  .statics
  .listApproved = function(buildId, next) {
    return listApprovedDisapproved(1, buildId, next);
  }


Feedback
  .statics
  .listDisapproved = function(buildId, next) {
    return listApprovedDisapproved(-1, buildId, next);
  }


function listApprovedDisapproved(point, buildId, next){
  var q = Model.find({ build: buildId, point: point })

  next && q.exec(next)

  return q;
}


/**
 * Plugins
 */

Feedback.plugin(plugins.timestamp)


var Model
  = module.exports
  = db.model('Feedback', Feedback);