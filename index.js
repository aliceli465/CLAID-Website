const express = require('express');
const path = require('path');
const app = express();

//points.html + index
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/points', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'points.html'));
});
//other root directories
app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/images', express.static('images'));
app.use('/src', express.static('src'));

const checkinRouter = require('./src/routes/checkin');
app.use('/', checkinRouter);

const port = process.env.PORT;
app.listen(port, () => {
    console.log('Server is listening on port ' + port);
})