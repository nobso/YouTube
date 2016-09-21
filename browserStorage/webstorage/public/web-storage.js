// get the local storage object
var lStorage = window.localStorage;

// setting a local name/value
document.getElementById("setLocal").addEventListener("click", function() {
    var localName = document.getElementById('local-storage-name').value,
        localValue = document.getElementById('local-storage-value').value;

    if (localValue && !(/^\s+$/g.test(localValue))) {

        // window.localStorage.setItem('key', 'value');
        lStorage.setItem(localName, localValue);

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
        noData = '<tr><td colspan="3">The local storage is empty</td></tr>',
        data = '',
        dataIndex;

    
    if (lStorage.length) {
        for (dataIndex in lStorage) {
            data += '<tr><td>' + dataIndex + '</td><td>' + 
                lStorage[dataIndex] + '</td><td><input class="rm" type="button" value="Remove" onClick="rmItem(\'' + dataIndex + '\');"></td></tr>';
        };
        data += '<tr><td colspan="3"><input class="rm" type="button" value="Clear all" onClick="clearItems();"></td></tr>';
        document.getElementById('data-table').innerHTML = tableHTML + data;
    } else {
        document.getElementById('data-table').innerHTML = tableHTML + noData;
    }
};

var rmItem = function (itemKey) {

    // window.localStorage.removeItem('key');
    lStorage.removeItem(itemKey); 
    updateTable();
};

var clearItems = function () {

    // window.localStorage.clear();
    lStorage.clear(); 
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

// initialize with local store data
updateTable();
