// Managing Jobs Model
// MongoDB CRUD Operations
const express   = require('express');
const router    = express.Router();
const mongoose  = require('mongoose');

// Get Data Model Modules
const Education = require('../../models/Education');

/**
 * CREATE OPERATIONS
 * 1. Display form to create new Education
 */
router.post('/new-education', (req, res) => {
    const education = new Education({
        _id: new mongoose.Types.ObjectId(),
        school: req.body.school,
        course: req.body.course,
        link: req.body.link
    });

    education.save()
        .then(result => {
            Education.find().exec()
                .then(result => res.render('edit', { education: result, job: null, keyword: null } ))
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err))
});

/**
 * READ OPERATIONS
 * 1. Display Education in a table
 */
router.get('/edit-education', (req, res) => {
    Education.find()
        .select()
        .exec()
        .then(docs => {
            res.render('edit', { education: docs, job: null, keyword: null } );
        });
});

/**
 * UPDATE OPERATIONS
 */
router.get('/edit-education/:id', (req, res) => {
    console.log(req.params.id);

    Education.findOne({ _id: req.params.id })
        .select()
        .exec()
        .then(docs => {
            res.render('editdata', { education: docs, job: null, keyword: null } );
        });
});
router.post('/update-education', (req, res) => {
    const educationId = req.body.educationId;

    var updateOps = {};
    for(const [key, value] of Object.entries(req.body)){
        updateOps[key] = value;
    }

    Education.update(
        { _id:educationId },
        { $set:updateOps })
        .exec()
        .then(result => {
            Education.find().exec()
                .then(result => res.render('edit', { education: result, job: null, keyword: null } ))
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err))
});

/**
 * DELETE OPERATIONS
 */
router.get('/delete-education/:id', (req, res) => {
    const educationId = req.params.id;
    console.log(req.params);
    // console.log(educationId);

    Education.deleteOne({ _id: educationId })
        .exec()
        .then(result => {
            Education.find().exec()
                .then(result => res.render('edit', { education: result, job: null, keyword: null } ))
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
});


module.exports = router;