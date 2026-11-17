class ParticleSystem {
    constructor(position) {
        this.origin = position.copy();
        this.particles = [];
    }

    addParticle() {
        let flying = 0;
        for (let p of this.particles) {
            if (!p.falling && !p.landed) flying++;
        }
        if (flying < 40) {
            this.particles.push(new Particle(this.origin));
        }
    }

    setOrigin(position) {
        this.origin = position.copy();
    }

    // 한 마리만 남기고 나머지는 추락시킵니다.
    dropAll() {
        let keeper = null;
        let closest = Infinity;

        for (let p of this.particles) {
            if (p.falling || p.landed) continue;
            let d = dist(p.position.x, p.position.y, mouseX, mouseY);
            if (d < closest) {
                closest = d;
                keeper = p;
            }
        }

        for (let p of this.particles) {
            if (p !== keeper && !p.landed) {
                p.falling = true;
            }
        }
    }

    run() {
        for (let i = this.particles.length-1; i >= 0; i--) {
            let p = this.particles[i];
            p.run();

            // 바닥에 쌓이도록 옆에 착륙한 비둘기 수만큼 높입니다.
            if (p.landed && !p.stacked) {
                p.stacked = true;
                let stack = 0;
                for (let other of this.particles) {
                    if (other !== p && other.landed && abs(other.position.x - p.position.x) < 18) {
                        stack++;
                    }
                }
                p.position.y = max(0, p.position.y - stack * 6);
            }
        }
    }

}


// let ParticleSystem = function(position) {
//   this.origin = position.copy();
//   this.particles = [];
// };

// ParticleSystem.prototype.addParticle = function() {
//   this.particles.push(new Particle(this.origin));
// };

// ParticleSystem.prototype.run = function() {
//   for (let i = this.particles.length-1; i >= 0; i--) {
//     let p = this.particles[i];
//     p.run();
//     if (p.isDead()) {
//       this.particles.splice(i, 1);
//     }
//   }
// };