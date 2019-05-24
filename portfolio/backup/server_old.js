// Loading modules
// HTTPS
const https         = require('https');
// File System
const fs            = require('fs');
// Express server
const express       = require('express');
const app           = express();
// Body Parser
const bodyParser    = require('body-parser'); // to handle form posts
// MongoDB
const MongoClient   = require('mongodb').MongoClient;






// Serving static files
app.use(express.static(__dirname + '/public'));

// ejs
app.set('view engine', 'ejs');

// urlencoded tells body-parser to extract data from <from>
app.use(bodyParser.urlencoded({extended: true}));

// Establishing HTTPS and server to Port 3000
https.createServer({
    key: fs.readFileSync('ssl/server.key'),
    cert: fs.readFileSync('ssl/server.cert')
}, app).listen(3000, () => {
    console.log('Listening...')
});

// Connection to MongoDB
var db;
MongoClient.connect('mongodb://localhost:27017', (err, client) => {
    // ... start the server
    // If there was an error establishing connection to mongodb
    if(err) return console.log(err);

    // get DB name
    db = client.db('portfolio');
    // console.log(db);

});

// req : request
// res : response
// app.get('/', function(req, res) {
//     res.send("Hello World!");
// });

// app.get('/', function(req, res) {
//     res.sendFile(__dirname + "/index.html");
// });

/** Main Route
 * Get index page
 * req: Client Request
 * res: Server Response
 */
app.get('/', (req, res) => {
    db.collection('education').find().toArray((err, result) => {
        if (err) console.log(err);

        db.collection('jobs').find().toArray((err, jobsResult) => {
            if (err) console.log(err);

            res.render('index.ejs', {
                education: result,
                job: jobsResult
            })
        });
    });
});

/** Route: Editing Education
 * Get index page
 * req: Client Request
 * res: Server Response
 */
app.get('/edit-education', (req, res) => {
    console.log("Editing Education");

    db.collection('education').find().toArray((err, result) => {
        if (err) console.log(err);

        res.render('edit-education.ejs', {
            education: result
        });
    });
});

app.get('/login', (req, res) => {
    res.render('login.ejs');
});

app.get('/forgot', (req, res) => {
    res.send('<h3>Reset Password</h3>');
});

app.post('/admin', (req, res) => {
    console.log(req.body);
    // SELECT * FROM users WHERE username = something and password = somethingElse
    db.collection('users').find({username: req.body.username, password: req.body.password}).toArray(function(err, result) {
        if(result.length !== 0) {
            res.render('admin.ejs');
        }
        else {
            res.send("<h2>Couldn't Login</h2>");
        }
    })
});

// Create Operatons
app.post('/newEducation', (req, res) => {
    var education = {
        school: req.body.school,
        course: req.body.course
    };
    db.collection('education').insertOne(education, function(err, res) {
        if (err) throw err;
        console.log("New Education Added");
    });
});
app.post('/admin', (req, res) => {
    console.log(req.body);

    var job = {
        company: req.body.company,
        description: req.body.description
    };

    job.flag = req.body.flag === 'true' ? true : false;

    db.collection('jobs').insertOne(job, function(err, res) {
        if (err) throw err;
        alert("New Job Added")
    });
    res.render('login.ejs')
});


app.get('/test', function(req, res) {
    db.collection('education').find().toArray(function(err, result) {
        console.log(result);
    });
});

/** Route: Anything else not defined
 * Renders not found page
 * req: Client Request
 * res: Server Response
 */
app.get('*', function(req, res){
    res.render('404.ejs');
});