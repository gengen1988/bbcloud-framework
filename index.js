var nconf = require('nconf');
var mongoose = require('mongoose');

nconf.argv().env();
var NODE_ENV = nconf.get('NODE_ENV') || 'development';
nconf.file({file: 'config.' + NODE_ENV + '.json'});

mongoose.connect(nconf.get('mongodb'));

require('seneca')()
  .use('customer', {
    port: nconf.get('authServicePort'),
    secret: nconf.get('secret')
  })
  .use('mongoose-entity', {mongoose})
  .listen();
