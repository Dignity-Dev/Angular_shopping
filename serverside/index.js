var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();


const route = require('./route/routes.js');

mongoose.connect('mongodb://localhost:27017/shoppinglist');


mongoose.connection.on('connected', () => {
    console.log("Connected to mongodb");
});
mongoose.connection.on('error', (err)=>{
    console.log(err);
});


const PORT = 3000;
var rawBodyHandler = function (req, res, buf, encoding) {
    if (buf && buf.length) {
        req.rawBody = buf.toString(encoding || 'utf8');
        console.log('Raw body: ' + req.rawBody);
    }
}
app.use(cors({ allowedHeaders: 'Content-Type, Cache-Control' }));
app.options('*', cors());  // enable pre-flight

app.use(bodyParser.json({ verify: rawBodyHandler }));

app.use('/api', route);


app.get('/', (req, res)=>{
    res.send("welcome to web");
});


app.listen(PORT, ()=>{
    console.log("server strated at port:" + PORT);
});