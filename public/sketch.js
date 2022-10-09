
class Circle{
    constructor(x, y){
        this.pos = createVector(x, y)
        this.r = 20
        this.vel = createVector(1,0)
    }

    checkEdges(){
        if(this.pos.x < 0){
            this.pos.x = width
        }
        if(this.pos.x > width){
            this.pos.x = 0
        }
        if(this.pos.y < this.r){
            this.pos.y = height
        }
        if(this.pos.y > height){
            this.pos.y = this.r
        }
    }


    update(){
        this.pos.add(this.vel)
    }

    render(){
        fill(this.col)
        ellipse(this.x, this.y, this.r)
    }
}

let circle

function setup(){
    createCanvas(600, 600)
    frameRate(10)
    circle = new Circle(300, 200)
}

function draw(){
    circle.update()
    circle.checkEdges()
    circle.render()
}