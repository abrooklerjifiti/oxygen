/*
 * Copyright (C) 2015-present CloudBeat Limited
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

/**
 * @function getDeviceLogs
 * @summary Collects logs from the mobile device.
 * @return {Object[]} A list of logs.
 * @for android, ios, hybrid, web
 * @example <caption>[javascript] Usage example</caption>
 * mob.init(caps); //Starts a mobile session and opens app from desired capabilities
 * mob.getDeviceLogs(); //Collects logs from the browser console or mobile device
 */
module.exports = async function() {
    // currently supports only Android logs
    if (this.caps && this.caps.platformName && this.caps.platformName === 'Android') {
        return await this.driver.getLogs('logcat');
    }
    return null;
};
