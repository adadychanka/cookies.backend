const winston = require("winston");
const { createLogger } = winston;
const { Console, File } = winston.transports;
const { combine, colorize, simple, json } = winston.format;

const logger = createLogger({
  level: "info",
  format: json(),
  transports: [
    new Console({ format: combine(colorize(), simple()) }),
    new File({ filename: "info.log", level: "info" }),
    new File({ filename: "errors.log", level: "error" }),
  ],
});

module.exports = logger;
