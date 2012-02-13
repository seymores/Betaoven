const Vote = require('../models/vote')
    , should = require('should')
    , getData = require('./default-data').vote
    , testTimestamp = require('./test-timestamp')
    ;

describe('Vote Model', function(){
  describe('#save()', function(){
    var vote, data, sets;

    it('should save without error', function(done){
      vote = new Vote(getData())

      vote.save(function(err){
        should.not.exist(err)

        done()
      })
    })

    sets = ['build', 'by'];
    sets.forEach(function(path){
      it('should prompt error when "' +path+ '" not set', function(done){
        data = getData()

        delete data[path]
        vote = new Vote(data)

        vote.save(function(err){
          should.exist(err)

          err.should.have.property('errors')
          err.errors.should.have.property(path)

          done()
        })
      })
    })

    it('should be default "point" to 0', function(done){
      var point;

      vote = new Vote(getData())
      point = vote.point+''
      point.should.eql('0')

      done()
    })

    sets = [-1, 0, 1]
    sets.forEach(function(v){
      it('should be ok if "point" within -1 to 1, point = '+v, function(done){
        vote = new Vote(getData())
        vote.point = v

        vote.save(function(err){
          should.not.exist(err)
          done()
        })
      })
    })

    sets = [-10, 100, 2]
    sets.forEach(function(v){
      it('should not be ok if "point" not within -1 to 1, point = '+v, function(done){
        vote = new Vote(getData())
        vote.point = v

        vote.save(function(err){
          should.exist(err)

          err.errors.should.have.property('point')
          err.errors.point.type.should.be.eql(v > 0 ? 'max' : 'min')

          done()
        })
      })
    })

    testTimestamp(it, Vote, getData)
  })
})