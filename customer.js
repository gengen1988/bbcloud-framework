var cors = require('cors');
var bodyParser = require('body-parser');
var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');

module.exports = function(opts) {

  var seneca = this;

  // init actions
  seneca.add('init:customer', init);
  require('./actions')(seneca);

  return;

  function init(args, done) {
    var app = express();
    var mongodb = opts.mongodb;
    var authServicePort = opts.authServicePort;

    mongoose.connect(mongodb);

    // register middlewares
    app.use(cors());
    app.use(bodyParser.json());
    app.use(passport.initialize());
    app.use(require('./routers/auth'));

    app.listen(authServicePort, function() {done()});
  }

};
