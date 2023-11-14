const calvas = document.getElementById('calvas');
const ctx = calvas.getContext('2d');

let jogador = {x: calvas.width / 2, y: calvas.height / 2, raio: 10};
let teclas = {}
let raio_escudo = 50;
let escudo = {x: jogador.x, y: jogador.y + raio_escudo, raio: raio_escudo, espessura: 5};
let projeteis = [];
let score = 0;
let vidas = 3;
let iniciado = 0;

// Lidando com input do jogador
document.addEventListener("keydown", function (evento){
  teclas[evento.key] = true;
  console.log(teclas);
  evento.preventDefault();
  return false;
});

document.addEventListener("keyup", function (evento){
  delete teclas[evento.key];
  console.log(teclas);
  return false;
});

// Função auxiliar para desenhar o jogador novamente depois de todo clear
function desenhaJogador() {
  ctx.beginPath();
  ctx.arc(jogador.x, jogador.y, jogador.raio, 0, Math.PI * 2);
  ctx.fillStyle = 'blue';
  ctx.fill();
}

// Desenha o escudo novamente depois de todo clear baseado na posição do mesmo
function desenhaEscudo() {
  ctx.beginPath();
  if (escudo.x == jogador.x && escudo.y == jogador.y - escudo.raio) { // Para cima
    ctx.arc(jogador.x, jogador.y, escudo.raio, 5 * (Math.PI / 4), 7 * (Math.PI / 4));
  }
  else if (escudo.x == jogador.x && escudo.y == jogador.y + escudo.raio) { // Para baixo
    ctx.arc(jogador.x, jogador.y, escudo.raio, 1 * (Math.PI / 4), 3 * (Math.PI / 4));
  }
  else if (escudo.x == jogador.x - escudo.raio && escudo.y == jogador.y) { // Para a esquerda
    ctx.arc(jogador.x, jogador.y, escudo.raio, 3 * (Math.PI / 4), 5 * (Math.PI / 4));
  }
  else if (escudo.x == jogador.x + escudo.raio && escudo.y == jogador.y) { // Para direita
    ctx.arc(jogador.x, jogador.y, escudo.raio, 7 * (Math.PI / 4), 1 * (Math.PI / 4));
  }
  ctx.strokeStyle = 'white';
  ctx.lineWidth = escudo.espessura;
  ctx.stroke();
}

// Desenha todos os projéteis após cada atualização do canvas
function desenhaProjeteis() {
  for (let i = 0; i < projeteis.length; i++) { // Passando por todos os projéteis na lista
    const projetil = projeteis[i];
    ctx.beginPath();
    ctx.arc(projetil.x, projetil.y, projetil.size, 0, Math.PI * 2);
    ctx.fillStyle = projetil.cor;
    ctx.fill();
  }
}

// Menu inicial
function menu() {
  ctx.font = "50px Papyrus";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText("S.I.M.P.D", calvas.width/2, calvas.height/2);
  ctx.font = "20px Papyrus";
  ctx.fillText("Clique em Jogar", calvas.width/2, 3*calvas.height/5);
}

// Escreve o Score e as vidas do jogador
function statusJogador() {
  ctx.font = 'bold 20px sans-serif';
  ctx.fillStyle = 'white';
  ctx.textAlign = "left";
  ctx.fillText(`Score: ${score}`, 10, 30);
  ctx.font = 'bold 20px sans-serif';
  ctx.fillStyle = 'white';
  ctx.fillText(`Vidas: ${vidas}`, calvas.width - 90, 30);
}

// Faz efetivamente os cálculos
function update() {
  for (let i = 0; i < projeteis.length; i++) {
    const projetil = projeteis[i];
    const distancia_escudo_x = escudo.x - projetil.x;
    const distancia_escudo_y = escudo.y - projetil.y;
    const distancia_jogador_x = jogador.x - projetil.x;
    const distancia_jogador_y = jogador.y - projetil.y;
    const distancia_escudo = Math.sqrt(distancia_escudo_x * distancia_escudo_x + distancia_escudo_y * distancia_escudo_y);
    const distancia_jogador = Math.sqrt(distancia_jogador_x * distancia_jogador_x + distancia_jogador_y * distancia_jogador_y);
    if (distancia_escudo <= escudo.espessura + projetil.size) {
      projeteis.splice(i, 1);
      score += projetil.pontos;
      continue;
    }
    if (distancia_jogador <= projetil.size + jogador.raio) {
      projeteis.splice(i, 1);
      vidas -= projetil.dano;
      continue;
    }
    projetil.x += projetil.velX;
    projetil.y += projetil.velY;
  }
}

