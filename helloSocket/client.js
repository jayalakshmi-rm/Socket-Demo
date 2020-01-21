const socket = require('socket.io-client')('http://localhost:3000');

socket.on('connect',() => {
  console.log('Connected to the server');
})

socket.on('helloFromClient',(data) => {
  console.log(data);
})
 socket.on('disconnect',()=>{
   console.log('disconnect for the server');
 })
