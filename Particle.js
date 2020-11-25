class Particle {
    constructor(x, y,r) {
        var options ={
            restitution:0.4
        }
        this.r=r;
      
        this.body = Bodies.circle(x, y, this.r,options);       
        this.color=color(random(0, 255), random(0, 255), random(0, 255));
        World.add(world, this.body);

    }
    display(){
        var pos = this.body.position;

        push();
        noStroke();
        fill(this.color)
        ellipseMode(RADIUS);
        circle(pos.x, pos.y, this.r);
        pop();
    }

};