var User = require('../models/user')
  , should = require('should')

describe('User Model', function(){
  describe('#save()', function(){
    var user;

    beforeEach(function(done){
      User.remove(done)
    })

    it('should save without error', function(done){
      user = new User({
          email: 'hello@betaoven.com'
        , display_name: 'oven'
      })

      user.save(function(err){
        should.not.exist(err)

        done()
      })
    })

    it('should prompt error when "email" not set', function(done){
      user = new User({ display_name: 'oven' })

      user.save(function(err){
        should.exist(err)

        err.should.have.property('errors')
        err.errors.should.have.property('email')

        done()
      })
    })

    it('should prompt error when "display_name" not set', function(done){
      user = new User({ email: 'hello@betaoven.com' })

      user.save(function(err){
        should.exist(err)

        err.should.have.property('errors')
        err.errors.should.have.property('display_name')

        done()
      })
    })
  })
})