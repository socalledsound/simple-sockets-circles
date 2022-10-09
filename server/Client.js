class Client{
    constructor(conn, id){
        this.conn = conn
        this.id = id
        this.session = null
        this.state = null
    }
}

module.exports = Client;