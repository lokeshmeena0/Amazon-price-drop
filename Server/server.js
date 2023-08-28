const express = require('express');
const port = 8000;
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./config/mongoose');
const passport = require('passport');
const passportJwt = require('passport-jwt').Strategy;
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', require('./routes/index'));

app.listen(port, function (err) {
    if (err) {
        console.log(`Error in running the express server: ${err}`);
        return;
    }
    console.log(`Server is up and running on port: ${port}`);
});