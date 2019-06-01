// Loading modules
// Express server
const express       = require('express');
const app           = express();
// Body Parser
const bodyParser    = require('body-parser'); // to handle form posts
// MongoDB
const mongoose      = require('mongoose');

// Configure Database
let db = 'mongodb://localhost:27017/portfolio';                   // Local
// let db = "mongodb+srv://miguelsolans:IAmForgetful" +
//     "@cluster0-ind49.mongodb.net/portfolio?retryWrites=true";

mongoose.connect(db, {
    useNewUrlParser: true
})
    .then(() => console.log('Database listenning'))
    .catch(err => console.log('Connection  error', err));

const connection = mongoose.createConnection(db);

connection.on('open', function() {
    connection.db.listCollections().toArray(function( err, collectionNames ){
        if(err) console.log(err);
        else {
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
// Routes for CRUD operations
const JobRoutes       = require('../app/routes/job/');
const EducationRoutes = require('../app/routes/education/');
const SettingsRoutes  = require('../app/routes/settings/');
// Webapp Portfolio Routes
app.use('/', PortfolioRoutes);
app.use('/admin', JobRoutes);
app.use('/admin', EducationRoutes);
app.use('/admin', SettingsRoutes);

// If any error occurs
app.use(function(req, res) {
    res.render('404');
});


// Codigo Prof
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({})
    }
});
// -----------

// Module Export
module.exports = app;