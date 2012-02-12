const Build = require('../models/build')
    , should = require('should');


describe('Build Model', function(){
  describe('#save', function(){
    var default_data = { version_code: '0.0.1', version_label: 'dev' }
      , build;


    beforeEach(function(done){
      Build.remove(done)
    })

    it('should save without error', function(done){
      build = new Build(default_data)

      build.save(function(err){
        should.not.exist(err)

        done()
      })
    })

    var paths = ['version_code', 'version_label'];
    paths.forEach(function(path){
      it('should prompt error when "' +path+ '" not set', function(done){
        var data = default_data;

        delete data[path]
        build = new Build(data)

        build.save(function(err){
          should.exist(err)

          err.should.have.property('errors')
          err.errors.should.have.property(path)

          done()
        })
      })
    })

    it('should set the "status" default to "pending"', function(done){
      build = new Build(default_data);

      build.should.have.property('status')
      build.status.should.be.eql('pending')

      done()
    })
  })
  // #save()
})
// Build Model