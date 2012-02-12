const Build = require('../models/build')
    , should = require('should')
    , getData = require('./default-data').build
    ;


describe('Build Model', function(){
  describe('#save', function(){
    var build, sets;

    beforeEach(function(done){
      Build.remove(done)
    })

    it('should save without error', function(done){
      build = new Build(getData())

      build.save(function(err){
        should.not.exist(err)

        done()
      })
    })

    sets = ['version_code', 'version_label'];
    sets.forEach(function(path){
      it('should prompt error when "' +path+ '" not set', function(done){
        var data = getData();

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
      build = new Build(getData());

      build.should.have.property('status')
      build.status.should.be.eql('pending')

      done()
    })
  })
  // #save()
})
// Build Model