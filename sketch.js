let system;
let canPos;
let stopped = false;

function setup() {
  createCanvas(720, 400);
  system = new ParticleSystem(createVector(width / 2, 50));
  canPos = createVector(width / 2, height / 2);
}

function draw() {
  background(51);

  // 멈춰 있지 않을 때만 물뿌리개가 마우스를 따라 움직입니다.
  if (!stopped) {
    canPos.set(mouseX, mouseY);
  }

  drawWateringCan(canPos.x, canPos.y);

  // 물은 물뿌리개 주둥이 끝에서 나옵니다.
  system.setOrigin(createVector(canPos.x + 100, canPos.y + 25));
  system.addParticle();
  system.run();
}

// 클릭하면 그 위치에서 멈추고, 다시 클릭하면 마우스를 따라 움직입니다.
function mousePressed() {
  if (stopped) {
    stopped = false;
  } else {
    canPos.set(mouseX, mouseY);
    stopped = true;
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
