class CannonBall{
    constructor(x, y) {
        var options = {
          isStatic: true,
          restitution: 0.8,
          friction: 1,
          density: 1
        };

        this.r = 40;
        this.body = Bodies.circle(x, y, this.r, options);
        this.image = loadImage("assets/cannonball.png")
        World.add(world, this.body);
      }
      shoot(){
        var velocity = p5.Vector.fromAngle(cannon.angle)
        velocity.mult(20)
        var cannonAngle = cannon.angle;
        Matter.Body.setStatic(this.body,false)
        Matter.Body.setVelocity(this.body,{x:velocity.x,y:velocity.y})
    }

      display() {
        var pos = this.body.position;
        var angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle)
        imageMode(CENTER);
        image(this.image, 0, 0, this.r,this.r);
        pop();
      }
      remove(index) {
        Matter.Body.setVelocity(this.body,{x:0, y:0})
        setTimeout(()=>{
          Matter.World.remove(world,this.body)
          delete balls[index]
        },1000)
      }  
    }  