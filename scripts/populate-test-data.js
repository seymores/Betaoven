const models = require('../models')
    , User = models.User
    , db = require('../db')
    ;

var users = []
  , sets = 20
  , n = sets
  , completed = 0
  , name
  ;

users[0] = new User({
    email: 'shiawuen@gmail.com'
  , display_name: 'shiawuen'
  , password: 'b@ta0ven'
})

for (;n;){
  name = 'user'+(n--)
  users.push(new User({
      email: name+'@betaoven.com'
    , display_name: name
    , password: 'b@ta0ven'
  }))
}

User.remove(function(){
  users.forEach(function(user){
    user.save(function(){
      ++completed === sets && db.disconnect()
    })
  })
})
