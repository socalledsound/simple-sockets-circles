class PlayerManager{
    constructor(){
        this.players = new Set
    }

    createPlayer(){
        const x = random(100, width-100)
        const y = random(100, height - 100)
        const col = [random(100, 255), random(100, 255),random(100, 255)]
        const snake = new Snake(x, y, col)
        this.players.add(snake)
        return snake
    }

    removePlayer(snake){
        this.instances.delete(snake);
        //this.document.body.removeChild(tetris.el);
    }

    // sortPlayers(snakes){
    //     snakes.forEach(snake => {
    //         this.document.body.appendChild(tetris.el);
    //     })
    // }
}