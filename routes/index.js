
/*
 * GET home page.
 */
var path = require('path')
    , formidable = require('formidable')
    , fs = require('fs');

exports.index = function(req, res){
  // res.render('index', { title: 'Express' })
    res.sendfile( path.normalize( __dirname + "/../public/index.html") );
    console.log(" * index home request ");
};

exports.dashboard = function(req, res) {
    var filepath = path.normalize( __dirname + '/../public/dashboard.html' );
    res.sendfile( filepath );
    console.log(" * Dashboard request, filepath = " + filepath);
}; 

exports.upload = function(req, res) {
    console.log( " File uploaded: " + req.files.uploadfile);
    var tmp_path = req.files.uploadfile.path;
    var filepath = path.normalize( __dirname + "/../public/files/" + req.files.uploadfile.name );
    
    fs.rename(tmp_path, filepath, function(err) {
        if (err) throw err;
        fs.unlink(tmp_path, function() {
            if (err) throw err;
        });

        var output = {"message": filepath};
        res.writeHead(200, {"Content-type":"application/json"});
        res.write( JSON.stringify(output) );
        res.end();
    });

};
