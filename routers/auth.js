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

router.post('/auth/customer/sign-up', signUp);
router.post('/auth/customer/sign-in', passport.authenticate('local', {session: false}), signIn);
router.post('/auth/customer/wechat/authenticate', passport.authenticate('wechat', {session: false}), signIn);
router.post('/auth/customer/wechat/callback', wechatCallback);

function wechatVerify(accessToken, refreshToken, profile, done) {
  return done(null, profile);
}

function wechatCallback(req, res, next) {
}

function signIn(req, res, next) {
  var customerId = req.user._id;

  jwt.sign({realm: 'customer'}, secret, {subject: customerId}, function(err, token) {
    res.json({token});
  });
}

function signUp(req, res, next) {
  console.log(req.body);
  var username = req.body.mobilePhoneNumber;
  var password = req.body.password;
  console.log(username);
  console.log(password);

  CustomerAccount.register(new CustomerAccount({username}), password, function(err) {
    console.log(arguments);
    res.json({msg: 'ok'});clear
  });
}

module.exports = router;
