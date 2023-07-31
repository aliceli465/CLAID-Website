const express = require('express');
const app = express();

const checkinRouter = require('./src/routes/checkin.js');

app.use('/checkin', checkinRouter);

const port = process.env.PORT;
app.listen(port, () => {
    console.log('Server is listening on port ${port}');
})