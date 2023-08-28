const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://*******:******@cluster0.m9ac6.mongodb.net/db1?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {console.log('Connected to db')})
.catch((error) => {console.log("Error in connecting to db: ", error);});

const db = mongoose.connection;

module.exports = db;
