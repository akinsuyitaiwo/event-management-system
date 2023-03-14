const express = require('express');

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`app is listening on ${port}`));

app.get('/', (req, res) => {
    res.send('welcome to Event manager home page')
})