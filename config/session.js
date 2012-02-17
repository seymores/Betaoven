const env = require('./env')

var configs = {
    development: {
        secret: 'b@ta0ven'
    }
  , production: {
        secret: 'b@ta0ven'
    }
  , test: {
        secret: 'b@ta0ven'
    }
}

module.exports = configs[env]