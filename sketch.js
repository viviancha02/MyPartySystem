// ─────────────────────────────────────────────
// 전체 프로그램에서 함께 쓰는 값들
// ─────────────────────────────────────────────
let system;              // 비둘기 무리
let mouseTarget;         // 비둘기들이 따라갈 마우스 위치
let dropping = false;    // 클릭해서 비둘기가 추락 중인지
let maxFlock = 40;       // 지금 유지할 비둘기 수
let cnv;                 // 캔버스 (버튼 클릭과 구분하기 위해 저장)


// ─────────────────────────────────────────────
// 처음 한 번만 실행되는 설정
// ─────────────────────────────────────────────
function setup() {
  cnv = createCanvas(420, 920); // 휴대폰보다 세로로 긴 화면
  system = new ParticleSystem();

  // 마우스가 캔버스에 들어오기 전에는 화면 가운데를 기준으로 삼습니다.
  mouseTarget = createVector(width / 2, height / 2);

  // 처음부터 비둘기들이 날아다니게 채워 둡니다.
  startFlock();

  // RESET, MORE 버튼에 클릭 기능을 연결합니다.
  document.getElementById("reset").addEventListener("click", resetScene);
  document.getElementById("more").addEventListener("click", addMore);

  // 슬라이더를 움직이면 옆에 있는 숫자도 같이 바뀌게 합니다.
  let slider = document.getElementById("moreCount");
  let label = document.getElementById("moreCountValue");

  slider.addEventListener("input", function () {
    label.textContent = slider.value;
  });
}


// ─────────────────────────────────────────────
// 매 프레임마다 반복되는 화면 그리기
// ─────────────────────────────────────────────
function draw() {
  background(0); // 검은 화면

  // 추락 중이 아닐 때만 새로운 비둘기가 나옵니다.
  if (!dropping) {
    system.addParticle(randomStart(), maxFlock);
  }

  system.run();
}


// ─────────────────────────────────────────────
// 마우스 위치 저장
// ─────────────────────────────────────────────
function mouseMoved() {
  mouseTarget.set(mouseX, mouseY);
}

function mouseDragged() {
  mouseTarget.set(mouseX, mouseY);
}


// ─────────────────────────────────────────────
// 캔버스를 클릭했을 때
// 처음 클릭: 한 마리만 남기고 나머지 추락
// 다시 클릭: 새로운 비둘기 생성 재개
// ─────────────────────────────────────────────
function mousePressed(event) {
  // 버튼이나 슬라이더를 눌렀을 때는 캔버스 클릭으로 치지 않습니다.
  if (event && event.target !== cnv.elt) return;

  mouseTarget.set(mouseX, mouseY);

  if (!dropping) {
    system.dropAll();
    dropping = true;
  } else {
    dropping = false;
  }
}


// ─────────────────────────────────────────────
// 처음 비둘기 무리를 만드는 함수
// ─────────────────────────────────────────────
function startFlock() {
  for (let i = 0; i < maxFlock; i++) {
    system.addParticle(createVector(random(width), random(height)), maxFlock);
  }
}


// ─────────────────────────────────────────────
// RESET 버튼
// 쌓인 비둘기를 모두 지우고 처음 상태로 돌아갑니다.
// ─────────────────────────────────────────────
function resetScene() {
  system.particles = [];
  dropping = false;
  maxFlock = 40;
  mouseTarget.set(width / 2, height / 2);
  startFlock();
}


// ─────────────────────────────────────────────
// MORE 버튼
// 쌓인 비둘기는 그대로 두고,
// 슬라이더에 정한 수만큼 나는 비둘기를 더 만듭니다.
// ─────────────────────────────────────────────
function addMore() {
  let count = int(document.getElementById("moreCount").value);

  maxFlock += count;

  for (let i = 0; i < count; i++) {
    system.addParticle(randomStart(), maxFlock);
  }
}


// ─────────────────────────────────────────────
// 화면 가장자리의 무작위 위치를 돌려줍니다.
// 새 비둘기는 이 위치에서 등장합니다.
// ─────────────────────────────────────────────
function randomStart() {
  let side = floor(random(4));

  if (side === 0) return createVector(random(width), -20); // 위
  if (side === 1) return createVector(width + 20, random(height)); // 오른쪽
  if (side === 2) return createVector(random(width), height + 20); // 아래
  return createVector(-20, random(height)); // 왼쪽
}
