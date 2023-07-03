const express = require("express");
const PostRoute = require('./Routes/PostRoute');
const connectDb = require('./Utils/database');

const app = express();
app.use(express.urlencoded({ extended: false }));

app.use('/', PostRoute);

(async () => {
    try {
        await connectDb();
        app.listen(3000);
    } catch (error) {
        console.log(error.getMessage());
    }
})()
