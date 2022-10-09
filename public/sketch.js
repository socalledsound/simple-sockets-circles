const socket = io()
let playerManager, localPlayer, connectionManager
let startButton


function setup(){
    createCanvas(600, 600)
    background(89)
    startButton = makeStartButton() 
    startButton.show()  

}

function draw(){
    
    if(localPlayer){
        background(43)
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


function makeStartButton(){
    const button = createButton('join')
    button.position(250, 300)
    button.style('padding', '2rem')
    button.style('border-radius', '0.9rem')
    button.style('font-size', '2rem')
    button.mousePressed(initLocalPlayer)
    return button
  }
  


function initLocalPlayer(){
    playerManager = new PlayerManager()
    localPlayer = playerManager.createPlayer()
    connectionManager = new ConnectionManager(socket, playerManager, localPlayer)
    connectionManager.init()
    startButton.hide()
}