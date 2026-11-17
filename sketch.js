let system;
let canPos;
let dropping = false;

function setup() {
  createCanvas(720, 400);
  system = new ParticleSystem(createVector(width / 2, 50));
  canPos = createVector(width / 2, height / 2);
}

function draw() {
  background(0);

  // 물뿌리개는 마우스를 따라 움직입니다.
  canPos.set(mouseX, mouseY);
  drawWateringCan(canPos.x, canPos.y);

  // 비둘기는 물뿌리개 주둥이 끝에서 나옵니다.
  system.setOrigin(createVector(canPos.x + 100, canPos.y + 25));

  // 추락 중이 아닐 때만 새로운 비둘기가 나옵니다.
  if (!dropping) {
    system.addParticle();
  }

  system.run();
}

// 클릭하면 한 마리만 남기고 나머지는 추락합니다.
// 다시 클릭하면 새로운 비둘기가 다시 나옵니다.
function mousePressed() {
  if (!dropping) {
    system.dropAll();
    dropping = true;
  } else {
    dropping = false;
  }
}

function drawWateringCan(x, y) {
  push();
  translate(x, y);

  // 몸통
  noStroke();
  fill(180, 200, 210);
  rect(0, 0, 60, 45, 8);

  // 손잡이
  noFill();
  stroke(180, 200, 210);
  strokeWeight(6);
  arc(22, 0, 46, 46, PI, TWO_PI);

  // 주둥이
  strokeWeight(10);
  line(58, 12, 100, 25);

  pop();
}
