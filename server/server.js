const FRAMERATE = 10
const GRID_SIZE = 20
const Session = require('./Session');
const Client = require('./Client');
const sessions = new Map;
let masterSessionId = null
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

function getSession(id){
  return sessions.get(id);
}


function createSession(id = createId()){
  if(sessions.has(id)){
    throw new Error(`session ${id} already exists`);
  }
  const session = new Session(id)
  masterSessionId = id
  //console.log('creating session', session)
  sessions.set(id, session)
  return session
}


function broadcastSession(session){
  const clients = [...session.clients];
  console.log('CLIENTS:  ', clients)
  if(clients && clients.length > 0){
   // console.log('truthy')
    clients.forEach( client => {
     // console.log(client, 'in clients')
      //console.log(client.emit)
        client.conn.emit('message', {
          type: 'session-broadcast',
          peers: {
              you: client.id,
              clients: clients.map(client => {
                  return { 
                          id: client.id, 
                          state: client.state, 
                      }
              }),
          }
      })
      

  })
  }

}


io.on('connection', (connection) => {
    console.log('new connection')
    const client = createClient(connection)

    //console.log(client)

    connection.on('message', data => {
      console.log(data, 'on server')
      // const data = JSON.parse(msg)
      
      switch(data.type){

        case 'get-sessions' : 
         // console.log('logging sessions', sessions)
          
          return
        case 'create-session' :
          //   const id = createId()
          //   const createdSession = createSession()
          //   createdSession.join(client)
          //   client.state = data.state
          //   client.send({
          //     type: 'session-created',
          //     id: createdSession.id,
          // });
          return
        case 'join-session' :   
          const sessionExists = sessions.size > 0 ? true : false
          //console.log(sessionExists)
          //console.log(sessions)
          let joinedSession
          if(sessionExists){
            joinedSession = getSession(masterSessionId)
          }else{
            joinedSession = createSession()
          }
          // console.log(sessionExists)          
          //const joinedSession = getSession(data.id) || createSession(data.id);
          //console.log(joinedSession)
          joinedSession.join(client);
          client.state = data.state;
          broadcastSession(joinedSession);
          return
        case 'state-update' : 
          const [prop, value] = data.state;
          client.state[data.fragment][prop] = value;
          client.broadcast(data);
          return
        default: 
          return
      }


    })

    connection.on('close', () => {
      console.log('connection closed')
      const session = client.session;
      if(session){
        session.leave(client);
        if(session.clients.size === 0){
            sessions.delete(session.id);
        }
      }
      broadcastSession(session);
    })

})


