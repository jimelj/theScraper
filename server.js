/*jshint esversion:6*/
//Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');

//Lets init express and port
let app = express();
let PORT = process.env.PORT || 8080;

//static dir
app.use(express.static(process.cwd() + '/public'));

//logger with morgan
app.use(logger('dev'));

//body-parser
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//use handlebars
app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//setting up routes
let htmlRoutes = require('./controllers/html-routes.js');
let apiRoutes = require('./controllers/api-routes.js');
app.use('/', htmlRoutes);
app.use('/api', apiRoutes);

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

//Database Config with mongoose
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect('mongodb://localhost/theScraper');
}

let db = mongoose.connection;

//Handle Database(mongoose) errors
db.on('error', (error) => console.log('Mongoose Error:', error));

//If successfully connected to db through mongoose say so!
db.on('open', () => console.log('Mongoose connection has been successful!'));

//Start and litsen on 8080
app.listen(PORT, () => console.log('====🌎 🚈 🖥️ 📡===> App listening on PORT ' + PORT + ' ✅'));
