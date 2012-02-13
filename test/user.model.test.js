var User = require('../models/user')
  , should = require('should')
  , getData = require('./default-data').user
  , testTimestamp = require('./test-timestamp')
  ;

describe('User Model', function(){
  describe('#save()', function(){
    var user, data, sets;

    beforeEach(function(done){
      User.remove(done)
    })

    it('should save without error', function(done){
      user = new User(getData())

      user.save(function(err){
        should.not.exist(err)

        done()
      })
    })

    sets = ['email', 'display_name']
    sets.forEach(function(path){
      it('should prompt error when "' +path+ '" not set', function(done){
        data = getData()
        delete data[path]
        user = new User(data)

        user.save(function(err){
          should.exist(err)

          err.should.have.property('errors')
          err.errors.should.have.property(path)

          done()
        })
      })
    })

    testTimestamp(it, User, getData)
  })
})