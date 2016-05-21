var CustomerAccount = require('../models/customer-account');

function findAll(args, done) {
  Promise.all([
    CustomerAccount.count(args),
    CustomerAccount.find(args)
  ]).spread(function(count, entities) {
    done({count, entities});
  }).catch(function(err) {
    done(err);
  });
};

module.exports = findAll;
