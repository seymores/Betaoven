const User = require('../../models').User
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