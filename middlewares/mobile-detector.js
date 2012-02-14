
/**
 * Mobile Detector
 *
 * Logic based on solution from http://notnotmobile.appspot.com/
 */

module.exports = function(options){
  var mobile = /iphone|ipod|blackberry|android|palm|windows ce/gi
    , desktop = /windows|linux|os x|solaris|bsd/gi
    , bot = /spider|crawl|slurp|bot/gi;

  return function(req, res, next){
    var ua = req.headers['user-agent'];

    /**
     * Anything that looks like a phone isn't a desktop.
     * Anything that looks like a desktop probably is.
     * Anything that looks like a bot should default to desktop.
     */

    req.isMobile = mobile.test(ua) && !(desktop.test(ua) || bot.test(ua));
    req.isDesktop = !req.isMobile;

    next();
  }
}