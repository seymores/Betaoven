const Feedback = require('../models/feedback')
    , User = require('../models/user')
    , defaultData = require('./default-data')
    , should = require('should')


describe('Feedback Model', function(){
  describe('#save()', function(){
    var default_data = defaultData.feedback 
      , feedback

    beforeEach(function(done){
      Feedback.remove(done)
    })

    it('should save without error', function(done){
      feedback = new Feedback(default_data)

      feedback.save(function(err){
        should.not.exist(err)

        done()
      })
    })

    var paths = ['by', 'details'];
    paths.forEach(function(path){
      it('should prompt error when "' +path+ '" not set', function(done){
        var data = default_data;

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