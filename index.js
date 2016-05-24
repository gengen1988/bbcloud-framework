var nconf = require('nconf');

nconf.argv().env();
var NODE_ENV = nconf.get('NODE_ENV') || 'development';
nconf.file({file: 'config.' + NODE_ENV + '.json'});

require('seneca')()
  .use('customer', {
    port: nconf.get('authServicePort'),
    secret: nconf.get('secret')
  })
  .use('mongoose-entity', {
    mongodb: nconf.get('mongodb'),
    models: {
      customers: require('./models/customer-account')
    }
  })
  .listen();
