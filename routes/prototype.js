var fs = require('fs');

var config = require('../config')
  , models = require('../models')
  , User = models.User
  , Project = models.Project
  , Build = models.Build
  , Feedback = models.Feedback
  , Download = models.Download
  , Token = models.Token
  ;


exports.upload = function(req, res) {
  var project = req.project

  res.render('builds/new', {
      title: 'New apk file upload'
    , project: project
  })
}


exports.handleUpload = function(req, res, next) {
  var apkfile = req.files.apkfile
    , build = new Build(req.body)
    , newPath = config.upload.dest + '/' + build.id
    , id = build.id
    , project = req.project
    , projectName;

  build.size = apkfile.size;
  build.filename = apkfile.name;

  projectName = apkfile.name.split(/[-_\.]/);
  delete projectName[projectName.length-1];

  if (build.project)
    Project.findById(build.project, function(err, doc){
      if (err) return next(err);

      project = doc;
      saveBuild()
    })
  else {
    project = new Project()
    project.name = projectName.join(' ')
    project.owner = req.user.id;
    project.save(function(err){
      if (err) return next(err);

      build.project =  project.id
      saveBuild()
    })
  }

  function saveBuild(){
    build.save(function(err){
      if (err) return next(err);

      project.builds.push(build.id)
      project.save(function(err){
        if (err) return next(err);

        fs.rename(apkfile.path, newPath, function(err){
          if (err) return next(err);

          res.redirect('/project/' + build.project);
        })
      })
    });
  }
}


exports.loadProject = function(req, res, next) {
  var token = req.params.pid
    , q

  if (!token) return next();

  q = Project.findById(token)

  q.exec(function(err, project){
    if (err) return next();

    if (!project)
      return next()
    else {
      res.local('project', project);
      req.project = project;
      next();
    }
  })
}


exports.loadBuild = function(req, res, next) {
  var bid = req.params.bid;
  var q = Build.findById(bid)

  q.populate('downloads')

  q.exec(function(err, build){
    if (err) return next(err);

    req.build = build;
    res.local('build', build);
    next();
  })
}


exports.loadBuilds = function(req, res, next) {
  var project = req.project, q;

  q = Build.find({ project: project.id });
  q.populate('feedbacks')
  q.sort('createdAt', -1)

  q.exec(function(err, builds){
    if (err) return next(err);

    res.local('builds', builds);
    req.builds = builds;

    next();
  })

}


exports.loadFeedbacks = function(req, res, next) {
  var q = Feedback.find({ build: req.build.id});

  q.populate('by')

  q.exec(function(err, feedbacks){
    if (err) return next(err);

    req.feedbacks = feedbacks;
    res.local('feedbacks', feedbacks);
    next()
  });
}


exports.projects = function(req, res) {
  var q = Project.find();

  q.populate('builds')

  q.exec(function(err, projects){
    if (err) return next(err);

    res.render('projects/list', {
        title: 'All projects'
      , projects: projects
    });
  })
}


exports.project = function(req, res) {
  var project = req.project;

  if (!project) return next();

  res.render('projects/show', {
      title: project.name || 'Untitled project'
    , description: project.description || '&nbsp;'
  })
}


exports.projectEdit = function(req, res) {
  
  res.render('projects/edit', {
      title: 'Edit project'
  });
}


exports.processProjectEdit = function(req, res) {
  
}


exports.build = function(req, res) {
  res.render('builds/show', {
      title: req.build.filename
  });
}


exports.download = function(req, res, next) {
  var download = new Download()
    , build = req.build
    , buildPath = config.upload.dest + '/' + build._id;

  download.build = build;
  download.save(function(err){
    if (err) return next(err);

    res.download(buildPath, build.filename);
  })
}


exports.login = function(req, res) {
  res.render('users/login', {
      title: 'Login'
  });
}


exports.processLogin = function(req, res, next) {
  var token;

  User.auth(req.body, function(err, user){
    if (err) return next()

    if (!user) {
      // handle this later...
      next(Error('We don&rsquo;t validate at the moment...'))
    } else {
      token = new Token({ email: user.email })
      token.save(function(err){
        if (err) return next(err);

        req.session.token = token.token;
        res.redirect('dashboard');
      })
    }
  })
}


exports.register = function(req, res) {
  res.render('users/register', {
      title: 'Register'
  });
}


exports.processRegister = function(req, res) {
  var user = new User(req.body)
    , token;

  user.save(function(err){
    if (err) return next(err);

    token = new Token({ email: user.email })
    token.save(function(err){
      if (err) return next(err)

      req.session.token = token.token;
      res.redirect('dashboard')
    })
  })
}


exports.dashboard = function(req, res) {
  res.render('users/dashboard', {
      title: 'Dashboard'
  });
}

exports.logout = function(req, res, next) {
  if (!req.session.token)
    return res.redirect('home');

  var q = Token.findOne({ token: req.session.token })

  q.exec(function(err, token){
    if (err) return next(err)

    token.remove(function(err){
      if (err) return next(err)

      delete req.session.token;
      res.redirect('/login');
    })
  })
}

exports.goHomeIfAuthenticated = function(req, res, next) {
  if (req.session.token)
    return res.redirect('dashboard')

  next()
}


exports.auth = function(req, res, next) {
  var token = req.session.token;

  if (!token) {
    req.authenticated = false;
    req.authToken = null;
    req.user = null;

    next()
  } else
    Token.findByToken(token, function(err, token){
      if (err) return next(err)

      if (!token) return next();

      req.authenticated = token && token.token ? true : false;
      req.authToken = token.token;

      User.findByEmail(token.email, function(err, user){
        if (err)
          next(err)
        else {
          if (!user) return next();

          req.user = user
          next()
        }
      })
    })
}