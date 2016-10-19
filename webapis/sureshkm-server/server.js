var express = require('express'),
    fs = require('fs'),
    http = require('http'),
    https = require('https'),
    nodeinfo = require('node-info'),
    privateKey  = fs.readFileSync('nobso.key', 'utf8'),
    certificate = fs.readFileSync('nobso.crt', 'utf8'),
    credentials = { 
        key: privateKey, 
        cert: certificate 
    },
    app,
    httpServer,
    httpsServer,
    interval,
    requestedCount = 0;

app = express();
app.use(nodeinfo({url: '/node-info'}));

// serving static files from the public directory
app.use('/', function (req, res, next) {

    // setting the sureshkm.com cookie
    res.setHeader('Set-Cookie', 'name=sureshkm; Domain=.sureshkm.com; Path=/;');

    console.log('REQUEST ›››', req.method, req.originalUrl);
    next();
}, express.static(__dirname + '/public'));

// create a HTTP server
httpServer = http.createServer(app);
httpServer.listen(5000, function () {
    console.log('HTTP SERVER is running on PORT 5000');    
});

// create a HTTPS server
httpsServer = https.createServer(credentials, app);
httpsServer.listen(5443, function () {
    console.log('HTTPS SERVER is running on PORT 5443');    
});
