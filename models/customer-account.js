var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;

var customerAccountSchema = new Schema({
  name: String,
  avatar: String,
  wechatOpenId: String,
  username: {
    type: String,
    default: Date.now
  },
  mobilePhoneNumber: String,
  password: String
});

customerAccountSchema.plugin(passportLocalMongoose, {
  usernameField: 'mobilePhoneNumber',
  hashField: 'password'
});

var CustomerAccount = mongoose.model('CustomerAccount', customerAccountSchema);

module.exports = CustomerAccount;
