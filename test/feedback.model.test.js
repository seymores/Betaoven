const Feedback = require('../models/feedback')
    , getData = require('./default-data').feedback
    , should = require('should')


describe('Feedback Model', function(){
  describe('#save()', function(){
    var feedback, data, sets;

    beforeEach(function(done){
      Feedback.remove(done)
    })

    it('should save without error', function(done){
      feedback = new Feedback(getData())

      feedback.save(function(err){
        should.not.exist(err)

        done()
      })
    })

    var paths = ['by', 'details'];
    paths.forEach(function(path){
      it('should prompt error when "' +path+ '" not set', function(done){
        data = getData();

        delete data[path]
        feedback = new Feedback(data)

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