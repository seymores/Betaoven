const db = require('../db')
    , Schema = require('mongoose').Schema
    , ObjectId = Schema.ObjectId
    ;


var Project = new Schema({
    name: {
      type: String
    , required: true
    , trim: true
  }
  , description: {
      type: String
    , trim: true
  }
  , owner: {
      type: ObjectId
    , ref: 'Owner'
    , required: true
  }
  , builds: [{
      type: ObjectId
    , ref: 'Build'
  }]
})


var Model
  = module.exports
  = db.model('Project', Project);