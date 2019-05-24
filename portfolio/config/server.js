// Loading modules
// Express server
const express       = require('express');
const app           = express();
// Body Parser
const bodyParser    = require('body-parser'); // to handle form posts
// MongoDB
const MongoClient   = require('mongodb').MongoClient;
const mongoose      = require('mongoose')

// Configure Database
let db = 'mongodb://localhost:27017/portfolio';
const Education = require('../app/models/Education');

mongoose.connect(db, {
    useNewUrlParser: true,
});

const connection = mongoose.createConnection(db);

connection.on('open', function() {
    connection.db.listCollections().toArray(function( err, collectionNames ){
        if(err) console.log(err);
        else {
            // console.log(collectionNames);
            connection.close();
        }
    })
});

// Tell node where public files are located
app.use(express.static('./app/public'));

// Setup EJS View Engine
app.set('view engine', 'ejs');
app.set('views', './app/views');

// urlencoded tells body-parser to extract data from <from>
app.use(bodyParser.urlencoded({
    extended: true
}));

// To read it in JSON
app.use(bodyParser.json());

// Define Routes
const PortfolioRoutes = require('../app/routes/');

// Webapp Portfolio Routes
app.use('/', PortfolioRoutes);

// If any error occurs
app.use(function(req, res) {
    res.render('404');
});

// Module Export
module.exports = app;