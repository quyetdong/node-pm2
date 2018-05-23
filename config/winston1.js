// Set basic parts
const { createLogger, format, transports } = require('winston');
const fs = require('fs');

const env = process.env.NODE_ENV || 'development';

// Create the log directory if it does not exist
const logDir = 'logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const { combine, timestamp, printf } = format;

const myFormat = printf(info => `${info.timestamp} ${info.level}: ${info.message}`);

// define the custom settings for each transport (file, console)
const options = {
  file: {
    level: env === 'development' ? 'debug' : 'info',
    filename: `${logDir}/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: true,
  },
  console: {
    level: 'info',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

// instantiate a new Winston Logger with the settings defined above
const logger = createLogger({
  format: combine(timestamp(), myFormat),
  transports: [
    new transports.File(options.file),
    new transports.Console(options.console),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

export default logger;
