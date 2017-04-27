const path = require('path');
const fs = require('fs');
const nconf = require('nconf');
const cluster = require('cluster');

const config = {};

config.env = process.env.NODE_ENV;
config.babelEnv = process.env.BABEL_ENV || 'development';
config.isTest = process.env.NODE_ENV === 'test';

require('dotenv').config({
    path: path.join(__dirname, './../src/config', `.env${config.env ? `.${config.env}` : ''}`).normalize(),
});

config.workingDirectory = path.join(__dirname, '../');

const host = process.env.HOST;

config.port = parseInt(process.env.PORT, 10) || 4000;
config.debug = process.env.DEBUG_DEV || false;

config.webConcurrency = process.env.WEB_CONCURRENCY || 1;

config.pubnub = {
    publishKey: process.env.PUBNUB_PUBLISH_KEY,
    subscribeKey: process.env.PUBNUB_SUBSCRIBE_KEY,
};

/* remote api configurations */

const remoteApi = {
    host : process.env.REMOTE_API_HOST,
    port : process.env.REMOTE_API_PORT,
};

config.remoteApi = remoteApi;
config.remoteApi.url = `${remoteApi.host}:${remoteApi.port}`;

/* remote api configurations */

module.exports = config;
