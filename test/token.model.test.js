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

    after(function(done){
      Token.remove(done)
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

  describe('#findByToken()', function(){
    var tokenStr;

    before(function(done){
      var token = new Token({ email: getData().email });
      token.save(function(err){
        should.not.exist(err)

        tokenStr = token.token;

        done()
      })
    })

    after(function(done){
      Token.remove(done)
    })

    it('should return the token object if token key passed in is correct', function(done){
      Token.findByToken(tokenStr, function(err, token){
        should.not.exist(err)
        should.exist(token)

        should.ok(token.token === tokenStr)

        done()
      })
    })
  })
  // #findByToken()
})