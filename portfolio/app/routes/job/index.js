// Managing Jobs Model
// MongoDB CRUD Operations
const express   = require('express');
const router    = express.Router();
const mongoose  = require('mongoose');

// Get Data Model Modules
const Job       = require('../../models/Jobs');

// New Job
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

// List jobs for editing
router.get('/edit-job', (req, res) => {
    Job.find()
        .select()
        .exec()
        .then(docs => {
            console.log(docs);
            res.render('edit', { education: null, job: docs} );
        })
});

// Edit a job
router.get('/edit-job/:id', (req, res) => {

    Job.findOne({ _id: req.params.id })
        .select()
        .exec()
        .then(docs => {
            res.render('editdata', {education: null, job: docs});
        });
});

// Delete a Job
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

module.exports = router;