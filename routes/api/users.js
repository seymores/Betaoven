const models = require('../../models')
    , User = models.User
    , Token = models.Token
    ;

/**
 * Request access
 *
 * @method POST
 * @param {Email} email
 * @param {String} name
 * @returns
 *  {String} message
 * @api public
 */


exports.letmein = function(req, res) {
  res.send(200, { message: 'Not Implemented'})
}


exports.auth = function(req, res) {
  User.auth(req.body, function(err, user){
    var token;

    if (!user)
      res.send(200, { error: 'Not Authenticated' })
    else {
      token = new Token({ email: user.email })
      token.save(function(err){
        res.header('Location', '/token?token=' + token.token)
        res.send(302);
      })
    }
  })
}


exports.token = function(req, res) {
  Token.findByToken(req.query.token, function(err, token){
    if (err) return next(err);

    if (!token)
      res.send(200, { error: 'Invalid token' })
    else
      res.send(204)
  })
}