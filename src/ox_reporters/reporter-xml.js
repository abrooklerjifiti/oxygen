/*
 * Copyright (C) 2015-present CloudBeat Limited
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

/*
 * Oxygen XML Reporter
 */
var EasyXml = require('easyxml');
var path = require('path');
var fs = require('fs');

var ReporterFileBase = require('../lib/reporter-file-base');
var util = require('util');
util.inherits(XmlReporter, ReporterFileBase);

function XmlReporter(results, options) {
    XmlReporter.super_.call(this, results, options);
}

XmlReporter.prototype.generate = function(results) {
    var resultFilePath = this.createFolderStructureAndFilePath('.xml');
    var resultFolderPath = path.dirname(resultFilePath);

    var serializer = new EasyXml({
        singularize: true,
        rootElement: 'test-results',
        rootArray: 'test-results',
        dateFormat: 'ISO',
        manifest: true,
        unwrapArrays: true,
        filterNulls: true
    });

    this.replaceScreenshotsWithFiles(results, resultFolderPath);
    // serialize test results to XML and save to file
    var xml = serializer.render(this.results);
    fs.writeFileSync(resultFilePath, xml);

    return resultFilePath;
};

module.exports = XmlReporter;
