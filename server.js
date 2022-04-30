// Import necessary packages
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const fs = require("fs");
const { dirname } = require('path');

// create and configure the express app
const PORT = process.env.PORT || 5000;
app.use(express.json());

// The index route
app.get('/', function(req, res) {
    res.sendFile(path.join(--dirname, '/highScoresBoard.html'));
 });

app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
      next();
    });

  

//add score route
app.post("/uploadscore", async function(req, res){
    //get score
    let {name, score, date} = req.body;
    //create new player

    var readScores = fs.readFileSync('scores.json');
console.log("readscore" + readScores);
    var myObject = JSON.parse(readScores);
    myObject.push({name, score, date});
    var newData = JSON.stringify(myObject, null, 2);
    fs.writeFile('scores.json', newData, err => {
        // error checking
        if(err) {
            res.send({status:false, msg:"error occur"})
            throw err;
        }
        console.log("New score added");
        res.send({status: true, msg: "new score added"});
    });
});

//get previous score route
app.get("/previousscore", async function(req, res){
    const data = JSON.parse(fs.readFileSync("./scores.json", "utf8"));
    const prevScore = data.filter(data => data.score = req.body.score);
    console.log(prevScore);
    res.send({status: true, msg: "previous score retrieved"});
});

//scoreboard route
app.get("/scoreboard", async function(req, res){
    const data = JSON.parse(fs.readFileSync("./scores.json", "utf8"));
    var top3 = data.sort((a, b) => {
        if (a.score < b.score) return -1;
        if (a.score > b.score) return 1;
      }).reverse().slice(0, 3)    
    console.log(top3);
   // res.send({status: true, msg: "top 3 retrieved"});
   res.send(top3);
});

server.listen(5000, () => {
    console.log('listening on *:5000');
  });

  function retrieveScoreBoard(){
    console.log("Retrieving Score Board")
    var xhr = new window.XMLHttpRequest()
    xhr.open("GET", "http://54.85.51.87:5000/scoreboard", true);
    xhr.send();

    let topthree = fs.readFileSync('scores.json', {encoding:'utf8', flag:'r'},
                        function (err, data){
                            if(err) console.log(err);
                            else console.log(data);
                        });
    
    console.log(topthree)
}

