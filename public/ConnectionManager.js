class ConnectionManager{
    constructor(socket, playerManager, localPlayer){
        this.conn = socket
        this.playerManager = playerManager
        this.localPlayer = localPlayer
        this.peers = new Map
    }

    init(){
        this.handleInit()
        //this.conn.emit('message', {type: 'get-sessions'})
        this.conn.emit('message', {type: 'join-session', state: localPlayer})
        this.conn.on('message', (msg) => {
            console.log('received message', msg)
            this.received(msg)
        })
    }

    handleInit = () => {
        console.log('connection established on client')
        //this.initSession()
        // this is already happening, we have one session with a masterSessionId
        this.watchEvents()
    }

    // initSession(){
    //     // console.log(window.location.hash)
    //     // const sessionId = window.location.hash.split('#')[1];
       
        
    }

    received(msg){
        console.log(msg)
        if(msg.type === 'session-broadcast'){
            this.updateManager(msg);
        } else if(msg.type === 'state-update'){
            this.updatePeer(data.clientId, data.fragment, data.state);
        }
    }

    updateManager({peers}){
        const me = peers.you;
        const clients = peers.clients.filter( client => me !== client.id);
        clients.forEach( client => {
            if(!this.peers.has(client.id)){
                const snake = this.playerManager.createPlayer();
                console.log(snake)
                //tetris.unserialize(client.state);
                this.peers.set(client.id, snake);
            }
        });
        [...this.peers.entries()].forEach(([id, snake]) => {
            if(!clients.some( client => client.id === id)){
                this.playerManager.removePlayer(snake);
                this.peers.delete(id);
            }
        })

        const sorted = peers.clients.map( client => {
            return this.peers.get(client.id) || this.localPlayer
        });
        //this.playerManager.sortPlayers(sorted);


    }


    updatePeer(id, fragment, [prop, value]){
        if(!this.peers.has(id)){
            console.error('client does not exist', id);
            return
        } 
        const tetris = this.peers.get(id);
        console.log(tetris);
        tetris[fragment][prop] = value;

        if( prop === 'score'){
            tetris.updateScore(value)
        } else {
            tetris.draw();
        }
    }

    watchEvents(){

    }
}