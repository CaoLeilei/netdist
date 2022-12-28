const express = require('express');
const router = express.Router();
const fileControllers = require('./filesController');

/* GET home page. */
router.get('/list', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/upload', fileControllers.uploadFile)

module.exports = router;