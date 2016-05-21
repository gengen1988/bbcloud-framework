var CustomerAccount = require('../models/customer-account');

/**
 * @param limit
 * @param sort
 */
function findAll(args, done) {
  Promise.all([
    CustomerAccount.count(),
    CustomerAccount.find()
  ]).spread(function(count, entities) {
    done(null, {count, entities});
  }).catch(function(err) {
    done(err);
  });
};

module.exports = findAll;
