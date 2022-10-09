

const socket = io()

let circle
let circles = []

function setup(){
    createCanvas(600, 600)
    //frameRate(10)
    // const pink = [220, 10, 200]
    const randomCol = [random(100,255), random(100, 255), random(100, 255)]
    circle = new Circle(300, 200, randomCol)
    circles.push(circle)
}

function draw(){
    background(43)
    circle.update()
    circle.checkEdges()
    circle.render()
}

function mouseMoved(){
    circle.moveToMouse(mouseX, mouseY)
}