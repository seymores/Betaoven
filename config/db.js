const env = require('./env')

var configs = {
    development: {
        host: 'localhost'
      , db: 'betaoven-dev'
      , port: 27017
    }
  , production: {
        host: 'localhost'
      , db: 'betaoven'
      , port: 27017
    }
  , test: {
        host: 'localhost'
      , db: 'betaoven-test'
      , port: 27017
    }
}

module.exports = configs[env]