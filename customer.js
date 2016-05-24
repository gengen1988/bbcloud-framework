var cors = require('cors');
var bodyParser = require('body-parser');
var passport = require('passport');
var express = require('express');
var nconf = require('nconf');

module.exports = function(opts) {

  var seneca = this;

  // init actions
  seneca.add('init:customer', init);

  return;

  function init(args, done) {
    var port = nconf.get('authServicePort');
    var app = express();

    // register middlewares
    app.use(cors());
    app.use(bodyParser.json());
    app.use(passport.initialize());
    app.use(require('./routers/auth'));

    app.listen(port, done);
  }

};
