const db = require('../db')
    , Schema = require('mongoose').Schema
    , ObjectId = Schema.ObjectId
    ;


var Build = new Schema({
    version_code: {
        type: String
      , required: true
      , trim: true
    }
  , version_label: {
        type: String
      , required: true
      , trim: true
    }
  , path: {
        type: String
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


var Model
  = module.exports
  = db.model('Build', Build);