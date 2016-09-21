/*
 *
 * server 1 ›› this server is used to set the cookie values
 *
 */
var express = require('express'),
    cookieParser = require('cookie-parser'),
    fs = require('fs'),
    colors = require('colors'),
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
app.use(cookieParser());

app.get('/', function (req, res) {

    // just log the cookie info thats attached to this request
    console.info('\n', req.cookies);

    res.setHeader('Set-Cookie', 'name=sureshkm; Expires=Monday, August 8, 2016 10:18:14 GMT; Max-Age=100; Domain=.example.com; Path=/static; Secure; HttpOnly;');

    // throw some HTML markup
    res.send('<html><body style="font-size: 50px; background: #FF7043;">Hello YouTube! <br> I\'m setting the cookies</body></html>');
});

// create a HTTP server
httpServer = http.createServer(app);
httpServer.listen(3000, function () {
    console.log('HTTP SERVER-1 is running on PORT 3000');    
});

// create a HTTPS server
httpsServer = https.createServer(credentials, app);
httpsServer.listen(3443, function () {
    console.log('HTTPS SERVER-1 is running on PORT 3443');    
});
