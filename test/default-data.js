const User = require('../models/user')
    ;

var user 
    = exports.user 
    = { email: 'hello@betaoven.com', display_name: 'oven'}

  , feedback
    = exports.feedback
    = { by: new User(user), details: 'meow~' }
  ;