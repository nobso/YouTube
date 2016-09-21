var appCache = window.applicationCache,
    appCacheUpdate = function () {
        appCache.update();
        window.location.reload();
    };

// adding an event listener to the 'update' id
document.getElementById('update').addEventListener('click', appCacheUpdate);

appCache.onchecking = function () {
    console.log('checking...');
};

appCache.onerror = function () {
    console.log('error...');
};

appCache.onnoupdate = function () {
    console.log('no update ...');
};

appCache.ondownloading = function () {
    console.log('downloading....');
};

appCache.onprogress = function () {
    console.log('progressing ...');
};

appCache.onupdateready = function () {
    console.log('on update ready ...');
    //appCache.swapCache();
    //window.location.reload();
};

appCache.updateready = function () {
    console.log('swapping..');
    //appCache.swapCache();
};


appCache.oncached = function () {
    console.log('on cached ...');
};

appCache.onobsolete = function () {
    console.log('on obsolete ...');
};
