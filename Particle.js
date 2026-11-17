// ─────────────────────────────────────────────
// 비둘기 한 마리를 담당하는 클래스
// 위치, 속도, 크기, 방향, 상태(날아다님 / 추락 / 착륙)를 가집니다.
// ─────────────────────────────────────────────
class Particle {
    // 새로운 비둘기를 만들고 처음 값을 정합니다.
    constructor(position) {
        this.position = position.copy();               // 현재 위치
        this.velocity = p5.Vector.random2D().mult(2);  // 처음 날아가는 방향과 속도
        this.offsetAngle = random(TWO_PI);             // 마우스 주변에서 돌 각도
        this.offsetRadius = random(40, 140);           // 마우스에서 떨어진 거리
        this.angle = 0;                                // 비둘기가 바라보는 방향
        this.size = random(26, 38);                    // 비둘기 크기
        this.falling = false;                          // 추락 중인지
        this.landed = false;                           // 바닥에 닿았는지
    }

    // 한 프레임마다 "움직이기"와 "그리기"를 실행합니다.
    run() {
        this.update();
        this.display();
    }

    // 비둘기의 위치와 방향을 계산합니다.
    update() {
        // 이미 바닥에 닿은 비둘기는 움직이지 않습니다.
        if (this.landed) return;

        // ── 추락 중일 때 ─────────────────────────
        if (this.falling) {
            this.velocity.y += 0.35;   // 중력을 받아 아래로 점점 빨라짐
            this.velocity.x *= 0.99;   // 옆으로 가는 속도는 조금씩 줄어듦
            this.angle += 0.12;        // 떨어지면서 빙글빙글 돎
            this.position.add(this.velocity);

            // 화면 밖으로 나가지 않게 막습니다.
            this.position.x = constrain(this.position.x, 20, width - 20);

            // 바닥에 닿으면 그 자리에 멈추고 착륙 상태가 됩니다.
            if (this.position.y >= height - 10) {
                this.position.y = height - 10 - random(0, 20); // 바닥 근처에 쌓임
                this.landed = true;
                this.angle = random(TWO_PI); // 착륙하면 아무 방향으로나 눕힘
            }
        } else {
            // ── 날아다닐 때 ─────────────────────
            // 마우스 주변을 빙글빙글 도는 목표 지점을 만듭니다.
            this.offsetAngle += 0.02;
            let target = createVector(
                mouseTarget.x + cos(this.offsetAngle) * this.offsetRadius,
                mouseTarget.y + sin(this.offsetAngle) * this.offsetRadius
            );

            // 목표 지점도 화면 안에 있게 합니다.
            target.x = constrain(target.x, 30, width - 30);
            target.y = constrain(target.y, 30, height - 30);

            // 목표 지점 쪽으로 방향을 조금씩 바꿉니다.
            let desired = p5.Vector.sub(target, this.position);
            desired.setMag(2); // 날아가는 속도
            this.velocity.lerp(desired, 0.05);
            this.position.add(this.velocity);

            // 움직이는 방향을 바라보게 합니다.
            this.angle = this.velocity.heading();
        }
    }

    // 하얀 비둘기 모양을 그립니다.
    // 몸통, 머리, 부리, 꼬리, 날개를 도형으로 하나씩 그립니다.
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

        // 날개 (검은 선으로 그려서 몸통과 구분)
        noFill();
        stroke(0);
        strokeWeight(s * 0.07);
        arc(-s * 0.05, -s * 0.02, s * 0.7, s * 0.45, PI, TWO_PI);

        pop();
    }
}
