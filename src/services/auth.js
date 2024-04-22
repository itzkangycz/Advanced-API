const config = require('../config.json');
const {Log} = require('./logger');

const checkKey = async (req, res, next) => {
    var apiKey = req.headers['x-api-key'];

    if (config.app.apiKey === apiKey) {
        return next();
    } else {
        res.status(403).send('Nebyl zadán platný API klíč!');
        Log(`[${ip}] Request attempt failed - invalid API Key!`);
    }
}

const checkIP = async (req, res, next) => {
    var ipAddress = req.ip;

    if (ipAddress && config.addresses.includes(ipAddress)) {
        return next();
    } else {
        res.status(403).send('Přístup z této IP adresy není oprávněný!');
        Log(`[${ip}] Request attempt failed - unauthorized IP address!`);
    }
}

module.exports = {checkKey, checkIP};