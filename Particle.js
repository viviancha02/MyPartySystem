class Particle {
    constructor(position) {
        this.position = position.copy();
        this.velocity = p5.Vector.random2D().mult(2);
        this.offsetAngle = random(TWO_PI);
        this.offsetRadius = random(40, 140);
        this.angle = 0;
        this.size = random(26, 38);
        this.falling = false;
        this.landed = false;
    }

    run() {
        this.update();
        this.display();
    }

    update() {
        if (this.landed) return;

        if (this.falling) {
            // 바닥으로 추락
            this.velocity.y += 0.35;
            this.velocity.x *= 0.99;
            this.angle += 0.12;
            this.position.add(this.velocity);
            this.position.x = constrain(this.position.x, 20, width - 20);

            if (this.position.y >= height - 10) {
                this.position.y = height - 10 - random(0, 20);
                this.landed = true;
                this.angle = random(TWO_PI);
            }
        } else {
            // 마우스 주변을 계속 돌며 날아감
            this.offsetAngle += 0.02;
            let target = createVector(
                mouseTarget.x + cos(this.offsetAngle) * this.offsetRadius,
                mouseTarget.y + sin(this.offsetAngle) * this.offsetRadius
            );
            target.x = constrain(target.x, 30, width - 30);
            target.y = constrain(target.y, 30, height - 30);

            let desired = p5.Vector.sub(target, this.position);
            desired.setMag(2);
            this.velocity.lerp(desired, 0.05);
            this.position.add(this.velocity);
            this.angle = this.velocity.heading();
        }
    }

    display() {
        push();
        translate(this.position.x, this.position.y);
        rotate(this.angle);

        let s = this.size;

        // 몸통
        noStroke();
        fill(255);
        ellipse(0, 0, s, s * 0.5);

        // 머리
        circle(s * 0.45, -s * 0.18, s * 0.34);

        // 부리
        triangle(
            s * 0.6, -s * 0.2,
            s * 0.8, -s * 0.12,
            s * 0.6, -s * 0.05
        );

        // 꼬리
        triangle(
            -s * 0.45, 0,
            -s * 0.8, -s * 0.25,
            -s * 0.8, s * 0.2
        );

        // 날개
        noFill();
        stroke(0);
        strokeWeight(s * 0.07);
        arc(-s * 0.05, -s * 0.02, s * 0.7, s * 0.45, PI, TWO_PI);

        pop();
    }
}



// // A simple Particle class
// let Particle = function(position) {
//   this.acceleration = createVector(0, 0.05);
//   this.velocity = createVector(random(-1, 1), random(-1, 0));
//   this.position = position.copy();
//   this.lifespan = 255;
// };

// Particle.prototype.run = function() {
//   this.update();
//   this.display();
// };

// // Method to update position
// Particle.prototype.update = function(){
//   this.velocity.add(this.acceleration);
//   this.position.add(this.velocity);
//   this.lifespan -= 2;
// };

// // Method to display
// Particle.prototype.display = function() {
//   stroke(200, this.lifespan);
//   strokeWeight(2);
//   fill(127, this.lifespan);
//   ellipse(this.position.x, this.position.y, 12, 12);
// };

// // Is the particle still useful?
// Particle.prototype.isDead = function(){
//   return this.lifespan < 0;
// };
