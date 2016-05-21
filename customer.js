module.exports = function(opts) {

  var seneca = this;

  opts = seneca.util.deepextend({
    authServicePort: 3000,
    mongodb: 'mongodb://localhost/customer'
  });

  seneca.add('init:customer', init);
  seneca.add('role:customer, cmd:find-all', require('./services/find-all'));
  seneca.add('role:customer, cmd:create', require('./services/create'));
  seneca.add('role:customer, cmd:find-by-id', require('./services/find-by-id'));
  seneca.add('role:customer, cmd:update-by-id', require('./services/update-by-id'));
  seneca.add('role:customer, cmd:destroy-by-id', require('./services/destroy-by-id'));

  return;

  function init(args, done) {
    var express = require('express');
    var mongoose = require('mongoose');
    var app = express();
    mongoose.connect(opts.mongodb);
    app.use(require('./routers/login'));
    app.listen(opts.authServicePort, function() {done()});
  }

};
