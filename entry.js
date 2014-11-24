var Compiler = require("angular-gettext-tools/lib/compile");
var compilerInst = new Compiler({format: 'json'});
var saveAs = require("filesaver.js");


function getLoadedCallback(originalFileName) {
    console.log('Processing' + originalFileName);
    if (originalFileName.match(new RegExp(/.*\.pot?/)) == null) {
        alert('Only .po and .pot files are supported');
        return function () {
        };
    }
    var jsonFileName = (originalFileName + '$').replace(/\.pot?\$/, '.json')

    return function (event) {
        var compiledJson = compilerInst.convertPo([event.target.result]);
        var blob = new Blob([compiledJson], {type: 'application/json'});
        saveAs(blob, jsonFileName);
    };
}


window.fileSelected = function (files) {
    for (var i = 0; i < files.length; i++) {
        var file = files.item(i);
        var reader = new FileReader();
        reader.onloadend = getLoadedCallback(file.name);
        reader.readAsText(file);
        reader.onerror = function () {
            console.log('aaa');
        }
    }
};

