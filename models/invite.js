const db = require('../db')
    , Schema = require('mongoose').Schema
    , ObjectId = Schema.ObjectId
    ;


var Invite = new Schema({
    email: {
        type: String
      , required: true
      , trim: true
    }
  , project: {
        type: ObjectId
      , ref: 'Project'
      , required: true
    }
  , from: {
        type: ObjectId
      , ref: 'User'
      , required: true
    }
  , details: {
        type: String
      , trim: true
    }
})


var Model
  = module.exports
  = db.model('Invite', Invite)