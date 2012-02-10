
/*
 * GET home page.
 */
var path = require('path')
    , fs = require('fs');

/**
 * Read in HTML and keep in memory
 */

var index = fs.readFileSync(__dirname + "/../public/index.html")
  , dashboard = fs.readFileSync(__dirname + '/../public/dashboard.html')
  ;


exports.index = function(req, res){
    res.send(index, {'Content-Type': 'text/html'});
    console.log(" * index home request ");
};

exports.dashboard = function(req, res) {
    res.send(dashboard, {'Content-Type': 'text/html'});
    console.log(" * Dashboard request ");
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
