
const TECLA_DIREITA = 39;
const TECLA_ESQUERDA = 37;
const TECLA_ESPACO = 32;

const LARGURA_JOGO = 800;
const ALTURA_JOGO = 600;

const ESTADO = {
  x_pos : 0,
  y_pos : 0,
  mover_direita: false,
  mover_esquerda: false,
  atirar: false,
  lasers: [],
  lasersInimigos: [],
  inimigos : [],
  largura_nave: 50,
  largura_inimigo: 50,
  cooldown : 0,
  numero_inimigos: 16,
  cooldown_inimigo : 0,
  gameOver: false
}

//Botão iniciar
function começar(){
  document.querySelector(".começar")
    update();
    console.log("começar")
}


// Funções Gerais
function setPosition($element, x, y) {
  $element.style.transform = `translate(${x}px, ${y}px)`;
}

function setSize($elemento, largura) {
  $elemento.style.width = `${largura}px`;
  $elemento.style.height = "auto";
}

function bound(x){
  if (x >= LARGURA_JOGO-ESTADO.largura_nave){
    ESTADO.x_pos = LARGURA_JOGO-ESTADO.largura_nave;
    return LARGURA_JOGO-ESTADO.largura_nave
  } if (x <= 0){
    ESTADO.x_pos = 0;
    return 0
  } else {
    return x;
  }
}

function collideRect(rect1, rect2){
  return!(rect2.left > rect1.right ||
    rect2.right < rect1.left || 
    rect2.top > rect1.bottom || 
    rect2.bottom < rect1.top);
    
}

// Inimigos
function createInimigo($container, x, y){
  const $inimigo = document.createElement("img");
  $inimigo.src = "img/ufo.png";
  $inimigo.className = "enemy";
  $container.appendChild($inimigo);
  const cooldown_inimigo = Math.floor(Math.random()*100);
  const inimigo = {x, y, $enemy: $inimigo, enemy_cooldown: cooldown_inimigo}
  ESTADO.inimigos.push(inimigo);
  setSize($inimigo, ESTADO.largura_inimigo);
  setPosition($inimigo, x, y)
}

function updateInimigos($container){
  const dx = Math.sin(Date.now()/1000)*40;
  const dy = Math.cos(Date.now()/1000)*30;
  const inimigos = ESTADO.inimigos;
  for (let i = 0; i < inimigos.length; i++){
    const inimigo = inimigos[i];
    var a = inimigo.x + dx;
    var b = inimigo.y + dy;
    setPosition(inimigo.$enemy, a, b);
    inimigo.cooldown = Math.random(0,100);
    if (inimigo.enemy_cooldown === 0){
      createLaserInimigo($container, a, b);
      inimigo.enemy_cooldown = Math.floor(Math.random()*50)+100 ;
    }
    inimigo.enemy_cooldown -= 0.5;
  }
}

// Player
function createJogador($container) {
  ESTADO.x_pos = LARGURA_JOGO / 2;
  ESTADO.y_pos = ALTURA_JOGO - 50;
  const $jogador = document.createElement("img");
  $jogador.src = "img/spaceship.png";
  $jogador.className = "player";
  $container.appendChild($jogador);
  setPosition($jogador, ESTADO.x_pos, ESTADO.y_pos);
  setSize($jogador, ESTADO.largura_nave);
}

function updateJogador(){
  if(ESTADO.mover_esquerda){
    ESTADO.x_pos -= 3;
  } if(ESTADO.mover_direita){
    ESTADO.x_pos += 3;
  } if(ESTADO.atirar && ESTADO.cooldown == 0){
    createLaser($container, ESTADO.x_pos - ESTADO.largura_nave/2, ESTADO.y_pos);
    ESTADO.cooldown = 30;
  }
  const $jogador = document.querySelector(".player");
  setPosition($jogador, bound(ESTADO.x_pos), ESTADO.y_pos-10);
  if(ESTADO.cooldown > 0){
    ESTADO.cooldown -= 0.5;
  }
}

// Player Laser
function createLaser($container, x, y){
  const $laser = document.createElement("img");
  $laser.src = "img/laser.png";
  $laser.className = "laser";
  $container.appendChild($laser);
  const laser = {x, y, $laser};
  ESTADO.lasers.push(laser);
  setPosition($laser, x, y);
}

