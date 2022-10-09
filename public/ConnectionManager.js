class ConnectionManager{
    constructor(socket, playerManager, localPlayer){
        this.conn = socket
        this.playerManager = playerManager
        this.localPlayer = localPlayer
        this.peers = new Map
    }

    initListeners(){
        this.conn.on('open', this.handleInit)
        this.conn.on('message', (e) => {
            console.log('received message', e.data)
            this.recieved(e.data)
        })
    }

    handleInit = () => {
        console.log('connection established on client')
        this.initSession()
        this.watchEvents()
    }
}