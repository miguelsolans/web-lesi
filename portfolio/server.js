const express = require('express');
const bodyParser= require('body-parser'); // to handle form posts
const app = express();


app.use(express.static(__dirname + '/public'));

// ejs
app.set('view engine', 'ejs');

// urlencoded tells body-parser to extract data from <from>
app.use(bodyParser.urlencoded({extended: true}));


app.listen(3000, function() {
    console.log("Magic Port: 3000");
});


const MongoClient = require('mongodb').MongoClient;
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

//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res){
    res.render('404.ejs');
});

app.get('/', (req, res) => {
    var education = {};
    var jobs = {};
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
app.post('/newJob', (req, res) => {
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