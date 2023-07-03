const mongoose = require('mongoose');
require('dotenv').config();

const connectDb = async () => {
    try {
        console.log('Database: ', process.env.DB_URI + process.env.DB_DATABASE);
        await mongoose.connect(process.env.DB_URI + process.env.DB_DATABASE);
        console.log('Database connected');
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDb;