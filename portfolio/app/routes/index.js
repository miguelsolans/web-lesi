const express   = require('express');
const router    = express.Router();
const mongoose  = require('mongoose');
// Get Data Model Modules
const Education = require('../models/Education');
const Job       = requuire('../models/Jobs');
// const Jobs      = require('../models/Jobs');

// Home
router.get('/', function(req, res) {
    var educationList = Education.find({});
    var jobsList      = Job.find({});


    /*
    app.get('/admin/liste', isLoggedIn, function(req, res) {
    var List1 = mongoose.model('List1');
    var List2 = mongoose.model('List2');

    var List1Objects = List1.find({});
    var List2Objects = List2.find({});
    var resources = {
        firstlist: List1Objects.exec.bind(List1Objects),
        seclist: List2Objects.exec.bind(List2Objects)
    };

    async.parallel(resources, function (error, results){
        if (error) {
            res.status(500).send(error);
            return;
        }
        res.render('admin/liste', results);
    });
});
     */
    // Education.find()
    //     .select()
    //     .exec()
    //     .then(docs => {
    //
    //
    //         res.render('index', {
    //             education: docs,
    //             job: []
    //         });
    //     });
});

// Admin
router.get('/admin', function(req, res) {
    res.render('login');
});

// Module Export: router
module.exports = router;