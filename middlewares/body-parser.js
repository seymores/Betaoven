var formidable = require('formidable');

module.exports = function(options){

  return function(req, res, next){
    var pttrn = /multipart\/form-data/gi
      , isMultipart = pttrn.test(req.header('content-type'))
      , form;

    if (!isMultipart) return next();

    form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
      if (err) return next(err)

      req.body = fields || {};
      req.file = files || {};

      next()
    })
  }
}