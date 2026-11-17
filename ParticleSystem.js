class ParticleSystem {
    constructor() {
        this.particles = [];
    }

    addParticle(position) {
        let flying = 0;
        for (let p of this.particles) {
            if (!p.falling && !p.landed) flying++;
        }
        if (flying < 40) {
            this.particles.push(new Particle(position));
        }
    }

    // 한 마리만 남기고 나머지는 추락시킵니다.
    dropAll() {
        let keeper = null;
        let closest = Infinity;

        for (let p of this.particles) {
            if (p.falling || p.landed) continue;
            let d = dist(p.position.x, p.position.y, mouseTarget.x, mouseTarget.y);
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
        for (let p of this.particles) {
            p.run();
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