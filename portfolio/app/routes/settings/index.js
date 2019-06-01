// Managing Keywords Model
// MongoDB CRUD Operations
const express   = require('express');
const router    = express.Router();
const mongoose  = require('mongoose');

// Get Data Model Modules
const Tags       = require('../../models/Keywords');

/**
 * CREATE OPERATIONS
 * 1. Create new tag
 */
router.post('/new-tag', (req, res) => {
    const tag = new Tags({
        _id: new mongoose.Types.ObjectId(),
        tag: req.body.tag
    });

    tag.save()
        .then(result => {
            Tags.find().select().exec()
                .then(result => res.render('settings', { keyword: result }));
        })
        .catch(err => console.log(err))
});


/**
 * READ OPERATIONS
 * 1. Display data in table on settings page
 */
router.get('/settings', (req, res) => {

    Tags.find()
        .select()
        .exec()
        .then(docs => {
            res.render('settings', { keyword: docs })
        });
});

/**
 * UPDATE OPERATIONS
 * 1. Display Form to edit given keyword ID
 * 2. Update Tag from FORM values
 */
router.get('/edit-tag/:id', (req, res) => {
    Tags.findOne({ _id: req.params.id })
        .select()
        .exec()
        .then(docs => {
            res.render('editdata', { education: null, job: null, keyword: docs });
        })
});
router.post('/update-tag', (req, res) => {
    const tagId = req.body.tagId;

    console.log(req.body);

    var updateOps = {};
    for(const [key, value] of Object.entries(req.body)){
        updateOps[key] = value;
    }
    console.log(updateOps);

    Tags.update(
        { _id: tagId },
        { $set: updateOps })
        .exec()
        .then(result => {
            Tags.find().exec()
                .then(result => res.render('settings', { keyword:result } ));
        })
        .catch(err => console.log(err))
});


/**
 * DELETE OPERATIONS
 * 1. Delete certain tag
 */
router.get('/delete-tag/:id', (req, res) => {
    const tagId = req.params.id;

    Tags.deleteOne({ _id: tagId })
        .exec()
        .then(result => {
            Tags.find().exec()
                .then(result => res.render('settings', { keyword: result } ))
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
});


module.exports = router;