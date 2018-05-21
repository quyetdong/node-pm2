// import { createLogger, format, transports } from 'winston';

// const {
//   combine, timestamp, label, printf,
// } = format;

// const myFormat = printf(info => `${info.timestamp} ${info.level}: ${info.message}`);

// // define the custom settings for each transport (file, console)
// const options = {
//   file: {
//     level: 'info',
//     filename: './logs/app.log',
//     handleExceptions: true,
//     json: true,
//     maxsize: 5242880, // 5MB
//     maxFiles: 5,
//     colorize: true,
//   },
//   console: {
//     level: 'debug',
//     handleExceptions: true,
//     json: false,
//     colorize: true,
//   },
// };

// // instantiate a new Winston Logger with the settings defined above
// const logger = createLogger({
//   format: combine(timestamp(), myFormat),
//   transports: [new transports.File(options.file)],
//   exitOnError: false, // do not exit on handled exceptions
// });

// // // create a stream object with a 'write' function that will be used by `morgan`
// // logger.stream = {
// //   write(message, encoding) {
// //     // use the 'info' log level so the output will be picked up
// //     // by both transports (file and console)
// //     logger.info(message);
// //   },
// // };

// export default logger;
