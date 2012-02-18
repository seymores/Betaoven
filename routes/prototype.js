var fs = require('fs');

var config = require('../config')
  , models = require('../models')
  , User = models.User
  , Project = models.Project
  , Build = models.Build
  , Feedback = models.Feedback
  , Download = models.Download
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