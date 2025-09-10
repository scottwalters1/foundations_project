const { createLogger, transports, format } = require("winston");

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.printf(info => {
      return `${info.timestamp} [${info.level}]: ${info.message}`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'someFile.log' }) // fixed
  ]
});

module.exports = logger;