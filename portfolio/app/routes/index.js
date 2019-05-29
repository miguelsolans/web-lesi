const express   = require('express');
const router    = express.Router();
const async     = require('async');
const mongoose  = require('mongoose');


// Get Data Model Modules
const Education = require('../models/Education');
const Job       = require('../models/Jobs');
const Users     = require('../models/Users');
const Tags      = require('../models/Tags');

router.get('/test', function(req, res) {
    Tags.find()
        .select()
        .exec()
        .then(docs => {
            //console.log(docs);
            // docs[i].tag[ii];
            for(var i in docs) {
                console.log("{ ");
                for (var ii in docs[i].tag) {
                    console.log(docs[i].tag[ii]);
                }
                console.log(" } ");

            }
                console.log(docs[i].tag[0]);

            // for(var ii in docs[i].tag)
            // console.log(docs[0].tag[0]);
        })
});

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

// New Education
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

// Edit Education
router.get('/edit-education', (req, res) => {
    Education.find()
        .select()
        .exec()
        .then(docs => {
            res.render('edit-education', { education: docs})
        });
    // res.render('edit-education');
});



// Module Export: router
module.exports = router;