/*
 *
 * server 2 ›› this server is used to retrieve/read the cookie values
 *
 */
var express = require('express'),
    fs = require('fs'),
    http = require('http'),
    https = require('https'),
    privateKey  = fs.readFileSync('nobso.key', 'utf8'),
    certificate = fs.readFileSync('nobso.crt', 'utf8'),
    credentials = { 
        key: privateKey, 
        cert: certificate 
    },
    app,
    httpServer,
    httpsServer;

app = express();

// serving static files from the public directory
app.use('/', express.static(__dirname + '/public'));
app.use('/static', express.static(__dirname + '/public'));
app.use('/iframe', express.static(__dirname + '/public/iframe.html'));

// create a HTTP server
httpServer = http.createServer(app);
httpServer.listen(4000, function () {
    console.log('HTTP SERVER is running on PORT 4000');    
});

// create a HTTPS server
httpsServer = https.createServer(credentials, app);
httpsServer.listen(4443, function () {
    console.log('HTTPS SERVER is running on PORT 4443');    
});
