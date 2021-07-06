//initialization the package
//dotenv
require('dotenv').config();
//express with app to connect to the server
const express = require('express');
const app = express();
//initialization the port in the dotenv
const port = process.env.PORT || 3000;
//initialization mongoose database
const mongoose = require('mongoose');
//initialization the url database to the dotenv
const DATABASE_URL = process.env.DATABASE_URL;

//make new url to connect the database on it
mongoose.connect(DATABASE_URL,{
     useNewUrlParser: true,
     useUnifiedTopology: true,
});

//make the app show me if there is error or if it connect correctly show me too
const db = mongoose.connection;

db.on('error',(error)=>{
    console.error(error)
});

db.once('open',()=>{
    console.log('connect in the database');
});

app.use(express.json());

const store = require('./router/store.js');
app.use('/store', store);

//connect the server in the express and run the app
app.listen(port,()=>{
    console.log(`the app rerunning in port ${port}`);
});