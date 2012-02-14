var Project = require('../models/project')
  , should = require('should')
  , getData = require('./default-data').project
  , testTimestamp = require('./test-timestamp')
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

    it('should default "private" to false', function(done){
      project = new Project(getData())

      project.save(function(err){
        (project.private === false).should.be.true

        done()
      })
    })

    it('owner should be set as admin by default', function(done){
      project = new Project(getData());
      project.save(function(err){
        should.not.exist(err)
        project.admins.should.include(project.owner)

        done()
      })
    })

    testTimestamp(it, Project, getData)
  })
  // #save()

  describe('#list()', function(){
    var projects = []
      , z = 122 // char code for z
      ;

    before(function(){
      var character
        , n = 10
        , i = n
        , data;

      for(;i--;){
        character = String.fromCharCode(z-i);
        data = getData();
        data.name += character;
        data.description += character;
        projects[i] = new Project(data);
      }

      projects.forEach(function(project){
        project.save(function(err){
          should.not.exist(err)

          ++i === n && done()
        })
      })
    })

    after(function(done){
      Project.remove(done)
    })

    it('should list all projects', function(done){
      Project.list(function(err, docs){
        should.not.exist(err)
        docs.length.should.be.eql(projects.length)

        done()
      })
    })

    it('should sort results based on options.sort', function(done){
      Project.list({ sort: 'name.desc' }, function(err, docs){
        var first, last;

        should.not.exist(err)
        docs.length.should.be.eql(projects.length)

        first = docs[0]
        last = docs[docs.length-1]

        should.ok(first.name > last.name)

        done()
      })
    })

    it('options.sort should be able to accept comma separated string', function(done){
      var data = getData()
        , projects = []
        , i = 0
        , n = 0;

      projects.push(new Project(data))
      projects.push(new Project(data))
      projects.push(new Project(data))
      projects.push(new Project(data))

      i = projects.length

      projects.forEach(function(project, v){
        project.name = 'project a'
        project.description = String.fromCharCode(z-v)

        if (v === 3)
          project.name = 'project b'

        project.save(function(err){
          should.not.exist(err)

          ++n === i && next()
        })
      })

      function next(){
        Project.list({
            filter: { name: /^project/gi }
          , sort: 'name, description.desc'
        }, function(err, docs){
          should.not.exist(err)

          docs.reduce(function(prev, curr, idx){
            // test the names are start from "project"
            should.ok(/^project/gi.test(prev.name))
            should.ok(/^project/gi.test(curr.name))

            if (idx === 3)
              // the last item with name="project b"
              should.ok(curr.name === 'project b')

            should.ok(prev.description > curr.description)

            return curr
          })

          done()
        })
      }
    })

    it('should be able to limit number of result per page')

    it('should retrive specific page of project infos')

  })
  // #list()
})