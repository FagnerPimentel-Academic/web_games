const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let pacmanX = 200;
let pacmanY = 180;
let pacmanSpeed = 2;
let pacmanDirection = 0; 
let pacmanRadius = 14;
let mouthDirection = 0.05;
let mouthOpen = 0.2;

let vidas = 3;
let posicaoInicio = { x: pacmanX, y: pacmanY };

const paredes = [
  // bordas
  { x: 0, y: 0, width: 400, height: 7 },
  { x: 0, y: 0, width: 7, height: 365 },
  { x: 393, y: 0, width: 7, height: 365 },
  { x: 0, y: 358, width: 400, height: 7 }, 
  // paredes do lado esquerdo
  { x: 40, y: 40, width: 7, height: 120 },
  { x: 40, y: 40, width: 50, height: 7 },
  { x: 40, y: 320, width: 50, height: 7 },
  { x: 40, y: 205, width: 7, height: 120 },
  // paredes do lado direito
  { x: 353, y: 40, width: 7, height: 120 },
  { x: 310, y: 40, width: 50, height: 7 },
  { x: 310, y: 320, width: 50, height: 7 },
  { x: 353, y: 205, width: 7, height: 120 },

  { x: 125, y: 0, width: 7, height: 40 },
  { x: 270, y: 0, width: 7, height: 40 },
  { x: 125, y: 325, width: 7, height: 40 },
  { x: 270, y: 325, width: 7, height: 40 },

  { x: 80, y: 80, width: 85, height: 7 },
  { x: 165, y: 40, width: 70, height: 7 },
  { x: 240, y: 80, width: 80, height: 7 },

  { x: 80, y: 280, width: 85, height: 7 },
  { x: 165, y: 320, width: 70, height: 7 },
  { x: 240, y: 280, width: 80, height: 7 },

  //T de cima
  { x: 200, y: 80, width: 7, height: 40 },
  { x: 80, y: 120, width: 240, height: 7 },
  //T de baixo
  { x: 200, y: 245, width: 7, height: 40 },
  { x: 80, y: 240, width: 240, height: 7 },
  // quadrado central
  { x: 80, y: 160, width: 100, height: 7 },
  { x: 220, y: 160, width: 100, height: 7 },
  { x: 80, y: 200, width: 240, height: 7 },
  { x: 80, y: 160, width: 7, height: 40 },
  { x: 313, y: 160, width: 7, height: 46 },
];

class Fantasminha {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.speed = 1.5;
    this.direction = Math.floor(Math.random() * 4) * 90;
    this.radius = 14;
    this.color = color;
    this.scared = false; 
  }

  move() {
    let nextX = this.x;
    let nextY = this.y;

    switch (this.direction) {
      case 0: nextX += this.speed; break;
      case 90: nextY += this.speed; break;
      case 180: nextX -= this.speed; break;
      case 270: nextY -= this.speed; break;
    }

    if (nextX - this.radius < 0 || nextX + this.radius > canvas.width ||
        nextY - this.radius < 0 || nextY + this.radius > canvas.height ||
        checkCollision(nextX, nextY, this.radius)) {
      this.changeDirection();
    } else {
      this.x = nextX;
      this.y = nextY;
    }
  }

  changeDirection() {
    const possibleDirections = [0, 90, 180, 270];
    const currentDirectionIndex = possibleDirections.indexOf(this.direction);
    possibleDirections.splice(currentDirectionIndex, 1);
    this.direction = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.scared ? 'blue' : this.color; // Altera a cor se estiver assustado
    ctx.fill();
    ctx.closePath();
  }
}

const cor_fantasmas = ['red', 'pink', 'cyan', 'orange'];
let fantasminhas = [
  new Fantasminha(20, 100, cor_fantasmas[0]),
  new Fantasminha(300, 100, cor_fantasmas[1]),
  new Fantasminha(100, 300, cor_fantasmas[2]),
  new Fantasminha(377, 300, cor_fantasmas[3])
];

let moedas = [];
for (let i = 20; i < canvas.width; i += 40) {
  for (let j = 20; j < canvas.height; j += 40) {
    if (!checkCollision(i, j, 5)) {
      moedas.push({ x: i, y: j });
    }
  }
}

let moedasEspeciais = [];
const moedasEspeciaisPositions = [
  { x: 60, y: 60 },
  { x: 140, y: 140 },
  { x: 220, y: 220 },
  { x: 300, y: 300 }
];

moedasEspeciaisPositions.forEach(pos => {
  if (!checkCollision(pos.x, pos.y, 7)) {
    moedasEspeciais.push(pos);
  }
});

let poderMoeda = false;
let poderMoedaTimer = 0;
const poderMoedaDuration = 5000;

function checkCollision(x, y, radius) {
  return paredes.some(obstacle => {
    return (
      x + radius > obstacle.x && 
      x - radius < obstacle.x + obstacle.width &&
      y + radius > obstacle.y && 
      y - radius < obstacle.y + obstacle.height
    );
  });
}

