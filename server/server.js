const FRAMERATE = 10
const GRID_SIZE = 20
const Session = require('./Session');
const Client = require('./Client');
const path = require('path');
const http = require('http');
const express = require('express');
const cors = require('cors')
const publicPath = path.join(__dirname, '../public')
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors())
app.use(express.static(publicPath));
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
//   });
let server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));
const io = require('socket.io')( server, {
    cors: {
       origin: "*",
    }
});


const gameState = {
    players: [],
    food: []
}

function createId(len = 6, chars = 'abcdefghjklmnopqrstuwxyz0123456789'){
  let id = '';
  while(len--){
      id+=chars[Math.random() * chars.length | 0];
  }
  return id
}

function createClient(conn, id = createId()){
  return new Client(conn, id);
}



io.on('connection', (connection) => {
    console.log('new connection')
    const client = createClient(connection)
    console.log(client)

    connection.on('message', msg => {
      console.log(msg, 'on server')
      const data = JSON.parse(msg)
    })
  // client.emit('init', gameState)
    //client.on('keydown', handleKeydown);
    //startGameInterval()
})


// function handleKeydown(){
//     try {
//         keyCode = parseInt(keyCode);
//       } catch(e) {
//         console.error(e);
//         return;
//       }
//       const vel = getUpdatedVelocity(keyCode);

//       if (vel) {
//         gameState.player.vel = vel;
//       }
// }

// function getUpdatedVelocity(keyCode) {
//     switch (keyCode) {
//       case 37: { // left
//         return { x: -1, y: 0 };
//       }
//       case 38: { // down
//         return { x: 0, y: -1 };
//       }
//       case 39: { // right
//         return { x: 1, y: 0 };
//       }
//       case 40: { // up
//         return { x: 0, y: 1 };
//       }
//     }
//   }

//   function startGameInterval() {
//     const intervalId = setInterval(() => {

//         updateGameState()

//         emitGameState()
    
//       }, 1000 / FRAME_RATE);
//   }

//   function updateGameState(){
//     //player.pos
//   }


//   function emitGameState() {
//     // Send this event to everyone in the room.
//     // io.sockets.in(room)
//     //   .emit('gameState', JSON.stringify(gameState));
//     io.emit('gameState', gameState)
//   }
  
