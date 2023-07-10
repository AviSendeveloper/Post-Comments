const { transports, format, createLogger } = require("winston");

exports.responseLogger = createLogger({
    transports: [
        new transports.Console(),
        new transports.File({
            filename: "logs/response.log",
        }),
    ],
    format: format.combine(
        format.json(),
        format.timestamp(),
        format.prettyPrint()
    ),
});

const logFormat = format.printf(({ label, level, timestamp, meta }) => {
    return `${label} ${level} ${timestamp} ${meta.message}`;
});

exports.errorLogger = createLogger({
    transports: [
        new transports.Console(),
        new transports.File({
            filename: "logs/inertnal-error.log",
        }),
    ],
    format: format.combine(
        format.label({ label: "[LOGGER]" }),
        format.json(),
        format.timestamp(),
        logFormat
    ),
});
