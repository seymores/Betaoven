const should = require('should');


module.exports = function(it, Model, getData){

  var sets = ['createdAt', 'modifiedAt']
    , doc;

  sets.forEach(function(path){
    it('should have "' +path+ '" set when saved', function(done){
      doc = new Model(getData())
      doc.save(function(err){
        should.not.exist(err)

        doc.should.have.property(path)
        doc[path].should.not.be.false

        done()
      })
    })
  })

  it('should not update "createdAt" when modified', function(done){
    var createdAt;

    doc = new Model(getData())
    doc.save(function(err){
      should.not.exist(err)

      doc.should.have.property('createdAt')
      doc.createdAt.should.not.be.false

      createdAt = doc.createdAt

      doc.save(function(err){
        should.not.exist(err)

        doc.createdAt.should.be.eql(createdAt)

        done()
      })
    })
  })

  it('should update "modifiedAt" when modified', function(done){
    var prev, isChanged;

    doc = new Model(getData())
    doc.save(function(err){
      should.not.exist(err)

      doc.should.have.property('modifiedAt')
      doc.modifiedAt.should.not.be.false

      prev = doc.modifiedAt

      setTimeout(function(){
        doc.save(function(err){
          should.not.exist(err)

          doc.modifiedAt.should.be.not.eql(prev)
          isChanged = +doc.modifiedAt > +prev
          isChanged.should.be.true

          done()
        })
      }, 10)
    })
  })
}

