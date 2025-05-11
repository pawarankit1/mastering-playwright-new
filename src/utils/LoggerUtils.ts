import winston from "winston";
import path from "path";
import moment from "moment-timezone";

//current working directory
const currentDir = __dirname;

//go back to one level up to 'src'
const srcDir = path.resolve(currentDir, "..");

//change to logging dir
const loggingDir = path.resolve(srcDir,"logging");

//Function to format log entry with timestamp and timezone
const customFormat = winston.format.printf(({level, message, timestamp}) =>{
    return `${timestamp} [${level}]: ${message}`;

});

//set the desired timezone
//const timeZone = "America/New_York"

const timeZone = "America/New_York"

const logger = winston.createLogger({
    format : winston.format.combine(
        winston.format.timestamp({ format: () => moment().tz(timeZone).format()}),
        customFormat
    ),
    transports: [
        new winston.transports.Console({level : "debug"}),
        new winston.transports.File({
            filename: path.join(loggingDir,"test_run.log"),
            maxFiles: 5,
            maxsize: 10 * 1024,
            level: "info",
        }),
        new winston.transports.File({
            filename: path.join(loggingDir,"test_error.log"),
            maxFiles: 5,
            maxsize: 10 * 1024,
            level: "error",
        }),
    ],
});

export default logger;