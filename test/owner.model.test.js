var Owner = require('../models/owner')
  , should = require('should')

describe('Owner Model', function(){
  describe('#save()', function(){
    var owner;

    beforeEach(function(done){
      Owner.remove(done)
    })

    it('should save without error', function(done){
      owner = new Owner({
          email: 'hello@betaoven.com'
        , display_name: 'oven'
      })

      owner.save(function(err){
        should.not.exist(err)

        done()
      })
    })

    it('should prompt error when "email" not set', function(done){
      owner = new Owner({ display_name: 'oven' })

      owner.save(function(err){
        should.exist(err)

        err.should.have.property('errors')
        err.errors.should.have.property('email')

        done()
      })
    })

    it('should prompt error when "display_name" not set', function(done){
      owner = new Owner({ email: 'hello@betaoven.com' })

      owner.save(function(err){
        should.exist(err)

        err.should.have.property('errors')
        err.errors.should.have.property('display_name')

        done()
      })
    })
  })
})