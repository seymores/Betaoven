const User = require('../models/user')
    , Project = require('../models/project')
    , Invite = require('../models/invite')
    ;

var user
    = exports.user
    = function(){
      return { email: 'hello@betaoven.com', display_name: 'oven'}
    }

  , feedback
    = exports.feedback
    = function(){
      return { by: new User(user()), details: 'meow~' }
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
  ;