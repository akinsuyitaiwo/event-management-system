const mongoose = require('mongoose');
const dotenv = require('dotenv');
const models = require('../models/index.js');
const bcrypt = require('bcrypt');


dotenv.config();

const password = process.env.ADMIN_PASSWORD;
const hash = bcrypt.hashSync(password, 10);

const admin = [
  {
    email: "admin@temsystems.com",
    firstName: "Admin",
    lastName: "Taiwo",
    password: hash,
    role: "admin",
  },
  {
    email: "event@temsystems.com",
    firstName: "Events",
    lastName: "Temsystems",
    password: hash,
    role: "admin",
  }
];
const seedData = async ()=> {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(process.env.MONGO_URL)
        await models.User.create(admin);
        console.log("done")
        process.exit(1)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

seedData();