var models = require('../../models')
  , Feedback = models.Feedback
  , Build = models.Build
  , Project = models.Project
  ;


exports.list = function(req, res, next) {
  var q = Feedback.find()

  q.populate('build')
  q.populate('project')

  q.sort('createdAt', -1)

  q.exec(function(err, feedbacks){
    if (err) return next(err);

    res.send(200, feedbacks);
  })
}


exports.create = [
  function loadProject(req, res, next) {
    Project.findById(req.params.pid, function(err, project){
      if (err) return next(err);

      if (!project)
        res.send(404, { error: 'Not found' })
      else {
        req.project = project;
        next();
      }
    })
  }
, function loadBuild(req, res, next) {
    Build.findOne({
        project: req.project.id
      , _id: req.params.bid }
    , function(err, build){
        if (err) return next(err);

        if (!build)
          res.send(404, { error: 'Not found' })
        else {
          req.build = build;
          next();
        }
      })
  }
, function savingFeedback(req, res, next ) {
    var feedback = new Feedback(req.body);

    feedback.project = req.project.id;
    feedback.build = req.build.id;

    feedback.save(function(err){
      if (err) return next(err)

      req.feedback = feedback;
      next()
    })
  }
, function pushFeedbackToBuild(req, res, next){
    req.build.feedbacks.push(req.feedback);
    req.build.save(function(err){
      if (err) return next(err);

      next()
    })
  }
, function respond(req, res){
    res.send(200, { message: 'OK' });
  }]


exports.update = [
  function loadProject(req, res, next) {
    Project.findById(req.params.pid, function(err, project){
      if (err) return next(err);

      if (!project)
        res.send(404, { error: 'Not found' })
      else {
        req.project = project;
        next();
      }
    })
  }
, function loadBuild(req, res, next) {
    Build.findOne({
        project: req.project.id
      , _id: req.params.bid }
    , function(err, build){
        if (err) return next(err);

        if (!build)
          res.send(404, { error: 'Not found' })
        else {
          req.build = build;
          next();
        }
      })
  }
, function loadFeedback(req, res, next) {
    Feedback.findOne({
        project: req.project._id
      , build: req.build._id
      , _id: req.params.fid
    }, function(err, feedback){
      if (err) return next(err);

      req.feedback = feedback;
      next();
    })
  }
, function saving(req, res, next){
    var f = req.feedback
      , data = req.body;

    f.point = data.point;
    f.details = data.details;
    f.deviceInfo = data.deviceInfo;

    f.save(function(err){
      if (err) return next(err);

      res.send(200, { message: 'OK' })
    })
  }]