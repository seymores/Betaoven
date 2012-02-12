const User = require('../models/user')
    , Project = require('../models/project')
    , Invite = require('../models/invite')
    ;

var user
    = exports.user
    = { email: 'hello@betaoven.com', display_name: 'oven'}

  , feedback
    = exports.feedback
    = { by: new User(user), details: 'meow~' }

  , project
    = exports.project
    = {
        name: 'betaoven'
      , owner: new User(user)
      , description: 'Oven to cook android app'
    }

  , invite
    = exports.invite
    = {
        email: 'invite@betaoven.com'
      , project: new Project(project)
      , from: new User(user)
      , message: 'Welcome to betaoven!'
    }
  ;