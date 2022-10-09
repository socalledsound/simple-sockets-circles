class Snake{
    constructor(x, y, col){
        this.pos = createVector(x, y)
        this.r = 100
        this.vel = createVector(0,0)
        this.acc = createVector(0,0)
        // this.friction = 0.99
        this.maxForce = 0.1
        this.maxVel = 2.0
        this.col = col
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

    moveToMouse(mx, my){
        const mouse = createVector(mx, my)  
        this.acc = p5.Vector.sub(mouse,this.pos);
        this.acc.setMag(this.maxForce)
        this.vel.add(this.acc)
         this.acc.mult(0)
      }


    update(){
        this.pos.add(this.vel)
    }

    render(){
        fill(this.col)
        ellipse(this.pos.x, this.pos.y, this.r)
    }
}
