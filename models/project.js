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
 * Static Methods
 */

Project
  .statics
  .list = function(options, next) {
    var q = Model.find();

    if (typeof options === 'function') {
      next = options;
      options = {};
    }

    options.filter && Object.keys(options.filter)
      .forEach(function(key){
        q.where(key, options.filter[key]);
      })

    options.sort && options.sort
      .split(',')
      .forEach(function(v){
        var sort = v.trim().split('.')
          , order = sort[1] === 'desc' ? -1 : 1;

        q.sort(sort[0], order);
      });

    next && q.exec(next)

    return q
  }


/**
 * Plugins
 */

Project.plugin(plugins.timestamp)


var Model
  = module.exports
  = db.model('Project', Project);