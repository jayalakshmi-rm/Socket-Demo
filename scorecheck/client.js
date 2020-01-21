const socket = require('socket.io-client')('http://localhost:3000');

socket.on('connect',() => {
  console.log('Connected to the server');
})

socket.emit('sendScore');

let last = new Date().getTime();

socket.on('score',(data) => {
  let now = new Date().getTime();

  console.log(`${now - last} => ${JSON.stringify(data)}`);
  last = now;
})
 socket.on('disconnect',()=>{
   console.log('disconnect for the server');
 })
