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
, function respond(req, res, next ) {
    var feedback = new Feedback(req.body);

    feedback.project = req.project.id;
    feedback.build = req.build.id;

    feedback.save(function(err){
      console.log(err)
      if (err) return next(err)

      res.send(200, { message: 'OK' });
    })
  }]
