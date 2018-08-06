var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var Note = require('../models/note');
var sillyDate = require('silly-datetime');

router.get('/:file/:page', function (req, res, next) {
    Note.find({isShared:true,file:req.params.file,page:req.params.page})
        .populate('user', 'firstName')
        .exec(function (err, notes) {
            console.log(req.params.file,req.params.page);
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: notes
            });
        });
});

router.use('/', function (req, res, next) {
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

router.post('/:file/:page', function (req, res, next) {
    const decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, (err, user) => {
        if(err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        const note = new Note({
            content: req.body.content,
            user: user._id, //CHANGE HERE
            time: sillyDate.format(new Date(), 'YYYY-MM-DD HH:mm'),
            isShared: true,
            page: req.params.page,
            file: req.params.file
        });

        note.save(function(err, result) {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }

            user.notes.push(result);

            res.status(201).json({
                message: 'Saved note',
                user: user,
                obj: result
            });
            user.save();
        });
    });
});

router.patch('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Note.findById(req.params.id, function (err, note) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!note) {
            return res.status(500).json({
                title: 'No Note Found!',
                error: {message: 'Note not found'}
            });
        }
        if (note.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: {message: 'Users do not match'}
            });
        }
        note.content = req.body.content;
        note.isShared = req.body.isShared;
        note.save(function (err, result) {
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
});

router.delete('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Note.findById(req.params.id, function (err,note) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!note) {
            return res.status(500).json({
                title: 'No Note Found!',
                error: {message: 'Note not found'}
            });
        }
        if (note.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: {message: 'Users do not match'}
            });
        }
        note.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted note',
                obj: result
            });
        });
    });
});

router.get('/mynotes/:file/:page',function(req,res,next){
  var decoded = jwt.decode(req.query.token);
  Note.find({file:req.params.file,page:req.params.page,user: decoded.user._id}, (err, result)=>{
    if(err) {
        console.log(err);
        return res.status(500).json({
            title: 'An error occurred',
            error: err
        });
    }
    res.status(200).json({
        message: 'Success',
        obj: result
    });
  });
});

module.exports = router;
