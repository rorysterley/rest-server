# REST Server Framework


Start Server
------------
To start the server, put the following in your index.js file.
```
var server = require(./lib/server);
server.start()
```
server.start takes an optional port number (3000) by default.


REST requests
-------------
CRUD requests made to the server should be of the form:<br>
localhost:3000/PathToSaveIn/fileIAmInterestedIn.json


Using superagent:
```
$ superagent get localhost:3000/path/testfiel.json
$ superagent post localhost:3000/path/testfiel.json
$ superagent patch localhost:3000/path/testfiel.json
$ superagent put localhost:3000/path/testfiel.json
$ superagent delete localhost:3000/path/testfiel.json
```


Contributers
------------
Rory Sterley<br>
Gaye Bulut<br>
Sam Hamm<br>
Patricia Buckenberger<br>
Aaron Krause<br>
