const express   = require('express');
const router    = express.Router();
const async     = require('async');
const mongoose  = require('mongoose');


// Get Data Model Modules
const Education = require('../models/Education');
const Job       = require('../models/Jobs');
const Users     = require('../models/Users');
const Keywords  = require('../models/Keywords');

// Home
router.get('/', function(req, res) {
    var educationList = Education.find({});
    var jobsList      = Job.find({});
    var tagsList      = Keywords.find({});

    var resources = {
        education:  educationList.exec.bind(educationList),
        job:        jobsList.exec.bind(jobsList),
        tags:       tagsList.exec.bind(tagsList)
    };

    async.parallel(resources, function(error, result) {
        if (error) {
            res.status(500).send(error);
            return;
        }

        var tagsNames = "";

        for(var i in result.tags) {
            var tag = result.tags[i].tag;
            var tagArr = tag.split(';');

            for(var ii in tagArr) {
                tagArr[ii] = tagArr[ii].replace(/\s/g, '+');
            }
            tagsNames += result.tags[i].tag;
        }

        console.log(tagsNames);

        res.render('index', {
            education: result.education,
            job: result.job,
            tags: result.tags
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
router.get('/newdata', (req, res) => {
    res.render('newdata');
});
router.post('/new-education', (req, res) => {
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
router.post('/new-job', (req, res) => {
    const job = new Job({
        _id: new mongoose.Types.ObjectId(),
        company: req.body.company,
        link: req.body.link,
        description: req.body.description,
        flag: req.body.flag === 'true'
    });

    job.save()
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
            res.render('edit', { education: docs});
        });
    // res.render('edit-education');
});

router.get('/edit-education/:id', (req, res) => {
    console.log(req.params.id);

    Education.findOne({ _id: req.params.id })
        .select()
        .exec()
        .then(docs => {
            res.render('editdata', {education: docs});
        });
});

router.post('/update-education', (req, res) => {
    const educationId = req.body.educationId;

    var updateOps = {};
    for(const [key, value] of Object.entries(req.body)){
        updateOps[key] = value;
    }

    Education.update(
        {_id:educationId},
        {$set:updateOps})
        .exec()
        .then(result => {
            res.render('login')
        })
        .catch(err => console.log(err))
});

router.get('/delete-education/:id', (req, res) => {
    const educationId = req.params.id;
    console.log(req.params);
    // console.log(educationId);

    Education.deleteOne({ _id: educationId })
        .exec()
        .then(result => {
            Education.find().exec()
                .then(result => res.render('edit', { education: result, job: null }))
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
});


router.get('/edit-job', (req, res) => {
    Job.find()
        .select()
        .exec()
        .then(docs => {
            console.log(docs);
            res.render('edit', { education: null, job: docs});
        })
});

router.get('/edit-job/:id', (req, res) => {

    Job.findOne({ _id: req.params.id })
        .select()
        .exec()
        .then(docs => {
            res.render('editdata', {education: null, job: docs});
        });
});

router.get('/delete-job/:id', (req, res) => {
    const jobId = req.params.id;
    console.log(req.params);

    Job.deleteOne({ _id: jobId })
        .exec()
        .then(result => {
            Job.find().exec()
                .then(result => res.render('edit', { education: null, job: result }))
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
});


// Settings Page
router.get('/settings', (req, res) => {
    res.render('settings');
});



// Module Export: router
module.exports = router;