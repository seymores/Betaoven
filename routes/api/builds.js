const models = require('../../models')
    , Build = models.Build
    , Project = models.Project
    , fs = require('fs')
    , config = require('../../config/upload');


/**
 * Handle upload of new build
 *
 * @method POST
 * @param {UUID} project_id
 * @param {File} upload_file
 * @returns
 *  {UUID} build_id Set on successful
 *  {Boolean} success true if success, false if fail
 * @api public
 *
 */

exports.create = [
  function loadProject(req, res, next) {
    var pid = req.params.pid;

    if (!pid)
      return res.send(200, { error: 'Missing pid' })

    Project.findById(pid, function(err, project){
      if (err) return next(err);

      if (!project)
        res.send(200, { error: 'Project not belongs to you' })
      else {
        req.project = project;
        next()
      }
    })
  }
, function saveBuild(req, res, next){
    var build = new Build(req.body);

    build.project = req.project.id;
    build.save(function(err){
      if (err) return next(err);

      req.build = build;
      res.send(200, build)

      next()
    })
  }
, function moveFileToCorrectPath(req, res){
    var file = req.file.file
      , project = req.project
      , build = req.build
      , newPath = config.dest +'/'+ build.id;

    fs.unlink(newPath, function(err){

      // Should have better way to handle this
      // when file already exist then only we remove

      fs.mkdir(config.dest, function(err){

        // For now take it as we have rights to create
        // directory, come fix this later

        fs.rename(file.path, newPath, function(err){
          if (err)
            return console.log(err)

          build.path = newPath;
          build.save(function(err){
            if (err)
              return console.log(err)

            console.log('File moved to ' + newPath)
          })
        })
      })
    })

}]


/**
 * Getting build info
 *
 * @method GET
 * @param {UUID} build_id
 * @returns
 *  {UUID}    build_id
 *  {String}  desc
 *  {String}  version_code
 *  {String}  version_label
 *  {Array}   voting
 *  {Array}   feedbacks
 * @api public
 */

exports.get = function(req, res) {
  res.send(200, { message: 'Not Implemented' })
}