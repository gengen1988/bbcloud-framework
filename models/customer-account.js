var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;

var customerAccountSchema = new Schema({
  name: String,
  avatar: String,
  wechatOpenId: String,
  mobilePhoneNumber: String,
  password: String
});

customerAccountSchema.plugin(passportLocalMongoose);

var CustomerAccount = mongoose.model('CustomerAccount', customerAccountSchema);

module.exports = CustomerAccount;
