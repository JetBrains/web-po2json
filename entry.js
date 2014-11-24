var Compiler = require("angular-gettext-tools/lib/compile");
var compilerInst = new Compiler({format: 'json'});
var saveAs = require("filesaver.js");
var $ = require("jquery");

function addMessage(message) {
    $("#list").append("<li>" + message + "</li>")
}

function resetMessages() {
    $("#list").empty();
}

function getLoadedCallback(originalFileName) {
    console.log('Processing' + originalFileName);
    if (originalFileName.match(new RegExp(/.*\.pot?/)) == null) {
        addMessage('Only .po and .pot files are supported');
        return function () {
        };
    }
    var jsonFileName = (originalFileName + '$').replace(/\.pot?\$/, '.json')

    return function (event) {
        var compiledJson;
        try {
            compiledJson = compilerInst.convertPo([event.target.result]);
            var blob = new Blob([compiledJson], {type: 'application/json'});
            saveAs(blob, jsonFileName);
            addMessage("'" + originalFileName + "': OK");
        } catch (e) {
            addMessage("'" + originalFileName + "': " + e.message);
        }
    };
}

if (!window.FileReader) {
    addMessage("Cannot use FileApi in your browser. Try browser listed <a href='http://caniuse.com/#feat=filereader'>here</a>");
    $(".input-wrapper").hide();
}

window.fileSelected = function (files) {
    resetMessages();
    for (var i = 0; i < files.length; i++) {
        var file = files.item(i);
        var reader = new FileReader();
        reader.onloadend = getLoadedCallback(file.name);
        reader.readAsText(file);
        reader.onerror = function (error) {
            console.log(error);
            addMessage("Error during loading file");
        }
    }
};

