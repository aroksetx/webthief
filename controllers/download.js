const express = require('express');
const router = express.Router();
const config = require('./../config');

router.get('/', function (req, res, next) {
    // var file = config.path.applicationPath + config.path.zipStorage +'aHR0cDovL2Fyb2tzZXR4LmNvbS9hYm91dC1tZS5odG1sTW9uIE1hciAxMyAyMDE3IDAwOjQyOjA4IEdNVCswMjAwIChFRVQp.zip';
    // console.log(file)
    // res.download(file); // Set disposition and send it.
    res.send("alasdlalsdlasldl")
});


router.get('/:fileName', function (req, res, next) {
    let filePath = config.path.applicationPath + config.path.zipStorage;
    res.download(filePath + req.params.fileName + ".zip");
})


module.exports = router;