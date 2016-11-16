// Load the http module to create an http server.
var http = require('http');
var os = require("os");

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write(JSON.stringify(request.headers));
  var now = new Date();
  response.write("\n\ntime: " + now.toISOString());
  response.write("\n\nhostname: " + os.hostname());
  var nics = os.networkInterfaces();
  var addresses = '';
  for (var nic in nics)
  {
    addresses = addresses + nic + ': ';
    for (var bind in nics[nic]) {
      addresses = addresses + nics[nic][bind].address + ' ';
    }
    addresses = addresses + '\n'
  }
  response.write("\n\ninterfaces:\n" + addresses);
  response.write("\n\npid: " + process.pid);
  response.write("\n\nplatform: " + process.platform);
  response.end("\n\nHello World\n");
  console.log(now.toISOString() + " " + os.hostname() + " " + JSON.stringify(request.headers));
});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8080, "0.0.0.0");

// Put a friendly message on the terminal
console.log("Server running at http://0.0.0.0:8080/ on " + os.hostname());

