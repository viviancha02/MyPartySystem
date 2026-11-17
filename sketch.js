let system;
let mouseTarget;
let dropping = false;
let maxFlock = 40;

function setup() {
  createCanvas(420, 920);
  system = new ParticleSystem();

  // 마우스가 캔버스에 들어오기 전에는 가운데를 기준으로 삼습니다.
  mouseTarget = createVector(width / 2, height / 2);

  // 처음부터 비둘기들이 날아다니도록 채워 둡니다.
  startFlock();

  document.getElementById("reset").addEventListener("click", resetScene);
  document.getElementById("more").addEventListener("click", addMore);
}

function draw() {
  background(0);

  // 추락 중이 아닐 때만 새로운 비둘기가 나옵니다.
  if (!dropping) {
    system.addParticle(randomStart(), maxFlock);
  }

  system.run();
}

function mouseMoved() {
  mouseTarget.set(mouseX, mouseY);
}

function mouseDragged() {
  mouseTarget.set(mouseX, mouseY);
}

// 클릭하면 한 마리만 남기고 나머지는 추락합니다.
// 다시 클릭하면 새로운 비둘기가 다시 나옵니다.
function mousePressed() {
  mouseTarget.set(mouseX, mouseY);

  if (!dropping) {
    system.dropAll();
    dropping = true;
  } else {
    dropping = false;
  }
}

function startFlock() {
  for (let i = 0; i < maxFlock; i++) {
    system.addParticle(createVector(random(width), random(height)), maxFlock);
  }
}

// RESET: 쌓인 비둘기를 모두 지우고 처음 상태로 돌아갑니다.
function resetScene() {
  system.particles = [];
  dropping = false;
  maxFlock = 40;
  mouseTarget.set(width / 2, height / 2);
  startFlock();
}

// MORE: 쌓인 비둘기는 그대로 두고 나는 비둘기만 더 늘립니다.
function addMore() {
  maxFlock += 20;
  for (let i = 0; i < 20; i++) {
    system.addParticle(randomStart(), maxFlock);
  }
}

// 화면 가장자리에서 비둘기가 등장합니다.
function randomStart() {
  let side = floor(random(4));
  if (side === 0) return createVector(random(width), -20);
  if (side === 1) return createVector(width + 20, random(height));
  if (side === 2) return createVector(random(width), height + 20);
  return createVector(-20, random(height));
}
