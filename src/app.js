const express = require('express');
const mongoose = require('mongoose');
const connectDb = require('./database/db');


const app = express();
app.use(express.json());

mongoose.set('strictQuery', false);
const mongoDB = "mongodb+srv://akinsuyitaiwod:Temidayo1@cluster0.r4et878.mongodb.net/EVENT-HANDLER";

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`app is listening on ${port}`));

app.get('/', (req, res) => {
    res.send('welcome to Event manager home page')
})