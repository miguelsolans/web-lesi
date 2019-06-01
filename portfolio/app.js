// Server configuration file
let app = require('./config/server');
// enable secure HTTP
const https     = require('https');
// File System
const fs        = require('fs');
// App Serving Port
let PORT = process.env.PORT || 3000;

// Create HTTP server with self signed SSL on PORT
https.createServer({
    key: fs.readFileSync('./ssl/server.key'),
    cert: fs.readFileSync('./ssl/server.cert')
}, app).listen(PORT, () => {
    console.log(`magic port on: ${PORT}`);
});