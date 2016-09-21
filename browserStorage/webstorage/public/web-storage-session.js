// get the session storage object
var sStorage = window.sessionStorage;

// setting a session name/value
document.getElementById("setSession").addEventListener("click", function() {
    var sessionName = document.getElementById('session-storage-name').value,
        sessionValue = document.getElementById('session-storage-value').value;

    if (sessionValue && !(/^\s+$/g.test(sessionValue))) {

        // window.sessionStorage.setItem('key', 'value');
        sStorage.setItem(sessionName, sessionValue);

        // clear the inputs
        clearInputs();

        // update table
        updateTable();
    }
});


// clear all the inputs after the successfull updates
var clearInputs = function () {
    var allInputElements = document.querySelectorAll('input[type="text"]'),
        elementIndex,
        elementsLength = allInputElements.length;

    for (elementIndex = 0; elementIndex < elementsLength; elementIndex++) {
        allInputElements[elementIndex].value = '';
    }
};


// i never put HTML markup in the JS, this is just for a web storage DEMO 
var updateTable = function () {
    var tableHTML = '<thead><tr><th>Name</th><th>Value</th><th>&nbsp;</th></tr></thead>',
        noData = '<tr><td colspan="3">The session storage is empty</td></tr>',
        data = '',
        dataIndex;

    
    if (sStorage.length) {
        for (dataIndex in sStorage) {
            data += '<tr><td>' + dataIndex + '</td><td>' + 
                sStorage[dataIndex] + '</td><td><input class="rm" type="button" value="Remove" onClick="rmItem(\'' + dataIndex + '\');"></td></tr>';
        };
        data += '<tr><td colspan="3"><input class="rm" type="button" value="Clear all" onClick="clearItems();"></td></tr>';
        document.getElementById('data-table').innerHTML = tableHTML + data;
    } else {
        document.getElementById('data-table').innerHTML = tableHTML + noData;
    }
};

var rmItem = function (itemKey) {

    // window.sessionStorage.removeItem('key');
    sStorage.removeItem(itemKey); 
    updateTable();
};

var clearItems = function () {

    // window.sessionStorage.clear();
    sStorage.clear(); 
    updateTable();
};

// storage event is triggered while using setItme, removeItem and clear()
window.addEventListener("storage", function (e) {
    if (!e.oldValue && e.newValue) {
        console.log('The web storage key (' + e.key + ') is added to the web store.');    
        updateTable();
    } else if (!e.newValue && e.oldValue) {
        console.log('The web storage key (' + e.key + ') is removed from the web store.');    
        updateTable();
    } else if (!e.newValue && !e.oldValue) {
        console.log('The web store is cleared.');    
        updateTable();
    }
});

// initialize with session store data
updateTable();
