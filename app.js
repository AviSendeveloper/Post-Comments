const express = require("express");
const PostRoute = require('./Routes/PostRoute');
const CommentRoute = require('./Routes/CommentRoute');
const AuthRoute = require('./Routes/AuthRoute');
const AuthMiddleware = require('./Middlewares/AuthMiddleware');
const connectDb = require('./Utils/database');

const app = express();
app.use(express.json(true));
app.use(express.urlencoded({ extended: false }));

app.use('/', AuthRoute);
app.use('/post', AuthMiddleware, PostRoute);
app.use('/comment', AuthMiddleware, CommentRoute);

(async () => {
    try {
        await connectDb();
        app.listen(3000);
    } catch (error) {
        console.log(error);
    }
})()
