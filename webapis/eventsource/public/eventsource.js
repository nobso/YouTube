//https://www.w3.org/TR/eventsource/
var message = document.getElementById('message'),
    connectionStatus = document.getElementById('status'),
    source;

function makeConnection() {
    source = new EventSource('http://example.com:4000/stream.js');


    source.onopen = function (e) {
        console.log('the connection is open');
    };

    //source.onmessage = function (e) {
    //    console.log(e.data);
    //};

    source.addEventListener('message', function (e) {
        var data = e.data.split('\n');
        console.log(data[0]);
        console.log('<>');
        console.log(data[1]);
    });

    source.addEventListener('welcome', function (e) {
        console.log('welcome event data: ', e.data);
    });

    source.onerror = function (e) {
        console.log('oh.. there is an error buddy');
    };
}

if (!!window.EventSource) {
    makeConnection();
} else {
    // sorry! buddy, your browser doesn't support EventSource feature
}
