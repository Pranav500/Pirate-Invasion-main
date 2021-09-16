class Boat {
    constructor(x, y, width, height, boatPos, boatAnimation) {

      var options = {
        restitution: 0.8,
        friction: 1.0,
        density: 1.0
      }

      this.width = width;
      this.height = height;
      this.boatPos = boatPos;
      this.speed = 0.05;
      this.animation = boatAnimation;
      this.image = loadImage("/assets/boat.png")
      this.body = Bodies.rectangle(x, y, this.width, this.height, options);
      this.isBroken = false;
      World.add(world, this.body);
    }
    display() {
      var pos = this.body.position;
      var index = floor (this.speed % this.animation.length);
      push();
      translate(pos.x, pos.y);
      imageMode(CENTER);
      image(this.animation[index], 0, this.boatPos, this.width, this.height);
      pop();
    }
    remove(index) {
      this.animation = brokenBoatAnimation;
      this.speed = 0.05;
      this.width = 150;
      this.height = 150;
      this.isBroken = true;
      setTimeout(()=>{
        Matter.World.remove(world,boats[index].body);
        delete boats[index];
      },2000)
    }  
    animate(){
      this.speed += 0.05;
    }
  }