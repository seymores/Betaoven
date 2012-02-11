var Project = require('../models/project')
  , Owner = require('../models/owner')
  , should = require('should');


describe('Project Model', function(){
  describe('#save()', function(){
    var project, owner = new Owner();

    afterEach(function(done){
      Project.remove(done)
    })

    it('should be able to save without error', function(done){

      project = new Project({
          name: 'betaoven'
        , owner: owner
        , description: 'oven to cook android app'
      })

      project.save(function(err){
        should.not.exist(err)

        done()
      })
    })

    it('should prompt error when "name" not set', function(done){
      project = new Project({ owner: owner })

      project.save(function(err){
        should.exist(err)

        err.should.have.property('errors')
        err.errors.should.have.property('name')

        done()
      })
    })

    it('should prompt error when "owner" not set', function(done){
      project = new Project({ name: 'betaoven' })

      project.save(function(err){
        should.exist(err)

        err.should.have.property('errors')
        err.errors.should.have.property('owner')

        done()
      })
    })

    it('should not prompt error when "description" not set', function(done){
      project = new Project({ name: 'betaoven', owner: owner })

      project.save(function(err){
        should.not.exist(err)

        done()
      })
    })
  })
})