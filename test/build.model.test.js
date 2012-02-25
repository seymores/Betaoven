const Build = require('../models/build')
    , should = require('should')
    , getData = require('./default-data').build
    , testTimestamp = require('./test-timestamp')
    ;


describe('Build Model', function(){
  describe('.filename', function(){
    after(function(done){
      Build.remove(done);
    })

    it('should default to "untitled.apk"', function(){
      var data = getData()
        , build;

      delete data.filename;
      build = new Build(data);
      build.filename.should.be.eql('untitled.apk');
    })
  })

  describe('#save', function(){
    var build, sets;

    afterEach(function(done){
      Build.remove(done)
    })

    it('should save without error', function(done){
      build = new Build(getData())

      build.save(function(err){
        should.not.exist(err)

        done()
      })
    })

    sets = ['project'];
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

    testTimestamp(it, Build, getData)
  })
  // #save()
})
// Build Model