var models = require('../models')
  , Token = models.Token
  , User = models.User;

module.exports = function(options){
  
  
  return function(req, res, next){
    var token = req.query.token;

    if (!token) {
      req.authenticated = false;
      req.authToken = null;
      req.user = null;
      
      next()
    } else
      Token.findByToken(token, function(err, token){
        if (err) return next(err)

        req.authenticated = token && token.token ? true : false;
        req.authToken = token.token;

        User.findByEmail(token.email, function(err, user){
          if (err)
            next(err)
          else {
            req.user = user
            next()
          }
        })
      })
  }
}