const express = require('express');
const connectDB = require('./database/db');
const bodyParser =require('body-parser');
const router = require('./routes/index');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json());

app.use('/api', router);
app.get('/', (req, res) => {
  res.send('welcome to Event manager home page');
})

app.listen(port, async () => {
  await connectDB();
  console.log('database connected');
  console.log(`app is listening on ${port}`);
});