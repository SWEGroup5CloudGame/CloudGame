// Import necessary packages
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const fs = require("fs");

// create and configure the express app
const PORT = process.env.PORT || 3000;
app.use(express.json());

// The index route
app.get('/', function(req, res) {
    res.send('Cloud Raindrop Score Board');
 });

//add score route
app.post("/uploadscore", async function(req, res){
    //get score
    let {name, score} = req.body;
    //create new player
    var readScores = fs.readFileSync('scores.json');
    var myObject = JSON.parse(readScores);
    myObject.push({name, score});
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
    res.send({status: true, msg: "top 3 retrieved"});
    });

server.listen(3000, () => {
    console.log('listening on *:3000');
  });

