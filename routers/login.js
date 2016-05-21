var router = require('express').Router();

router.get('/auth/customer/login', login);

function login(req, res) {
  res.json({msg: 'ok'});
}

module.exports = router;
