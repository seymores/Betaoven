const should = require('should')
    , models = require('../models')
    , Token = models.Token
    , User = models.User
    , getData = require('./default-data').user;

describe('Token', function(){
  describe('#save()', function(){
    var token, user;

    before(function(done){
      user = new User(getData())

      user.save(function(err){
        should.not.exist(err)
        done()
      });
    })

    it('randomly generate a token string', function(done){
      token = new Token({ email: user.email })
      should.ok(token.token == undefined)

      token.save(function(err){
        should.not.exist(err)

        token.should.have.property('token')
        should.ok(token.token.length > 0)

        done()
      })
    })
  })
  // #save()
})