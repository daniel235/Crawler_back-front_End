const functions = require('firebase-functions');
const admin = require('firebase-admin');
var fs = require("fs");
var path = require("path");
//app stuff
var contents = fs.readFileSync("credentials.json");
// Define to JSON type
var jsonContent = JSON.parse(contents);

const firebaseApp = admin.initializeApp(
    jsonContent,
);


//var gmailFunctions = require('./gmail');
var path = require('path');
var cors = require('cors');
const express = require('express');
const axios = require('axios');
var request = require('request');
var bodyParser = require('body-parser');
//var data = require("./data");
var outlook = require("./outlook");
var qs = require('qs');


const app = express();


//access tokens
outlookToken = null;
gmailToken = null;


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
    var gmailToken = null;
    var blackBoard = null;
    var outlook = null;

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


app.get('/otmessages', function(req, res) {
    url = "https://graph.microsoft.com/v1.0/me/mailfolders/inbox/messages?$top=10";
    auth = "Bearer " + outlookToken;
    const config = {
        headers: {
            authorization: auth,
        }
    }
    var messages = null;
    axios.get(url, config).then((response) => {
        messages = response.data.value
        console.log(messages);
    }).catch(err=>console.log(err));

    res.send(messages);
});

//get outlook api access
app.get('/outlook', function(req, res) {
    //get auth code 
    var authCode = req.query.code;
    console.log(authCode);
    //getting access token
    urls = "https://login.microsoftonline.com/common/oauth2/v2.0/token/";
    console.log(urls);
    const config = {
        headers : {
            "Content-Type": "application/x-www-form-urlencoded"
        },
    }
    var sec = "mXZUVz:l=PUcxQH:OBGtH.BKbBRF2121";
    const requestBody = {
        grant_type : "authorization_code",
        code : authCode,
        redirect_uri : "http://localhost:5000/crawler-90244/us-central1/api/outlook",
        client_id: "2d330020-d8e1-4e03-b098-7928c37cbc1a",
        client_secret: sec,
    }
    var error = null;
    var token = null;
    axios.post(urls, qs.stringify(requestBody), config).then((response) => {
        token = response.data.access_token;
        outlookToken = token;
        console.log(token);
    }).catch(err=>console.log(err));
    
    res.sendFile(path.resolve("../../frontend/outlook.html"));
});



exports.api = functions.https.onRequest(app);


