const express = require('express');
const router = express.Router();
const multer = require('multer');
var pdfToImg = require('./pdfToImg.service')

var fileName;

var storage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
    cb(null, 'storage/');
  },
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    fileName = file.originalname;
    cb(null, file.originalname);
  }
});

var upload = multer({ //multer settings
                    storage: storage
                  }).single('file');

router.post('/', function(req, res) {
  upload(req,res, async function(err){
    if(err){
      console.log(err);
      res.json({error_code:1,err_desc:err});
      return;
    }

    // setTimeout(() => res.json({error_code:0,err_desc:null}), 1000);
    // var x=-1;
    pdfToImg(fileName,res);
    // res.json({error_code:0,err_desc:null,x});
  });



  // file.save(function(err, result)) {
  //   if(err) {
  //       return res.status(500).json({
  //           title: 'An error occurred',
  //           error: err
  //       });
  //   }
  //   .messages.push(result);
  //
  //   res.status(201).json({
  //       message: 'Saved message',
  //       obj: result
  //   });
  //   user.save();
  // }

});


module.exports = router;
