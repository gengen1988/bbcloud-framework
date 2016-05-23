var CustomerAccount = require('../models/customer-account');
var services = require('../lib/resource')(CustomerAccount);

module.exports = services;
