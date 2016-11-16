// Load the http module to create an http server.
'use strict';

var os = require("os");
var http = require('http');
var util = require('util');
var fs = require('fs');
var forms = require('forms');
var jsontemplate = require ('./json-template');
var configurationFile = 'conf/nodehello.config.json';
var datastore = require('@google-cloud/datastore');
var cloudlogging = require('@google-cloud/logging');
var fields = forms.fields;
var validators = forms.validators;


// Template for the example page
var template = jsontemplate.Template(
    fs.readFileSync(__dirname + '/page.jsont').toString()
);
// Our form
var hello_form = forms.create({
    recipient: fields.string({ required: true }),
    message: fields.string(),
    sender: fields.string()
});

// Load our configuration file
var configuration = JSON.parse(
    fs.readFileSync(configurationFile)
);
var projectId = configuration.projectid;
var kind = configuration.kind;
var keyfile = configuration.keyfile;

// Instantiates a datastore client using configuration from file
var datastoreClient = datastore({
  projectId: projectId,
  keyFilename: keyfile
});

// The kind for the new entity
// The name/ID for the new entity - blank means Datastore will autogenerate an id
var entityname = '';

// Network information
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

// Cloud Logging
var logging = cloudlogging({
  projectId: projectId,
  keyFilename: keyfile
});
var log = logging.log("nodehellolog");
var resource = {
  type: 'global'
};

function logError(err) {
  if (err) {
    console.log(err);
    return;
  }
}

console.log("Starting");
var entry = log.entry(resource, 'NodeHello starting');
log.info(entry, logError); 

// Create our server
http.createServer(function (req, res) {
    hello_form.handle(req, {
        success: function (form) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('<h1>Success!</h1>');
            var time = new Date().toISOString();
            // The Cloud Datastore key for the new entity
            var kubeworkKey = datastoreClient.key([kind, entityname]);
            // Prepares the new message entity with data from form
            var message = {
              key: kubeworkKey,
              data: {
                time: time,
                headers: JSON.stringify(req.headers).substring(0,1500),
                hostname: os.hostname(),
                interfaces: addresses,
                pid: process.pid,
                platform: process.platform,
                recipient: form.data.recipient,
                message: form.data.message,
                sender: form.data.sender,
                version: "V3" 
              }
            };
            
            entry = log.entry(resource, message.data);
            log.info(entry, logError);

            datastoreClient.save(message, (err) => {
              if (err) {
                entry = log.entry(resource, "Datastore error" + err);
                log.error(entry, logError);
                return;
              }
            });
            res.end('<pre>' + util.inspect(form.data) + '</pre>');
        },
        // perhaps also have error and empty events
        other: function (form) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(template.expand({
                form: form.toHTML(),
                enctype: '',
                method: 'GET'
            }));
        }
    });
}).listen(8080);
entry = log.entry(resource, 'NodeHello listening');
log.info(entry, logError); 
console.log("Server running at http://0.0.0.0:8080/");

