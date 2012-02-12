const Feedback = require('../models/feedback')
    , User = require('../models/user')
    , getData = require('./default-data').feedback
    , should = require('should')


describe('Feedback Model', function(){
  describe('#save()', function(){
    var _data = getData()
      , feedback

    beforeEach(function(done){
      Feedback.remove(done)
    })

    it('should save without error', function(done){
      feedback = new Feedback(_data)

      feedback.save(function(err){
        should.not.exist(err)

        done()
      })
    })

    var paths = ['by', 'details'];
    paths.forEach(function(path){
      it('should prompt error when "' +path+ '" not set', function(done){
        _data = getData();

        delete _data[path]
        feedback = new Feedback(_data)

        feedback.save(function(err){
          should.exist(err)

          err.should.have.property('errors')
          err.errors.should.have.property(path)

          done()
        })
      })
    })

  })
  // #save()
})
// Feedback Model