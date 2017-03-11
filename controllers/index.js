const express = require('express');
const router = express.Router();
const la = require('./../helpers/fileCompressor');
const pathToZipArchiv = "./thief-box/"

/* GET home page. */
router.get('/', function(req, res, next) {
  la.fileCompressor("asdasd", pathToZipArchiv + "aroksetx.com")
  res.render('index', { title: 'This websait is web thief!' });
});

module.exports = router;
