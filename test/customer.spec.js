var senecaLib = require('seneca');
var expect = require('chai').expect;
var Promise = require('Promise');

describe('customer', function() {

  it('should return a list of customer', function() {

    var seneca = senecaLib(opts).use('..');
    var act = Promise.promisify(seneca.act, {context: seneca});
    return act('role:customer, cmd:find-all').then(function(results) {
      expect(results.entities).to.be.an('array');
      expect(results.count).to.be.a('number');
    });

  });

});
