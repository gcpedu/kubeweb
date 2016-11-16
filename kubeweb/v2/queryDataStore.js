/*
 * Simple node.js sample to query Datastore 
 */
if (process.argv.length < 5) {
  console.log('\nusage: queryDatastore <projectid> <jwtfile> <kind> <optional-namespace>');
	console.log('\nInstructions to create a service account and JSON key:');
	console.log('  https://cloud.google.com/iam/docs/creating-managing-service-accounts');
	console.log('  https://cloud.google.com/iam/docs/managing-service-account-keys\n');
  return;
};

var projectId = process.argv[2];
var keyFileName = process.argv[3];
var kind = process.argv[4];
var namespace = '';
if (process.argv.length > 5) { namespace = process.argv[5] };

/*
 * Helper function to print entities
 */
function printEntities(entities)
{
  entities.forEach(function (entity) {
    var kind = entity.key.path[1];
    console.log('Key');
    console.log(entity['key']);
    console.log('Data');
    console.log(entity['data']);
  });
};

/*
 * Create the datastore client to the project using the key in JSON Web Token format
 */
var Datastore = require('@google-cloud/datastore');
var datastoreClient = Datastore({
  projectId: projectId,
  keyFilename: keyFileName
});

/*
 * Create and run the query
 */
var query = datastoreClient.createQuery(namespace, kind);
datastoreClient.runQuery(query, function(err, entities, info){
  if(err) { console.log(err) };
  {
      printEntities(entities);
  };
});

