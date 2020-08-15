const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const db = process.env.MONGODB_URL
mongoose.connect(db,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    })


const app = express()
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

const router = require('./app/routes')
var port = process.env.PORT || 8080;

app.use(router)
app.listen(port)
