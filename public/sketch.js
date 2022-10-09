const socket = io()
let playerManager, localPlayer, connectionManager



function setup(){
    createCanvas(600, 600)

    playerManager = new PlayerManager()
    localPlayer = playerManager.createPlayer()
    connectionManager = new ConnectionManager(socket, playerManager, localPlayer)
    connectionManager.initListeners()

}

function draw(){
    background(43)
    if(localPlayer){
        localPlayer.update()
        localPlayer.checkEdges()
        localPlayer.render()
    }

}

function mouseMoved(){
    if(localPlayer){
        localPlayer.moveToMouse(mouseX, mouseY)
    }
    
}