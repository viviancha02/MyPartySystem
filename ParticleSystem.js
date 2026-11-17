// ─────────────────────────────────────────────
// 비둘기 무리 전체를 관리하는 클래스
// 비둘기를 추가하고, 전체를 움직이고, 한 번에 추락시키는 일을 합니다.
// ─────────────────────────────────────────────
class ParticleSystem {
    // 무리 배열을 비웁니다.
    constructor() {
        this.particles = [];
    }

    // 비둘기 한 마리를 추가합니다.
    // limit(최대 마리 수)보다 적을 때만 추가합니다.
    // MORE 버튼처럼 원래 정해진 수보다 더 많이 만들 때는 limit을 크게 넘겨줍니다.
    addParticle(position, limit = 40) {
        let flying = 0;
        for (let p of this.particles) {
            if (!p.falling && !p.landed) flying++;
        }

        if (flying < limit) {
            this.particles.push(new Particle(position));
        }
    }

    // 마우스에 가장 가까운 비둘기 한 마리만 남기고
    // 나머지는 모두 추락 상태로 바꿉니다.
    dropAll() {
        let keeper = null;

        // 남길 비둘기(마우스와 가장 가까운 비둘기)를 찾습니다.
        let closest = Infinity;
        for (let p of this.particles) {
            if (p.falling || p.landed) continue;

            let d = dist(p.position.x, p.position.y, mouseTarget.x, mouseTarget.y);
            if (d < closest) {
                closest = d;
                keeper = p;
            }
        }

        // 남길 비둘기를 제외하고 모두 추락시킵니다.
        for (let p of this.particles) {
            if (p !== keeper && !p.landed) {
                p.falling = true;
            }
        }
    }

    // 모든 비둘기를 한 프레임씩 움직이고 그립니다.
    run() {
        for (let p of this.particles) {
            p.run();
        }
    }
}
