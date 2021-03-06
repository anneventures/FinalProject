// Set mongoose to leverage built in JavaScript ES6 Promises


// const port = 4002

var port = process.env.PORT || 4002


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/budget_db";

mongoose.Promise = Promise;

mongoose.connect(MONGODB_URI);


import express from 'express'

import session from 'express-session'
import mongoose from 'mongodb'





const app = express()



// const ACCESS_TOKEN = null;
// const PUBLIC_TOKEN = null;
// const ITEM_ID = null;


import bodyParser from 'body-parser'
app.use(bodyParser.urlencoded({ extended: true }));
app.use( bodyParser.json() );

app.use(session({
  secret: 'dog vs cat',
  resave: true,
  saveUninitialized: false,
}))


const api = require('./routes/api');

// Add headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


// get for test
app.get('/', api.echo);
app.get('/get_income', api.get_income);
app.get('/get_balance', api.get_balance);

app.post('/', api.echo);
app.post('/create_user', api.create_user);
app.post('/login_with_email_password', api.login_with_email_password);
app.post('/login_with_token', api.login_with_token);
app.post('/logout', api.logout);
app.post('/set_expenses', api.set_expenses);
app.post('/set_income', api.set_income);
app.post('/get_access_token', api.get_access_token);





app.listen(port, function() {
  console.log("App running on port " + port);
});


