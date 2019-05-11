const functions = require('firebase-functions');
const admin = require('firebase-admin');
var fs = require("fs");
//app stuff
var contents = fs.readFileSync("credentials.json");
// Define to JSON type
var jsonContent = JSON.parse(contents);

const firebaseApp = admin.initializeApp(
    jsonContent,
);

var gmailFunctions = require('./gmail');
var path = require('path');
var cors = require('cors');
const express = require('express');
const axios = require('axios');
var bodyParser = require('body-parser');
//var data = require("./data");

const app = express();


//set static path 
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//allow options on all resources
app.options('*', cors());

//allow cross origin sharing
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, application/json");
    next();
});

//app.use(authenticate);
app.get('/', function(req, res){
    res.send("Home Page");
});


//get credentials and tokens all that good stuff
app.post('/', function(req, res){
    //get access token
    //store in database
    console.log("hit");
    var ob = {
        "firsts": "Nones",
        "last": "last",
    };
    ob.firsts = req.body.a;
    console.log(req.body.b);
    res.json(ob);
    
});

app.get('/api', function(req, res){
    //load client secrets from a local file
    /*fs.readFile('credentials.json', (err, content) => {
        if(err) return console.log('Error loading client secret file:', err);

        //Authorize a client with credentials then call the gmail api
        authorize(JSON.parse(content), listLabels);
    });*/
    res.send("check");
});

app.get('/messages', function(req, res) {
    //get request token 
    const headers = req.headers;
    console.log(headers);
    //get user from body
    
    res.send("complete");
});


exports.api = functions.https.onRequest(app);


