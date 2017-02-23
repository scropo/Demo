window.codeEditor = function () {
    // var xml2js = require('xml2js'),
    //     js2xml = new xml2js.Builder(),
    //     jsyaml = require('js-yaml'),
    //     codemirror = require('codemirror'),
    //     focusElement = '';
    // xml2js = xml2js.parseString;

    // require('codemirror/mode/xml/xml.js');
    // require('codemirror/mode/yaml/yaml.js');

    // document.getElementById('xml').parentElement.onclick = function () {
    //     focusElement = 'xml'
    // }
    // document.getElementById('yaml').parentElement.onclick = function () {
    //     focusElement = 'yaml'
    // }
    // var xml = codemirror.fromTextArea(document.getElementById('xml'), {
    //     mode: 'xml',
    //     lineNumbers: true
    // });
    // var yaml = codemirror.fromTextArea(document.getElementById('yaml'), {
    //     mode: 'yaml',
    //     lineNumbers: true
    // });

    // function x2y() {
    //     xml2js(xml.getValue(), function (err, json) {
    //         if (err) {
    //             yaml.setOption('mode', 'text/plain');
    //             yaml.setValue(err.message || String(err));
    //             return;
    //         }
    //         yaml.setOption('mode', 'yaml');
    //         yaml.setValue(jsyaml.dump(json));
    //     });
    // }

    // function y2x() {
    //     try {
    //         var obj = jsyaml.load(yaml.getValue());
    //         xml.setOption('mode', 'xml');
    //         xml.setValue(js2xml.buildObject(obj));
    //     } catch (err) {
    //         xml.setOption('mode', 'text/plain');
    //         xml.setValue(err.message || String(err));
    //     }
    // }

    // xml.on('change', function () {
    //     if (focusElement == 'xml') x2y();
    // });

    // yaml.on('change', function () {
    //     if (focusElement == 'yaml') y2x();
    // });

    // x2y();
}
