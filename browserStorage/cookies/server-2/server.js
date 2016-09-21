/*
 *
 * server 2 ›› this server is used to retrieve/read the cookie values
 *
 */
var express = require('express'),
    fs = require('fs'),
    http = require('http'),
    https = require('https'),
    privateKey  = fs.readFileSync('/private/etc/apache2/server.key', 'utf8'),
    certificate = fs.readFileSync('/private/etc/apache2/server.crt', 'utf8'),
    credentials = { 
        key: privateKey, 
        cert: certificate 
    },
    app,
    httpServer,
    httpsServer;

app = express();

// serving static files from the public directory
app.use('/static', express.static(__dirname + '/public'));

// create a HTTP server
httpServer = http.createServer(app);
httpServer.listen(4000, function () {
    console.log('HTTP SERVER-2 is running on PORT 4000');    
});

// create a HTTPS server
httpsServer = https.createServer(credentials, app);
httpsServer.listen(4443, function () {
    console.log('HTTPS SERVER-2 is running on PORT 4443');    
});
