var senecaLib = require('seneca');
var expect = require('chai').expect;
var Promise = require('bluebird');
var nconf = require('nconf');
var path = require('path');

// init config
nconf.argv().env();
var NODE_ENV = nconf.get('NODE_ENV') || 'development';
nconf.file({file: path.join(__dirname, '..', 'config.' + NODE_ENV + '.json')});

// init seneca
var seneca = senecaLib(nconf.get());
var act = Promise.promisify(seneca.act, {context: seneca});

describe('customer', function() {

  it('should create a new customer', function() {

    return act('role:customer, cmd:create', {

    }).then(function(results) {
      expect(results.entities).to.be.an('array');
      expect(results.count).to.be.a('number');
    });

  });

  it('should return a list of customer', function() {

    return act('role:customer, cmd:find-all').then(function(results) {
      expect(results.entities).to.be.an('array');
      expect(results.count).to.be.a('number');
    });

  });

  it('should update a customer', function() {

    return act('role:customer, cmd:update-by-id').then(function(results) {
      expect(results.entities).to.be.an('array');
      expect(results.count).to.be.a('number');
    });

  });

  it('should get the customer', function() {

    return act('role:customer, cmd:find-by-id').then(function(results) {
      expect(results.entities).to.be.an('array');
      expect(results.count).to.be.a('number');
    });

  });

  it('should destroy the customer', function() {

    return act('role:customer, cmd:destroy-by-id').then(function(results) {
      expect(results.entities).to.be.an('array');
      expect(results.count).to.be.a('number');
    });

  });

});
