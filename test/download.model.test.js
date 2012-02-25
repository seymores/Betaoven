const Download = require('../models/download')
    , should = require('should')
    , getData = require('./default-data').download
    , testTimestamp = require('./test-timestamp')
    ;


describe('Download model', function(){
  describe('#save()', function(){
    var download, sets;

    afterEach(function(done){
      Download.remove(done);
    })

    it('no error with full data', function(done){
      download = new Download(getData());
      download.save(done);
    })

    sets = ['by', 'build'];
    sets.forEach(function(path){
      it('should prompt error when "' +path+ '" not set', function(done){
        var data = getData();

        delete data[path]
        download = new Download(data)

        download.save(function(err){
          should.exist(err)

          err.should.have.property('errors')
          err.errors.should.have.property(path)

          done()
        })
      })
    })

    testTimestamp(it, Download, getData)
  })

})