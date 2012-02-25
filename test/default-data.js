const User = require('../models/user')
    , Project = require('../models/project')
    , Invite = require('../models/invite')
    , Build = require('../models/build')
    ;

var user
    = exports.user
    = function(){
      return {
          email: 'hello@betaoven.com'
        , username: 'betaoven'
        , display_name: 'oven'
        , password: 'b@ta0ven'
      }
    }

  , project
    = exports.project
    = function(){
      return {
          name: 'betaoven'
        , owner: new User(user())
        , description: 'Oven to cook android app'
      }
    }

  , invite
    = exports.invite
    = function(){
      return {
          email: 'invite@betaoven.com'
        , project: new Project(project())
        , from: new User(user())
        , details: 'Welcome to betaoven!'
      }
    }

  , build
    = exports.build
    = function(){
      return {
          project: new Project(project())
        , version_code: '0.0.1'
        , version_label: 'dev'
        , path: 'path/to/build/file'
      }
    }

  , feedback
    = exports.feedback
    = function(){
      return {
          by: new User(user())
        , project: new Project(project())
        , build: new Build(build())
        , details: 'meow~'
        , deviceInfo: 'Android 2.3.5, etc, etc'
      }
    }
    
  , vote
    = exports.vote
    = function(){
      return {
          by: new User(user())
        , build: new Build(build())
      }
    }
  , download
    = exports.download
    = function(){
      return {
          by: new User(user())
        , build: new Build(build())
      }
    }
  ;