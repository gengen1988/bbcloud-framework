var CustomerAccount = require('../models/customer-account');
var router = require('express').Router();
var passport = require('passport');
var LocalStrategy = require('passport-local');
var WeChatStrategy = require('passport-wechat');
var nconf = require('nconf');
var jwt = require('jsonwebtoken');

var secret = nconf.get('secret');

var wechatOpts = {
  appID: nconf.get('wechat:appId'),
  appSecret: nconf.get('wechat:appSecret'),
  client: nconf.get('wechat:client'),
  callbackURL: nconf.get('wechat:callbackUrl'),
  scope: nconf.get('wechat:scope'),
  state: nconf.get('wechat:state')
};

passport.use(new LocalStrategy(CustomerAccount.authenticate()));
passport.use(new WeChatStrategy(wechatOpts, wechatVerify));

router.post('/auth/customer/login', passport.authenticate('local', {session: false}), signIn);
router.post('/auth/customer/wechat/authenticate', passport.authenticate('wechat', {session: false}), signIn);
router.post('/auth/customer/register', signUp);

function wechatVerify(accessToken, refreshToken, profile, done) {
  return done(null, profile);
}

function signIn(req, res, next) {
  var customerId = req.user._id;

  jwt.sign({realm: 'customer'}, secret, {subject: customerId}, function(err, token) {
    res.json({token});
  });
}

function signUp(req, res, next) {
  var mobilePhoneNumber = req.body.mobilePhoneNumber;
  var password = req.body.password;

  CustomerAccount.register(new CustomerAccount({mobilePhoneNumber}), password, function(err) {
    res.json({msg: 'ok'});
  });
}

module.exports = router;
