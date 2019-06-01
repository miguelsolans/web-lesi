// Managing Keywords Model
// MongoDB CRUD Operations
const express   = require('express');
const router    = express.Router();
const mongoose  = require('mongoose');

// Get Data Model Modules
const Tags       = require('../../models/Keywords');


router.get('/settings', (req, res) => {
    res.render('settings');
});


module.exports = router;