'use strict';

var fs = require('fs');
var url = require('url');


var router = module.exports  = {};

module.exports = function(req, res) {
  var method = req.method;
  var urlPieces = req.url.split('/');
  var fileName = urlPieces[urlPieces.length - 1];

  router[method](req, res, fileName);
};


// ==== GET ==== (Return file)
router.GET = function(req, res, fileName) {
  var content;
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  try {
      content = fs.readFileSync('./db/' + fileName);
      res.write(content);
  } catch(err) {
    console.log('Error: ' + err);
  }

  res.end();
};


// ==== POST ==== (Create new file)
router.POST = function(req, res, fileName) {
  var fullPath = './db/' + fileName;

  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  fs.open(fullPath, "wx", function(err) {
    if(err) {
      console.log("already exists");
      res.writeHead(404);
      res.end();
    } else {
      var input = '';

      console.log("creating a new file");
      req.on('data', function(data) {
        input += data.toString('utf-8');
      });
      req.on('end', function() {
        fs.writeFile(fullPath, input, function(err) {
          res.writeHead(err ? 404 : 200);
          res.end();
        });
      });
    }
  });
};


// ==== PUT ==== (Overwrite file)
router.PUT = function(req, res, fileName) {
  var input = '';

  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

 req.on('data', function(data) {
    input += data.toString('utf-8');
 });

 req.on('end', function() {
    fs.writeFile('./db/' + fileName, input, function(err) {
      res.writeHead(err ? 404 : 200);
        res.end();
    });
 });
};


// ==== PATCH ==== (Merge/update file)
router.PATCH = function(req, res, fileName) {
  var fullPath = './db/' + fileName;
  var originalFile;

  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  fs.open(fullPath, "r+", function(err) {
    if(err) {
      console.log("Error: " + err);
      res.writeHead(404);
      res.end();
    } else {
      var input = '';

      console.log("Patching file");
      req.on('data', function(data) {
        input += data.toString('utf-8');
      });

      fs.readFile(fullPath, function(err, data) {
        if(err) {
          console.log("Error " + err);
          res.end();
        }

        originalFile = data.toString('utf-8');
        originalFile = JSON.parse(originalFile);
        input = JSON.parse(input);

        for(var key in input) {
          originalFile[key] = input[key];
        }

        originalFile = JSON.stringify(originalFile);

        fs.writeFile(fullPath, originalFile, function(err) {
          res.writeHead(err ? 404 : 200);
          res.end();
        });
      });
    }
  });
};


// ==== DELETE ==== (Delete file)
router.DELETE = function(req, res, fileName) {
  var dir = './db/' + fileName || 'dontDeleteMyDb.foo';

  try{
    fs.unlinkSync(dir);

    res.writeHead(200, {
    'Content-Type': 'text/plain'
    });
    res.write('Deleting');
  } catch(err) {}

  res.end();
};
