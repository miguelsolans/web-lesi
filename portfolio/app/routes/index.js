const express   = require('express');
const router    = express.Router();
const async     = require('async');
const mongoose = require('mongoose');


// Get Data Model Modules
const Education = require('../models/Education');
const Job       = require('../models/Jobs');
const Users     = require('../models/Users');

// Home
router.get('/', function(req, res) {
    var educationList = Education.find({});
    var jobsList      = Job.find({});

    var resources = {
        education: educationList.exec.bind(educationList),
        job: jobsList.exec.bind(jobsList)
    };

    async.parallel(resources, function(error, result) {
        if (error) {
            res.status(500).send(error);
            return;
        }
        res.render('index', {
            education: result.education,
            job: result.job
        });
    })
});

// Admin
router.get('/login', function(req, res) {
    res.render('login');
});
router.post('/admin', (req, res) => {

    Users.findOne()
        .select({username: req.body.username, password: req.body.password})
        .exec()
        .then(docs => {
            if(req.body.username === docs.username && req.body.password === docs.password) {
                res.render('admin');
            }
            else res.send("<h2>Couldn't Login</h2><p>Perhaps username doesn't have permission or the input password is wrong!</p>")
        })
});

/**
 * Administration Panel
 * CRUD Operations
 */
router.post('/newEducation', (req, res) => {
    const education = new Education({
        _id: new mongoose.Types.ObjectId(),
        school: req.body.school,
        course: req.body.course,
        link: req.body.link
    });

    education.save()
        .then(result => {
            res.render('admin');
        })
        .catch(err => console.log(err))
});



// Module Export: router
module.exports = router;