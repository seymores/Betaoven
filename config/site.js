const env = require('./env')

var configs = {
    development: {
        url: 'dev'
      , api: 'api.dev'
      , port: 3000
    }
  , production: {
        url: 'androidrocket.org'
      , db: 'api.androidrocket.org'
      , port: 80
    }
  , test: {
        url: 'localhost'
      , api: 'api.localhost'
      , port: 3000
    }
}

module.exports = configs[env]