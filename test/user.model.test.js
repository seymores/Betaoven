var User = require('../models/user')
  , should = require('should')
  , getData = require('./default-data').user
  , testTimestamp = require('./test-timestamp')
  ;

describe('User Model', function(){
  describe('#save()', function(){
    var user, data, sets;

    beforeEach(function(done){
      User.remove(done)
    })

    it('should save without error', function(done){
      user = new User(getData())

      user.save(function(err){
        should.not.exist(err)

        done()
      })
    })

    it('should convert password to hash', function(done){
      var hash;

      data = getData()
      user = new User(data)

      user.save(function(err){
        should.not.exist(err)

        hash = User.hashPassword(data.password)
        hash.should.be.eql(user.password)

        done()
      })
    })

    it('should not re-hash the hashed password', function(done){
      var hash;

      user = new User(getData())
      user.save(function(err){
        should.not.exist(err)

        hash = user.password

        setTimeout(function(){
          user.save(function(err){
            should.not.exist(err)

            hash.should.be.eql(user.password)

            done()
          })
        }, 10)
      })
    })

    sets = ['email', /*'username', */'display_name', 'password']
    sets.forEach(function(path){
      it('should prompt error when "' +path+ '" not set', function(done){
        data = getData()
        delete data[path]
        user = new User(data)

        user.save(function(err){
          should.exist(err)

          err.should.have.property('errors')
          err.errors.should.have.property(path)

          done()
        })
      })
    })

    testTimestamp(it, User, getData)
  })
  // #save()

  describe('#auth()', function(){
    var user, data = getData();

    beforeEach(function(done){
      user = new User(data)
      user.save(function(err){
        should.not.exist(err);

        done();
      })
    })

    afterEach(function(done){
      User.remove(done);
    })

    it('should return user', function(done){
      User.auth({
          email: data.email
        , password: data.password
      }, function(err, user){
        should.not.exist(err);
        should.exist(user);
        should.ok(user.email === data.email);
        should.ok(User.hashPassword(data.password) === user.password);

        done()
      })
    })

    it('should not return anything', function(done){
      User.auth({
          email: data.email
        , password: 'none'
      }, function(err, user){
        should.not.exist(err);
        should.not.exist(user);

        done()
      })
    })
  })
  // #auth()

  describe('#findByEmail()', function(){
    var user, data = getData();

    before(function(done){
      user = new User(data);
      user.save(done);
    })

    it('get user with the email provided', function(done){
      User.findByEmail(data.email, function(err, _user){
        should.not.exist(err)
        should.ok(_user.email === user.email)

        done()
      })
    })
  })
  // #findByEmail()
})