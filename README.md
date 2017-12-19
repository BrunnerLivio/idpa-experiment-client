# idpa-experiment-client

This is a keylogger used for my IDPA experiment "Motivation des Programmieren". It logs all key presses 
and saves it to a file in JSON format.

## Dependencies

- [NodeJS 8.x](https://nodejs.org/en/blog/release/v8.0.0/)

## Installation

Clone repo & install NodeJS dependencies

```bash
git clone https://github.com/BrunnerLivio/idpa-experiment-client.git
cd idpa-experiment-client
npm install
```

## Run

Writes Logfile to `~/MyName.json` in CSV format
```bash 
sudo node index.js MyName
```