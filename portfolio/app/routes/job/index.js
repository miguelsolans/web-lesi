// Managing Jobs Model
// MongoDB CRUD Operations
const express   = require('express');
const router    = express.Router();
const mongoose  = require('mongoose');

// Get Data Model Modules
const Job       = require('../../models/Jobs');

/**
 * CREATE OPERATIONS
 * 1. Display form the create new job
 */
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
            Job.find().exec()
                .then(result => res.render('edit', { education: null, job: result, keyword: null } ))
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err))
});

/**
 * READ OPERATIONS
 * 1. Display table with Jobs
 */
router.get('/edit-job', (req, res) => {
    Job.find()
        .select()
        .exec()
        .then(docs => {
            console.log(docs);
            res.render('edit', { education: null, job: docs, keyword: null } );
        })
});

/**
 * UPDATE OPERATIONS
 * 1. Display Form to edit given job ID
 * 2. Update Job from FORM values
 */
router.get('/edit-job/:id', (req, res) => {

    Job.findOne({ _id: req.params.id })
        .select()
        .exec()
        .then(docs => {
            res.render('editdata', { education: null, job: docs, keyword: null } );
        });
});
router.post('/update-job', (req, res) => {
    const jobId = req.body.jobId;

    var updateOps = {};
    for(const [key, value] of Object.entries(req.body)){
        updateOps[key] = value;
        console.log(value);
    }

    console.log(updateOps);

    Job.update(
        {_id:jobId},
        {$set:updateOps})
        .exec()
        .then(result => {
            Job.find().exec()
                .then(result => res.render('edit', { education: null, job: result, keyword: null } ))
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err))
});

/**
 * DELETE OPERATIONS
 * 1. Delete certain tag
 */
router.get('/delete-job/:id', (req, res) => {
    const jobId = req.params.id;
    console.log(req.params);

    Job.deleteOne({ _id: jobId })
        .exec()
        .then(result => {
            Job.find().exec()
                .then(result => res.render('edit', { education: null, job: result, keyword: null } ))
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
});

module.exports = router;