const Feedback = require('../models/feedback')
    , Build = require('../models/build')
    , getData = require('./default-data').feedback
    , getBuildData = require('./default-data').build
    , should = require('should')
    , testTimestamp = require('./test-timestamp')
    ;


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

    var paths = ['by', 'details', 'build', 'project'];
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

    testTimestamp(it, Feedback, getData)
  })
  // #save()

  describe('get feedbacks with build ID', function(){
    var build, feedbacks, data;

    after(function(done){
      Build.remove(function(){
        Feedback.remove(done);
      });
    })

    before(function(done){
      var n = 5
        , i = 0;

      build = new Build(getBuildData());
      feedbacks = [
          new Feedback(getData())
        , new Feedback(getData())
        , new Feedback(getData())
        , new Feedback(getData())
        , new Feedback(getData())
      ];

      feedbacks[0].point
        = feedbacks[1].point
        = 1;
      feedbacks[2].point
        = feedbacks[3].point
        = feedbacks[4].point
        = -1;

      build.save(function(err){
        feedbacks.forEach(function(f){
          f.build = build;
          f.save(function(err){
            should.not.exist(err);
            ++i == n && done();
          });
        })
      })
    })

    describe('with #listApproved()', function(){
      it('list all positive feedback', function(done){
        Feedback.listApproved(build._id, function(err, docs){
          should.not.exist(err);

          should.ok(docs.length == 2);
          done();
        })
      })
    })

    describe('with #listDisapproved()', function(){
      it('list all negative feedback', function(done){
        Feedback.listDisapproved(build.id, function(err, docs){
          should.not.exist(err);

          should.ok(docs.length == 3);
          done();
        })
      })
    })
  })
})
// Feedback Model