// Função para definir propriedades de cada projetil
function geraProjetil() {
  const especiais = ['rapido', 'cura', 'escondido'];
  const direcoes = ['cima', 'baixo', 'esquerda', 'direita'];
  let pX, pY, velX, velY;
  let pVelocidade = score * 0.05 + 2;
  let dano = 1;
  let pontos = 1;
  if (Math.random() > 0.9) {
    switch (especiais[Math.floor(Math.random() * especiais.length)]) {
      case 'rapido':
        cor = 'yellow';
        pVelocidade *= 2;
        pontos = 3;
        break;
      case 'cura':
        cor = 'green';
        dano = -1;
        break;
      case 'escondido':
        cor = '#171414';
        pontos = 2;
        pVelocidade *= 0.8;
    }
  }
  else {
    cor = "red";
  }
  switch (direcoes[Math.floor(Math.random() * direcoes.length)]) {
    case 'cima':
      velX = 0;
      pX = calvas.width/2;
      pY = 0;
      velY = pVelocidade;
      break;
    case 'baixo':
      velX = 0;
      pX = calvas.width/2;
      pY = calvas.width;
      velY = -pVelocidade;
      break;
    case 'esquerda':
      pX = 0;
      pY = calvas.width/2;
      velX = pVelocidade;
      velY = 0;
      break;
    case 'direita':
      pX = calvas.width;
      pY = calvas.width/2;
      velX = -pVelocidade;
      velY = 0;
      break;
    }
  const projetil = {
    x: pX,
    y: pY,
    size: 5,
    velX: velX,
    velY: velY,
    cor: cor,
    dano: dano,
    pontos: pontos
  };
  projeteis.push(projetil);
}

// Mostrar o fim de jogo
function gameOver() {
  ctx.clearRect(0, 0, calvas.width, calvas.height);
  ctx.font = "50px Papyrus";
  ctx.fillStyle = "red";
  ctx.textAlign = "center";
  ctx.fillText("Fim de jogo!", calvas.width/2, calvas.height/2);
  ctx.font = "20px Papyrus";
  ctx.fillText(`Score: ${score}`, calvas.width/2, 3*calvas.height/5);
  iniciado = 0;
  document.getElementById("butao").textContent="Jogar";
}

// Função para mover o escudo baseado na tecla pressionada pelo jogador
function moveEscudo(){
  if('ArrowUp' in teclas) {
    escudo.y = jogador.y - escudo.raio;
    escudo.x = jogador.x;
  }
  else if ('ArrowDown' in teclas) {
    escudo.y = jogador.y + escudo.raio;
    escudo.x = jogador.x;
  }
  else if ('ArrowLeft' in teclas) {
    escudo.y = jogador.y;
    escudo.x = jogador.x - escudo.raio;
  }
  else if ('ArrowRight' in teclas) {
    escudo.y = jogador.y;
    escudo.x = jogador.x + escudo.raio;
  }
}

// O jogo em si
function loopSIMPD() {
  ctx.clearRect(0, 0, calvas.width, calvas.height);
  moveEscudo();
  if (Math.floor(Math.random() * (1000 - score * 7.5)) < 12) { // Geração aleatória de projéteis a cada frame, aumenta as chances conforme score aumenta
    geraProjetil();
  }
  desenhaJogador();
  desenhaEscudo();
  desenhaProjeteis();
  update();
  statusJogador();
  if (vidas <= 0) {
    gameOver();
    return;
  }
  requestAnimationFrame(loopSIMPD);
}

function iniciar() {
  if (iniciado > 0) {
    vidas = 0;
    document.getElementById("butao").textContent="Jogar";
    return;
  }
  iniciado += 1;
  ctx.clearRect(0, 0, calvas.width, calvas.height);
  jogador = {x: calvas.width / 2, y: calvas.height / 2, raio: 10};
  teclas = {}
  escudo = {x: jogador.x, y: jogador.y + raio_escudo, raio: raio_escudo, espessura: escudo.espessura};
  projeteis = [];
  score = 0;
  vidas = 3;
  document.getElementById("butao").textContent = "Parar";
  loopSIMPD();
}

menu();