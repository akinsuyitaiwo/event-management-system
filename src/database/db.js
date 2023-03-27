const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const URI = process.env.MONGO_URL;

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        const connection = mongoose.connect(URI);
        // console.log('connecting database');
        return connection
    } catch (error) {
        throw error
    }
}
module.exports = connectDB;