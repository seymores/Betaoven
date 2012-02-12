var Project = require('../models/project')
  , should = require('should')
  , getData = require('./default-data').project
  ;


describe('Project Model', function(){
  describe('#save()', function(){
    var project, data, sets;

    afterEach(function(done){
      Project.remove(done)
    })

    it('should be able to save without error', function(done){

      project = new Project(getData())

      project.save(function(err){
        should.not.exist(err)

        done()
      })
    })

    sets = ['name', 'owner'];
    sets.forEach(function(path){
      it('should prompt error when "' +path+ '" not set', function(done){
        data = getData()
        delete data[path]
        project = new Project(data)

        project.save(function(err){
          should.exist(err)

          err.should.have.property('errors')
          err.errors.should.have.property(path)

          done()
        })
      })
    })

    it('should not prompt error when "description" not set', function(done){
      data = getData()
      delete data.description
      project = new Project(data)

      project.save(function(err){
        should.not.exist(err)

        done()
      })
    })
  })
})