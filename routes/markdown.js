var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var Markdown = require('../models/markdown');

router.use('/', function (req, res, next) {
    console.log('77777');
    jwt.verify(req.query.token, 'secret', function (err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });

        }
        next();
    })
});

router.post('/:file', function (req, res, next) {
    const decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, (err, user) => {
        if(err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        Markdown.find({file:req.params.file,user: decoded.user._id}, (err, markdown)=>{
          if (err) {
              return res.status(500).json({
                  title: 'An error occurred',
                  error: err
              });
          };
          markdown[0].content=req.body.content;
          console.log('markdown=',markdown[0]);
          markdown[0].save(function (err, result) {
              if (err) {
                  return res.status(500).json({
                      title: 'An error occurred',
                      error: err
                  });
              }
              res.status(200).json({
                  message: 'Updated note',
                  obj: result
              });
          });
        });

        // const markdown = new Markdown({
        //     content: req.body.content,
        //     user: user._id, //CHANGE HERE
        //     file: req.params.file
        // });
        //
        // markdown.save(function(err, result) {
        //     if(err) {
        //         console.log(err);
        //         return res.status(500).json({
        //             title: 'An error occurred',
        //             error: err
        //         });
        //     }
        //     res.status(201).json({
        //         message: 'Saved markdown',
        //         user: user,
        //         obj: result
        //     });
        // });
    });
});

router.get('/:file',function(req,res,next){
  console.log('888888888');
  var decoded = jwt.decode(req.query.token);
  Markdown.find({file:req.params.file,user: decoded.user._id}, (err, result)=>{
    if(err) {
        console.log('999999');
        console.log('getMDerr=',err);
        return res.status(500).json({
            title: 'An error occurred',
            error: err
        });
    }
    console.log(result);
    if (result.length==0){
      const markdown = new Markdown({
          content: 'Type **Markdown** here.',
          user: decoded.user._id, //CHANGE HERE
          file: req.params.file
      });
      markdown.save();
      result=markdown;
    } else {
      result=result[0];
    }
    res.status(200).json({
        message: 'Success',
        obj: result
    });

  });
});

module.exports = router;
