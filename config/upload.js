const env = require('./env')
    , fs = require('fs')

var configs = {
    development: {
        dest: fs.realpathSync(__dirname + '/../builds')
    }
  , production: {
        dest: fs.realpathSync(__dirname + '/../builds')
    }
  , test: {
        dest: '/tmp'
    }
}

module.exports = configs[env]