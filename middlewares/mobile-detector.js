
module.exports = function(options){
  var pattern = /Mobile Safari|Fennec|Opera Mobi/;

  return function(req, res, next){
    req.isMobile = pattern.test(req.headers['user-agent'])

    next()
  }
}