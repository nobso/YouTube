var express = require('express'),
    bodyParser = require('body-parser'),
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
app.use(bodyParser.json({type: ['application/json', 'application/csp-report']}));


app.use('/csp-report', function (req, res, next) {
    console.log(req.body);
    res.end();
});

// serving static files from the public directory
app.use('/', function (req, res, next) {
    console.log('REQUEST ›››', req.method, req.originalUrl);
    res.setHeader('Content-Security-Policy-Report-Only', "style-src 'self'; report-uri http://example.com:5000/csp-report report-to http://example.com:5000/csp-report");
    res.setHeader('Content-Security-Policy', "script-src 'self' 'nonce-MYNONCE'; img-src 'self' http://www.ghread.me; report-uri http://example.com:5000/csp-report");
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
