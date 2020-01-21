const http = require('http');
const app = http.createServer();
const io = require('socket.io')(app);
const fs = require('fs');
const readline = require('readline');
const path = require('path');

const PORT = process.env.PORT || 3000;

io.on('connection',(socket) => {
  console.log("Client is connected");
  socket.on('sendScore',() => {
    const csvStream = fs.createReadStream(path.join(__dirname,'deliveries.csv'));
    const csvScore = readline.createInterface({
      input:csvStream
    });
    let rows = 0;
    function sendScore(score) {
      return {
        over : score[4],
        ball : score[5],
        batsman : score[6],
        bowler : score[8],
        runs : score[15]
      }

    }
    function getRendmonInt(min,max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random()*(max - min))+min;
    }
    let delay = 0;
    csvScore.on('line',(row) => {
      //console.log(row);
      // if(rows === 0){
      //   const header = row.split(",");
      //   header.forEach((val,index) => console.log(val,index));
      // }
      const data = row.split(",");
      delay += 1000+(getRendmonInt(3,8) * 100);
      if(rows > 0){
        setTimeout((data) => {socket.emit('score',sendScore(data))},delay,data);

      }
      rows++;
    });
    csvScore.on('close',()=>{
    console.log('file is completed');
  });
});
});

app.listen(PORT ,()=>{
  console.log(`Server listening on port : ${PORT}`);
});
