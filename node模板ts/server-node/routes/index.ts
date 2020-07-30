var express = require('express');
var router = express.Router();
import path = require("path");
import formidable = require("formidable");
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/upload', function (req, res, next) {
  const form = new formidable.IncomingForm();
  form.encoding = "utf-8";
  form.uploadDir = path.join(__dirname, '../files/img/');
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) { return };
    const { img } = files;
    console.log(img)
    const currentName = img.path.split('upload_')[1];
    res.json("upload_"+currentName)
    // console.log(currentName)
  })
});
module.exports = router;
