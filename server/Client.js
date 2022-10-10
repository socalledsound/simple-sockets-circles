class Client{
    constructor(conn, id){
        this.conn = conn
        this.id = id
        this.session = null
        this.state = null
    }

    broadcast(data){
        if(!this.session){
            throw new Error('cannot broadcase without joing session')
        }
        data.clientId = this.id
        this.session.clients.forEach(client => {
            if(this == client){
                return
            }
            client.send(data)
            //console.log('broadcasting', data)
        })
    }

    send(data){
        console.log('ready to send', data)
    }
}

module.exports = Client;