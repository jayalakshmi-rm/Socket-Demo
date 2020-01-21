const http = require('http');
const app = http.createServer();
const io = require('socket.io')(app);

io.on('connection',(socket) => {
  const clientDetails = socket.handshake.headers;
  console.log(clientDetails);
  socket.emit('helloFromClient',"hello to client1");
  socket.on('close',()=>{
    console.log('Client is disconnected');
  })
})

const PORT = process.env.PORT || 3000;

app.listen(PORT ,()=> {
  console.log(`Server listening on port : ${PORT}`);
})
