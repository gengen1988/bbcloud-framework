var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerAccountSchema = new Schema({
  name: String,
  avatar: String,
  wechatOpenId: String,
  socialRelationshipId: String,
  email: String,
  password: String,
  mobilePhoneNumber: String,
  createdAt: {type: Date, default: Date.now},
  updatedAt: Date,
  deletedAt: Date
});

var CustomerAccount = mongoose.model('CustomerAccount', customerAccountSchema);

module.exports = CustomerAccount;
