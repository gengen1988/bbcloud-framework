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

passport.use(CustomerAccount.createStrategy());
passport.use(new WeChatStrategy(wechatOpts, wechatVerify));

router.post('/customer/auth/signup', signup);
router.post('/customer/auth/login', passport.authenticate('local', {session: false}), issueTokenForLocal);
router.post('/customer/auth/wechat/authenticate', passport.authenticate('wechat', {session: false}), issueTokenForWeChat);
router.get(nconf.get('wechat:callbackUrl'), wechatCallback);

function wechatVerify(accessToken, refreshToken, profile, done) {
  return done(null, profile);
}

function wechatCallback(req, res, next) {
}

function issueTokenForWeChat(req, res, next) {
}

function issueTokenForLocal(req, res, next) {
  var customerId = req.user._id.toString();
  jwt.sign({realm: 'customer'}, secret, {subject: customerId}, function(err, token) {
    if (err) return next(err);
    res.json({token});
  });
}

function signup(req, res, next) {
  var mobilePhoneNumber = req.body.mobilePhoneNumber;
  var password = req.body.password;
  CustomerAccount.register(new CustomerAccount({mobilePhoneNumber}), password, function(err) {
    if (err) return next(err);
    res.json({msg: 'ok'});
  });
}

module.exports = router;
