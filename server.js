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


//add new score to json
function addNewScore(newScore){
    var readScores = fs.readFileSync('scores.json');
    var myObject = JSON.parse(readScores);
    myObject.push(newScore);
    var newData = JSON.stringify(myObject, null, 2);
    fs.writeFile('scores.json', newData, err => {
        // error checking
        if(err) throw err;
        
        console.log("New score added");
    });
}

let newPlayerScore = {
    "name": "Kim",
    "score": 200
}
addNewScore(newPlayerScore);

//get top 3
function getTopThree(){
    const data = JSON.parse(fs.readFileSync("./scores.json", "utf8"));
    sortedData = data.sort((a, b) => {
        if (a.score < b.score) return -1;
        if (a.score > b.score) return 1;
        return 0;
      }).reverse();
      return sortedData[0], sortedData[1], sortedData[2];
}

app.get('/player', (req, res) => {
    res.send(getTopThree());
});


server.listen(3000, () => {
    console.log('listening on *:3000');
  });