function updateLaser($container){
  const lasers = ESTADO.lasers;
  for(let i = 0; i < lasers.length; i++){
    const laser = lasers[i];
    laser.y -= 2;
    if (laser.y < 0){
      deleteLaser(lasers, laser, laser.$laser);
    }
    setPosition(laser.$laser, laser.x, laser.y);
      const laser_retangulo = laser.$laser.getBoundingClientRect();
    const inimigos = ESTADO.inimigos;
    for(let j = 0; j < inimigos.length; j++){
      const inimigo = inimigos[j];
      const retangulo_inimigo = inimigo.$enemy.getBoundingClientRect();
      if(collideRect(retangulo_inimigo, laser_retangulo)){
        deleteLaser(lasers, laser, laser.$laser);
        const index = inimigos.indexOf(inimigo);
        inimigos.splice(index,1);
        $container.removeChild(inimigo.$enemy);
      }
    }
  }
}

// Laser Inimigo
function createLaserInimigo($container, x, y){
  const $laserInimigo = document.createElement("img");
  $laserInimigo.src = "img/laserInimigo.png";
  $laserInimigo.className = "Laser";
  $container.appendChild($laserInimigo);
  const laser2 = {x, y, $enemyLaser: $laserInimigo};
  ESTADO.lasersInimigos.push(laser2);
  setPosition($laserInimigo, x, y);
}

function updateLaserInimigo($container){
  const lasersInimigos = ESTADO.lasersInimigos;
  for(let i = 0; i < lasersInimigos.length; i++){
    const laserInimigo = lasersInimigos[i];
    laserInimigo.y += 2;
    if (laserInimigo.y > ALTURA_JOGO-30){
      deleteLaser(lasersInimigos, laserInimigo, laserInimigo.$enemyLaser);
    }
    const enemyLaser_rectangle = laserInimigo.$enemyLaser.getBoundingClientRect();
    const spaceship_rectangle = document.querySelector(".player").getBoundingClientRect();
    if(collideRect(spaceship_rectangle, enemyLaser_rectangle)){
      ESTADO.gameOver = true;
    }
    setPosition(laserInimigo.$enemyLaser, laserInimigo.x + ESTADO.largura_inimigo/2, laserInimigo.y+15);
  }
}

// Deletar Laser
function deleteLaser(lasers, laser, $laser){
  const del = lasers.indexOf(laser);
  lasers.splice(del,1);
  $container.removeChild($laser);
}

// Pressionando de Teclas
function KeyPress(event) {
  if (event.keyCode === TECLA_DIREITA) {
    ESTADO.mover_direita = true;
  } else if (event.keyCode === TECLA_ESQUERDA) {
    ESTADO.mover_esquerda = true;
  } else if (event.keyCode === TECLA_ESPACO) {
    ESTADO.atirar = true;
  }
}

function KeyRelease(event) {
  if (event.keyCode === TECLA_DIREITA) {
    ESTADO.mover_direita = false;
  } else if (event.keyCode === TECLA_ESQUERDA) {
    ESTADO.mover_esquerda = false;
  } else if (event.keyCode === TECLA_ESPACO) {
    ESTADO.atirar = false;
  }
}

// Update da função principal
function update(){
  updateJogador();
  updateInimigos($container);
  updateLaser($container);
  updateLaserInimigo($container);

  window.requestAnimationFrame(update);
  
  if (ESTADO.gameOver) {
    document.querySelector(".perdeu").style.display = "block";
  } if (ESTADO.inimigos.length == 0) {
    document.querySelector(".ganhou").style.display = "block";
  }
}

function createInimigos($container) {
  for(var i = 0; i <= ESTADO.numero_inimigos/2; i++){
    createInimigo($container, i*80, 100);
  } for(var i = 0; i <= ESTADO.numero_inimigos/2; i++){
    createInimigo($container, i*80, 180);
  }
}

// Inicia o Jogo
const $container = document.querySelector(".principal");
createJogador($container);
createInimigos($container);

// Teclas Apertadas
window.addEventListener("keydown", KeyPress);
window.addEventListener("keyup", KeyRelease);