function drawParedes() {
  paredes.forEach(obstacle => {
    ctx.fillStyle = 'blue';
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
  });
}

function drawMoedas() {
  ctx.fillStyle = 'gold';
  moedas.forEach(moeda => {
    ctx.beginPath();
    ctx.arc(moeda.x, moeda.y, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  });
}

function drawMoedasEspeciais() {
  ctx.fillStyle = 'orange';
  moedasEspeciais.forEach(moeda => {
    ctx.beginPath();
    ctx.arc(moeda.x, moeda.y, 7, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  });
}


function printVida() {
  ctx.fillStyle = 'white';
  ctx.font = "12px 'Press Start 2P', cursive";
  ctx.fillText(`Vidas: ${vidas}`, 10, 20);
}

function drawPacman() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawParedes();
  drawMoedas();
  drawMoedasEspeciais();

  let nextX = pacmanX;
  let nextY = pacmanY;

  switch (pacmanDirection) {
    case 0: nextX += pacmanSpeed; break;
    case 90: nextY += pacmanSpeed; break;
    case 180: nextX -= pacmanSpeed; break;
    case 270: nextY -= pacmanSpeed; break;
  }

  if (nextX - pacmanRadius < 0 || nextX + pacmanRadius > canvas.width) {
    nextX = pacmanX;
  }
  if (nextY - pacmanRadius < 0 || nextY + pacmanRadius > canvas.height) {
    nextY = pacmanY;
  }

  if (!checkCollision(nextX, nextY, pacmanRadius)) {
    pacmanX = nextX;
    pacmanY = nextY;
  }

  fantasminhas.forEach(fantasma => {
    const dist = Math.hypot(pacmanX - fantasma.x, pacmanY - fantasma.y);
    if (dist <= pacmanRadius + fantasma.radius) { 
      if (!poderMoeda) {
        vidas--;
        if (vidas > 0) {
          pacmanX = posicaoInicio.x;
          pacmanY = posicaoInicio.y;
        } else {
          window.location.href = 'gameover.html?game=pacman.html'; 
        }
      } else {
        fantasma.x = 200;
        fantasma.y = 150;
      }
    }
  });

  moedas.forEach((moeda, index) => {
    const moedaDist = Math.hypot(pacmanX - moeda.x, pacmanY - moeda.y);
    if (moedaDist <= pacmanRadius + 5) {
      moedas.splice(index, 1);
    }
  });

  moedasEspeciais.forEach((moeda, index) => {
    const moedaDist = Math.hypot(pacmanX - moeda.x, pacmanY - moeda.y);
    if (moedaDist <= pacmanRadius + 7) {
      moedasEspeciais.splice(index, 1); 
      poderMoeda = true; 
      poderMoedaTimer = poderMoedaDuration; 
      fantasminhas.forEach(fantasma => fantasma.scared = true); // Fantasmas ficam assustados
    }
  });

  if (moedas.length === 0 && moedasEspeciais.length === 0) {
    const victoryMessage = "Preparado para a próxima fase? Ajude o Mario a chegar ao fim!";
    const keynotes = "Ao chegar, abaixe para entrar no cano e ir para a próxima fase";
    const game = "mario.html";
    window.location.href = `win.html?message=${victoryMessage}&game=${game}&keynotes=${keynotes}`;
  }

  if (poderMoeda) {
    poderMoedaTimer -= 1000 / 60; // Diminui o tempo restante
    if (poderMoedaTimer <= 0) {
      poderMoeda = false; 
      fantasminhas.forEach(fantasma => fantasma.scared = false);
    }
  }

  ctx.beginPath();
  ctx.moveTo(pacmanX, pacmanY);

  const startAngle = pacmanDirection * Math.PI / 180 + mouthOpen;
  const endAngle = pacmanDirection * Math.PI / 180 + 2 * Math.PI - mouthOpen;

  ctx.arc(pacmanX, pacmanY, pacmanRadius, startAngle, endAngle);
  ctx.lineTo(pacmanX, pacmanY);
  ctx.fillStyle = 'yellow';
  ctx.fill();
  ctx.closePath();

  mouthOpen += mouthDirection;
  
  // Inverte o movimento da boca quando atinge os limites
  if (mouthOpen > 0.4 || mouthOpen < 0.1) {
    mouthDirection = -mouthDirection;
  }

  printVida();

  fantasminhas.forEach(fantasma => {
    fantasma.move();
    fantasma.draw();
  });

  requestAnimationFrame(drawPacman);
}

drawPacman();

document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp': 
      pacmanDirection = 270; 
      break;
    case 'ArrowDown': 
      pacmanDirection = 90; 
      break;
    case 'ArrowLeft': 
      pacmanDirection = 180; 
      break;
    case 'ArrowRight': 
      pacmanDirection = 0; 
      break;
  }
});

document.addEventListener("keydown", function(e) {
  if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
    e.preventDefault();
  }
}, false);
