var CustomerAccount = require('../models/customer-account');
var customerAccountResource = require('../lib/resource')(CustomerAccount);

module.exports = function(seneca) {
  seneca.add('role:customer, cmd:find-all', customerAccountResource.findAll);
  seneca.add('role:customer, cmd:create', customerAccountResource.create);
  seneca.add('role:customer, cmd:find-by-id', customerAccountResource.findById);
  seneca.add('role:customer, cmd:update-by-id', customerAccountResource.updateById);
  seneca.add('role:customer, cmd:destroy-by-id', customerAccountResource.destroyById);
};
