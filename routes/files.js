 var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Note = require('../models/note');

var File = require('../models/file');

router.get('/', function (req, res, next) {
    File.find({},(err, files) => {
      if (err) {
          return res.status(500).json({
              title: 'An error occurred',
              error: err
          });
      }
      res.status(200).json({
          message: 'Success',
          obj: files
      });
    });
});

router.get('/:depName',function(req, res, next){
    var reg = new RegExp(req.params.depName, 'i');
    File.find({moduleCode:{$regex:reg}},(err,files)=>{
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      res.status(200).json({
        message: 'Success',
        obj: files
      })
    })
});

router.post('/', function (req, res, next) {
    console.log("body",req.body);
    const file = new File({
      moduleCode: req.body.moduleCode,
      weekNum: req.body.weekNum,
      intro: req.body.intro
    });
    file.save(function(err, result) {
      if(err) {
          console.log(err);
          return res.status(500).json({
              title: 'An error occurred',
              error: err
          });
      }
      res.status(201).json({
          message: 'Saved message',
          obj: result
      });
  });
});

module.exports = router;
