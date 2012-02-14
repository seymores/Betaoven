const db = require('../db')
    , plugins = require('./plugins')
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
    , ref: 'User'
    , required: true
  }
  , admins: [{
      type: ObjectId
    , ref: 'User'
  }]
  , builds: [{
      type: ObjectId
    , ref: 'Build'
  }]
  , private: {
      type: Boolean
    , default: false
  }
})


Project
  .pre('save', function(next) {
    if (this.isNew && this.owner)
      this.admins.push(this.owner)

    next()
  })



/**
 * Plugins
 */

Project.plugin(plugins.timestamp)


var Model
  = module.exports
  = db.model('Project', Project);