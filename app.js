const express = require("express");
const expressWinston = require("express-winston");
const { transports, format } = require("winston");
const { responseLogger, errorLogger } = require("./Config/winston-logger.config");
const PostRoute = require("./Routes/PostRoute");
const CommentRoute = require("./Routes/CommentRoute");
const AuthRoute = require("./Routes/AuthRoute");
const AuthMiddleware = require("./Middlewares/AuthMiddleware");
const connectDb = require("./Utils/database");

const app = express();

// winston
app.use(
    // expressWinston.logger({
    //     transports: [
    //         new transports.Console(),
    //         new transports.File({
    //             filename: "logs/all.log",
    //         }),
    //         new transports.File({
    //             level: "debug",
    //             filename: "logs/error.log",
    //         }),
    //     ],
    //     statusLevels: true,
    //     format: format.combine(
    //         format.json(),
    //         format.timestamp(),
    //         format.prettyPrint()
    //     ),
    // })
    expressWinston.logger({
        winstonInstance: responseLogger,
    })
);

app.use(express.json(true));
app.use(express.urlencoded({ extended: false }));

app.use("/", AuthRoute);
app.use("/post", AuthMiddleware, PostRoute);
app.use("/comment", AuthMiddleware, CommentRoute);

// winston error logger
app.use(
    expressWinston.errorLogger({
        winstonInstance: errorLogger,
    })
);

(async () => {
    try {
        await connectDb();
        app.listen(3000);
    } catch (error) {
        console.log(error);
    }
})();
