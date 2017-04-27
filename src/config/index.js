const path = require('path');
const fs = require('fs');
const nconf = require('nconf');
const cluster = require('cluster');

const config = {};

config.env = process.env.NODE_ENV;
config.isTest = process.env.NODE_ENV === 'test';

require('dotenv').config({
    path: path.join(__dirname, `.env${config.env ? `.${config.env}` : ''}`).normalize(),
});

config.workingDirectory = path.join(__dirname, '../../');

const host = process.env.HOST;

config.port = parseInt(process.env.PORT, 10) || 3000;
config.host = host || 'localhost';
config.debug = process.env.DEBUG_DEV || false;

config.webConcurrency = process.env.WEB_CONCURRENCY || 1;

config.pubnub = {
    publishKey: process.env.PUBNUB_PUBLISH_KEY,
    subscribeKey: process.env.PUBNUB_SUBSCRIBE_KEY,
};

module.exports = config;
