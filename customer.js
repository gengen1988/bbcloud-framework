var cors = require('cors');
var bodyParser = require('body-parser');
var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');

module.exports = function(opts) {

  var seneca = this;
  var customerServices = require('./services/customer');

  // init module
  seneca.add('init:customer', init);

  // register services
  seneca.add('role:customer, cmd:find-all', customerServices.findAll);
  seneca.add('role:customer, cmd:create', customerServices.create);
  seneca.add('role:customer, cmd:find-by-id', customerServices.findById);
  seneca.add('role:customer, cmd:update-by-id', customerServices.updateById);
  seneca.add('role:customer, cmd:destroy-by-id', customerServices.destroyById);

  return;

  function init(args, done) {
    var app = express();

    mongoose.connect(opts.mongodb);

    // register middlewares
    app.use(cors());
    app.use(bodyParser.json());
    app.use(passport.initialize());
    app.use(require('./routers/auth'));

    app.listen(opts.authServicePort, function() {done()});
  }

};
