const Invite = require('../models/invite')
    , should = require('should')
    , getData = require('./default-data').invite
    , testTimestamp = require('./test-timestamp')
    ;


describe('Invite Model', function(){
  describe('#save()', function(){
    var invite, data, sets;

    afterEach(function(done){
      Invite.remove(done)
    })

    it('should save without error', function(done){
      invite = new Invite(getData())

      invite.save(function(err){
        should.not.exist(err)

        done()
      })
    })

    it('should not prompt when "details" not set', function(done){
      data = getData()
      delete data.details

      invite = new Invite(data)
      invite.save(function(err){
        should.not.exist(err)

        done()
      })
    })

    sets = ['email', 'project', 'from']
    sets.forEach(function(path){
      it('should prompt error when "' +path+ '" not set', function(done){
        data = getData();

        delete data[path]
        invite = new Invite(data)

        invite.save(function(err){
          should.exist(err)

          err.should.have.property('errors')
          err.errors.should.have.property(path)

          done()
        })
      })
    })

    testTimestamp(it, Invite, getData)
  })
  // #save()
})
// Invite Model