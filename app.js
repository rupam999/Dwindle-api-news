const express = require("express");
const app = express();
const request = require("request");
const expressStatusMonitor = require('express-status-monitor');
const dotenv = require("dotenv")
dotenv.config();


app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8000);
app.use(expressStatusMonitor());


if (process.env.NODE_ENV === 'development') {
    console.log("ruuning in dev")
    app.use(errorHandler());
  } else {
    console.log("running in prod")
    app.use((err, req, res, next) => {
      res.status(500).send({
        error: 1,
        err,
        message: "Internal Server Error"
      });
    });
  }


const apiKey = process.env.API_KEY
const cricApi = process.env.CRIC_API
const apiCurrency = process.env.API_CURRENCY

app.get("/", (req, res) => {
    res.send({
        msg: 'Server Running',
        author: 'Dwindle Inc (Rupam Chakraborty)'
    });
});

// http://newsapi.org/v2/top-headlines?country=in&q=india&apiKey=d1190b6999284451891e3feb54270c59

app.get("/googleNews", (req, res) => {
    let googleNewsAPI = require("google-news-json");
    googleNewsAPI.getNews(googleNewsAPI.SEACRH, "india", "en-IN", (err, response) => {
        if(err) console.log(err);
        res.send(response);
    });
});

app.get("/topHeadLines", (req, res) => {
    let url = "https://newsapi.org/v2/top-headlines?sources=google-news-in&apiKey="+ apiKey;
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var headingData = JSON.parse(body);
            res.send(headingData);
        } else{
            console.log("Something Went Wrong");
            console.log(error);
        }
    });
});

app.get("/newsBusiness", (req, res) => {
    let url = "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey="+ apiKey;
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var headingData = JSON.parse(body);
            res.send(headingData);
        } else{
            console.log("Something Went Wrong");
            console.log(error);
        }
    });
});

app.get("/newsentertainment", (req, res) => {
    let url = "https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey="+ apiKey;
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var headingData = JSON.parse(body);
            res.send(headingData);
        } else{
            console.log("Something Went Wrong");
            console.log(error);
        }
    });
});

app.get("/newshelth", (req, res) => {
    let url = "https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey="+ apiKey;
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var headingData = JSON.parse(body);
            res.send(headingData);
        } else{
            console.log("Something Went Wrong");
            console.log(error);
        }
    });
});

app.get("/newsscience", (req, res) => {
    let url = "https://newsapi.org/v2/top-headlines?country=in&category=science&apiKey="+ apiKey;
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var headingData = JSON.parse(body);
            res.send(headingData);
        } else{
            console.log("Something Went Wrong");
            console.log(error);
        }
    });
});

app.get("/newssports", (req, res) => {
    let url = "https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey="+ apiKey;
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var headingData = JSON.parse(body);
            res.send(headingData);
        } else{
            console.log("Something Went Wrong");
            console.log(error);
        }
    });
});

app.get("/newstech", (req, res) => {
    let url = "https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey="+ apiKey;
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var headingData = JSON.parse(body);
            res.send(headingData);
        } else{
            console.log("Something Went Wrong");
            console.log(error);
        }
    });
});

app.get("/everythingNews/:userQuery", (req, res) => {
    let userQuery = req.params.userQuery;
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let url = "https://newsapi.org/v2/everything?q=" + userQuery + "&from=" + date + "&sortBy=publishedAt&apiKey=" + apiKey;
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var headingData = JSON.parse(body);
            res.send(headingData);
        } else{
            console.log("Something Went Wrong");
            console.log(error);
        }
    });
});

app.get("/weather", (req, res) => {
    // Dark Sky 1000 api call per day
    const darkApi = 'ec31762ef90a44b184f7280520612401';
    let url = 'https://api.darksky.net/forecast/ec31762ef90a44b184f7280520612401/37.8267,-122.4233';
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var headingData = JSON.parse(body);
            res.send(headingData);
        } else{
            console.log("Something Went Wrong");
            console.log(error);
        }
    });
});

// Cricket Area
app.get("/playerSearch/:playerName", (req, res) => {
    let name = req.params.playerName;
    let url = "https://cricapi.com/api/playerFinder?apikey="+ cricApi +"&name="+ name;
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var headingData = JSON.parse(body);
            res.send(headingData);
        } else{
            console.log("Something Went Wrong");
            console.log(error);
        }
    });
});

app.get("/playerStats/:playerId", (req, res) => {
    let id = req.params.playerId;
    let url = "https://cricapi.com/api/playerStats?apikey="+cricApi+"&pid="+id;
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var headingData = JSON.parse(body);
            res.send(headingData);
        } else{
            console.log("Something Went Wrong");
            console.log(error);
        }
    });
});

app.get("/matchCalender", (req, res) => {
    let url = "https://cricapi.com/api/matchCalendar?apikey="+cricApi;
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var headingData = JSON.parse(body);
            res.send(headingData);
        } else{
            console.log("Something Went Wrong");
            console.log(error);
        }
    });
});

app.get("/perticularScore/:matchID", (req, res) => {
    let id = req.params.matchID;
    let fetchData = [];
    let spawn = require("child_process").spawn; 
    let process = spawn('python',["perticularScore.py", id] );
    process.stdout.on('data', function(data) { 
        fetchData.push(data);
    })
    .on('end', function() {
        let data   = Buffer.concat(fetchData);
        let schema = JSON.parse(data);
        res.send(schema);
    });
    
});

app.get("/ongoingMatch", (req, res) => {
    let spawn = require("child_process").spawn; 
    let fetchData = [];
    let process = spawn('python',["matchCricbuzz.py"] );
    process.stdout.on('data', function(data) { 
        fetchData.push(data);
    })
    .on('end', function() {
        let data   = Buffer.concat(fetchData);
        let schema = JSON.parse(data);
        res.send(schema);
    });
    
});

app.get("/matchInfo/:matchID", (req, res) => {
    let id = req.params.matchID;
    let spawn = require("child_process").spawn; 
    let process = spawn('python',["matchInfo.py", id] );
    process.stdout.on('data', function(data) { 
        res.send(JSON.parse(data));
    });
    
});

// live Score
app.get("/liveMatch/:matchID", (req, res) => {
    let id = req.params.matchID;
    let spawn = require("child_process").spawn; 
    let process = spawn('python',["liveScore.py", id] );
    process.stdout.on('data', function(data) { 
        res.send(JSON.parse(data));
    });
    
});

// Commentry
app.get("/commentry/:matchID", (req, res) => {
    let id = req.params.matchID;
    let fetchData = [];
    let spawn = require("child_process").spawn; 
    let process = spawn('python',["commentry.py", id] );
    process.stdout.on('data', function(data) { 
        fetchData.push(data);
    }) 
    .on('end', function() {
        let data   = Buffer.concat(fetchData);
        let schema = JSON.parse(data);
        res.send(schema);
    });
    
});

// Stock Market
app.get("/currency/:originCurrency", (req, res) => {
    let originCurrency = req.params.originCurrency;
    let url = "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=" + originCurrency + "&to_currency=INR&apikey="+ apiCurrency;
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200){
            var headingData = JSON.parse(body);
            res.send(headingData);
        } else{
            console.log("Something Went Wrong");
            console.log(error);
        }
    });
});

app.get("*", (req, res) => {
    res.send({
        error: 1,
        msg: 'Requested URL Not Found...'
    });
});

app.listen(app.get('port'), () => {
    console.log("Server Start at port", app.get('port'), app.get('host'));
});