const express = require('express');

const controller = require('../controller');

const router = express.Router();

router.route('/signin').get(controller.login).post(controller.doLogin);
router.get('/sessions', controller.renderSessionsPage);
router.get('/verifytoken', controller.verifySsoToken);

module.exports = router;
