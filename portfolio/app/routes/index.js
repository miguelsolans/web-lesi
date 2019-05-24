const express   = require('express');
const router    = express.Router();
// Get Data Model Modules
const Education = require('../models/Education');
// const Jobs      = require('../models/Jobs');




// Home
router.get('/', function(req, res) {

    // Movie.find({}, function (err, movies) {
    //     var allMovies = {};

    //     movies.forEach(function (movie) {
    //         allMovies[movies._id] = movie;
    //     });

    //     res.render('index', {
    //         movies: movies
    //     });
    // });

    Education.find({}, function(err, education) {

        res.render('index', {
            education: education,
            job: []
        })
    })

    // res.render('index', {education: [], job: []});
});

// Admin
router.get('/admin', function(req, res) {
    res.render('login');
});

// Module Export: router
module.exports = router;