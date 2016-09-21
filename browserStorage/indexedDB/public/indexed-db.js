var iDB = window.indexedDB
    request = iDB.open('frameworks', 1);


    console.log(request);

request.onupgradeneeded = function (e) {
    var dbHandler = e.target.result, // request.result
        storeHandler = dbHandler.createObjectStore('css', { keyPath: 'id', autoIncrement: true } ),
        record1 = {
            id: 1,
            name: 'bootstrap',
            grid: 12,
            isResponsive: true
        },
        record2 = {
            id: 2,
            name: 'pure',
            grid: 24,
            isResponsive: true
        },
        record3 = {
            name: 'skeleton',
            grid: 12,
            isResponsive: true
        },
        record4 = {
            name: 'foundation',
            grid: 12,
            isResponsive: true
        };

    storeHandler.createIndex('nameIndex', 'name', { unique: true });

    storeHandler.add(record1);
    storeHandler.put(record2);
    storeHandler.add(record3);
    var storeRequest = storeHandler.add(record4);

    storeRequest.onsuccess = function () {
        console.log('Store ›› success');
    };

    storeRequest.onerror = function (e) {
        e.stopPropagation();
        console.log('Store ›› failed', e);
    };

    console.log(storeRequest);

    console.log('upgraded');
};

request.onerror = function (e) {
    console.log('failed', e);
};

request.onsuccess = function (e) {
    var dbHandler = e.target.result;
        transaction = dbHandler.transaction(['css'], 'readwrite'),
        storeHandler = transaction.objectStore('css');

    transaction.onerror = function (e) {
        console.log(e);
    };

    //storeHandler.get(3).onsuccess = function (e) {
    //   console.log(e.target.result); 
    //};

    storeHandler.put({
        id: 5,
        name: 'kube',
        grid: 12,
        isResponsive: false
    });

    var keyRange = window.IDBKeyRange.bound(1, 4, true, true);

    storeHandler.openCursor(3, 'next').onsuccess = function (e) {
        var cursor = e.target.result;

        if (cursor) {
            console.log(cursor.value);
            cursor.continue();
        } else {
            console.log('no entries..');
        }
        
    };

    /*
    var index = storeHandler.index('nameIndex');

    index.get('kube').onsuccess = function (e) {
        console.log(e.target.result);
    };

    var keyRange = IDBKeyRange.bound('bootstrap', 'kube', false, false);

    index.openCursor(keyRange, 'next').onsuccess = function (e) {
        var cursor = e.target.result;

        if (cursor) {
            console.log(cursor.value);
            cursor.continue();
        } else {
            console.log('no entries..');
        }
    };
    */

    console.log('success');
};
