const models = require('../models')
    , User = models.User
    , Project = models.Project
    , Build = models.Build
    , db = require('../db')
    ;

var users = []
  , projects = []
  , builds = [];


addUsers();


function addUsers(){
  var sets = 20
    , n = sets
    , completed = 0
    , name
    ;

  users[0] = new User({
      email: 'shiawuen@gmail.com'
    , username: 'shiawuen'
    , display_name: 'shiawuen'
    , password: 'b@ta0ven'
  })

  users[1] = new User({
      email: 'anonymous@betaoven.com'
    , username: 'anonymous'
    , display_name: 'anonymous'
    , password: 'b@ta0ven'
  });

  sets += 2;

  for (;n;){
    name = 'user'+(n--)
    users.push(new User({
        email: name+'@betaoven.com'
      , username: name
      , display_name: name
      , password: 'b@ta0ven'
    }))
  }

  User.remove(function(){
    console.log('Removed all users')
    users.forEach(function(user){
      user.save(function(){
        ++completed === sets && addProjects()
      })
    })
  })
}

function addProjects(){
  var completed = 0
    , sets = 0
    ;

  projects[0] = new Project({
      name: 'Betaoven'
    , description: 'The official baker'
    , admins: [users[1]]
    , collaborators: [users[1]]
  });

  sets += 1;

  Project.remove(function(){
    console.log('Removed all projects')
    projects.forEach(function(project){
      project.save(function(err){
        ++completed === sets && addBuilds()
      })
    })
  })
}


function addBuilds(){
  Build.remove(function(){
    console.log('Removed all builds')
    db.disconnect();
  })
}