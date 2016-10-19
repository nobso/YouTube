var express = require('express'),
    cookieParser = require('cookie-parser'),
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
app.use(cookieParser());
app.use(nodeinfo({url: '/node-info'}));

// event source
app.use('/stream.js', function ( req, res, next){ 

    // log the cookies that are sent by the requester
    console.info('REQUEST >> ', req.cookies);

    // make sure that you have a proper content-type
    res.set({
        'Content-Type': 'text/event-stream',
        'Access-Control-Allow-Origin': 'http://demo.sureshkm.com:5000',
        'Access-Control-Allow-Credentials': true
    });

    interval = setInterval(function() {
        requestedCount ++;

        fs.readFile('./public/stream-data', function (err, data) {
            if (requestedCount > 5000) {
                res.status(204).end();
                return;
            } else {
                res.write(data);
            }
        });
    }, 1000);

    req.connection.on("close", function () {
      clearInterval(interval);
    }, false);
});

// serving static files from the public directory
app.use('/', function (req, res, next) {
    res.setHeader('Set-Cookie', 'name=example; Domain=.example.com; Path=/;');
    console.log('REQUEST ›››', req.method, req.originalUrl);
    next();
}, express.static(__dirname + '/public'));

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
