var fs = require('fs');

var config = require('../config')
  , models = require('../models')
  , User = models.User
  , Project = models.Project
  , Build = models.Build
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
    , project = req.project;

  build.size = apkfile.size;
  build.filename = apkfile.name;

  if (build.project)
    Project.findById(build.project, function(err, doc){
      if (err) return next(err);

      project = doc;
      saveBuild()
    })
  else {
    project = new Project()
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

  if (!token) return next();

  Project.findById(token, function(err, project){
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

  Build.findById(bid, function(err, build){
    if (err) return next(err);

    res.local('build', build);
    res.build = build;
    next();
  })
}


exports.loadBuilds = function(req, res, next) {
  var project = req.project, q;

  q = Build.find({ project: project.id });
  q.populate('voting')
  q.sort('createdAt', -1)

  q.exec(function(err, builds){
    if (err) return next(err);

    res.local('builds', builds);
    req.builds = builds;

    next();
  })

}


exports.projects = function(req, res) {

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
      title: 'Show Build'
  });
}


exports.download = function(req, res) {


  res.send('Sending file.........never....');
}