const socket = io()
const playerManager = new PlayerManager()
const localPlayer = playerManager.createPlayer()


function setup(){
    createCanvas(600, 600)

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