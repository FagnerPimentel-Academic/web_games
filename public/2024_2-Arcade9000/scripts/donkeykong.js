const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const vidasDisplay = document.getElementById('vidas');

let mario = {
    x: 50,
    y: 360,
    width: 30,
    height: 40,
    speed: 5,
    dx: 0,
    dy: 0,
    gravity: 0.8,
    jumpPower: -12,
};

let platforms = [
    {x: 0, y: 435, width: 800, height: 15},   // Ground platform

    {x: 100, y: 370, width: 200, height: 15}, // nivel 1
    {x: 680, y: 370, width: 200, height: 15}, // nivel 1
    {x: 400, y: 370, width: 200, height: 15}, // nivel 1

    {x: 140, y: 300, width: 200, height: 15}, // nivel 2
    {x: 0, y: 300, width: 90, height: 15}, // nivel 2
    {x: 450, y: 300, width: 200, height: 15}, // nivel 2
    {x: 715, y: 300, width: 200, height: 15}, // nivel 2

    {x: 100, y: 230, width: 200, height: 15}, // nivel 3
    {x: 400, y: 230, width: 230, height: 15}, // nivel 3
    {x: 700, y: 230, width: 200, height: 15}, // nivel 3

    {x: 150, y: 160, width: 200, height: 15},  // nivel 4
    {x: 0, y: 160, width: 50, height: 15},  // nivel 4
    {x: 440, y: 160, width: 200, height: 15},  // nivel 4

    {x: 375, y: 100, width: 50, height: 15},  // peach
    {x: 710, y: 100, width: 80, height: 25}  // donkey kong

];

let barris = [];

let donkeyKong = {
    x: 700,
    y: 10,
    width: 100,
    height: 100,
};

let peach = {
    x: 375,
    y: 45,
    width: 43.6,
    height: 64.33,
};

let vidas = 3;

const marioImages = {
    right: new Image(),
    left: new Image(),
    walkRight: new Image(),
    walkLeft: new Image(),
    jumpRight: new Image(),
    jumpLeft: new Image(),
};

marioImages.right.src = 'imgs/new_mario_idle_right.png';
marioImages.left.src = 'imgs/new_mario_idle_left.png';
marioImages.walkRight.src = 'imgs/new_mario_walk_right.png';
marioImages.walkLeft.src = 'imgs/new_mario_walk_left.png';
marioImages.jumpRight.src = 'imgs/new_mario_jump_right.png';
marioImages.jumpLeft.src = 'imgs/new_mario_jump_left.png';

let marioState = 'right'; 
let marioDirection = 'right'; 

function drawMario() {
    let image;
    switch (marioState) {
        case 'right':
            image = marioImages.right;
            break;
        case 'left':
            image = marioImages.left;
            break;
        case 'walkRight':
            image = marioImages.walkRight;
            break;
        case 'walkLeft':
            image = marioImages.walkLeft;
            break;
        case 'jumpRight':
            image = marioImages.jumpRight;
            break;
        case 'jumpLeft':
            image = marioImages.jumpLeft;
            break;
    }
    ctx.drawImage(image, mario.x, mario.y, mario.width, mario.height);
}

function drawPlatforms() {
    ctx.fillStyle = '#A52A2A';
    platforms.forEach(platform => {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });
}

const barrilImage = new Image();
barrilImage.src = 'imgs/barrel.jpg'; 
function drawBarris() {
    barris.forEach(barril => {
        ctx.drawImage(barrilImage, barril.x, barril.y, barril.width, barril.height);
    });
}

const donkeyKongImage = new Image();
donkeyKongImage.src = 'imgs/donkey_kong.png'; 

const donkeyKongFrames = [
    { sx: 0, sy: 550, sw: 100, sh: 120 },  
    { sx: 105, sy: 550, sw: 100, sh: 120 }, 
    { sx: 218, sy: 550, sw: 125, sh: 120 }, 
    { sx: 350, sy: 550, sw: 125, sh: 120 },
    { sx: 490, sy: 538, sw: 125, sh: 130 },
    { sx: 625, sy: 538, sw: 125, sh: 130 },
    { sx: 754, sy: 538, sw: 125, sh: 130 },
    { sx: 879, sy: 538, sw: 130, sh: 130 },
    { sx: 1012, sy: 538, sw: 130, sh: 130 },
    { sx: 1150, sy: 538, sw: 130, sh: 130 },
    { sx: 1285, sy: 538, sw: 130, sh: 130 },
    { sx: 1420, sy: 538, sw: 130, sh: 130 },
    { sx: 1560, sy: 538, sw: 130, sh: 130 },
    { sx: 1690, sy: 538, sw: 130, sh: 130 },
    { sx: 1830, sy: 538, sw: 125, sh: 130 },
    { sx: 1950, sy: 538, sw: 125, sh: 130 },
    { sx: 2075, sy: 538, sw: 100, sh: 130 },
    { sx: 105, sy: 550, sw: 100, sh: 120 },
    { sx: 0, sy: 550, sw: 100, sh: 120 },
];

let dkFrameIndex = 0; 
const dkAnimationSpeed = 15; // Velocidade da animação (quanto menor, mais rápido)

function drawDonkeyKong() {
    const currentFrame = donkeyKongFrames[Math.floor(dkFrameIndex / dkAnimationSpeed) % donkeyKongFrames.length];
    
    ctx.drawImage(
        donkeyKongImage, 
        currentFrame.sx, currentFrame.sy, 
        currentFrame.sw, currentFrame.sh, 
        donkeyKong.x, donkeyKong.y,        
        donkeyKong.width, donkeyKong.height 
    );
    dkFrameIndex++;
}

const peachImage = new Image();
peachImage.src = 'imgs/peach.png';

function drawPeach() {
    ctx.drawImage(peachImage, peach.x, peach.y, peach.width, peach.height);
}

function updateBarris() {
    barris.forEach(barril => {
        barril.y += barril.speed;
        if (barril.y > canvas.height) {
            barril.y = -20; 
            barril.x = Math.random() * (canvas.width - barril.width); // posicoes aleatorias
        }
    });
}

// Função para detectar colisão entre o mario e as plataformas (por cima e por baixo)
function checkCollision(mario, platform) {
    // Verifica colisão por cima (quando o mario ta caindo)
    if (mario.x < platform.x + platform.width &&
        mario.x + mario.width > platform.x &&
        mario.y + mario.height <= platform.y &&
        mario.y + mario.height + mario.dy >= platform.y) {
        return 'cima';  
    }

    // Verifica colisão por baixo (quando o mario ta subindo)
    if (mario.x < platform.x + platform.width &&
        mario.x + mario.width > platform.x &&
        mario.y <= platform.y + platform.height &&
        mario.y + mario.height >= platform.y + platform.height &&
        mario.dy < 0) { 
        return 'baixo';  
    }
    
    return null; 
}

function checkBarrilCollision(mario, barrel) {
    return mario.x < barrel.x + barrel.width &&
           mario.x + mario.width > barrel.x &&
           mario.y < barrel.y + barrel.height &&
           mario.y + mario.height > barrel.y;
}

function drawVidas() {
    ctx.font = "15px 'Press Start 2P', cursive";
    ctx.fillStyle = "#000000"; 
    ctx.fillText(`Vidas: ${vidas}`, 20, 30);  
}

function perdeVida() {
    vidas--; 

    if (vidas <= 0) {
        window.location.href = 'gameover.html?game=donkeykong.html'; 
    } else {
        resetMario();
    }
}

function resetMario() {
    mario.x = 50;  
    mario.y = 360;  
    mario.dy = 0;  
    mario.dx = 0; 
}


function spawnBarris(count) {
    for (let i = 0; i < count; i++) {
        barris.push({
            x: Math.random() * (canvas.width - 20),
            y: -Math.random() * 600,
            width: 30,
            height: 40,
            speed: 3 + Math.random() * 2 
        });
    }
}

function moveRight() {
    mario.dx = mario.speed;
    marioDirection = 'right';
    marioState = 'walkRight';
}

function moveLeft() {
    mario.dx = -mario.speed;
    marioDirection = 'left';
    marioState = 'walkLeft';
}

function jump() {
    if (mario.onGround) {
        mario.dy = mario.jumpPower;
        mario.onGround = false;
        marioState = marioDirection === 'right' ? 'jumpRight' : 'jumpLeft';
    }
}

function stopMove() {
    mario.dx = 0;
    marioState = marioDirection === 'right' ? 'right' : 'left';
}

function update() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawMario();
    drawPlatforms();
    drawBarris();
    drawDonkeyKong();
    drawVidas();
    drawPeach();

    mario.x += mario.dx;
    mario.y += mario.dy;
    mario.dy += mario.gravity;

    // Deteccao de colisao com plataformas
    mario.onGround = false;  
    platforms.forEach(platform => {
        const collision = checkCollision(mario, platform);
        
        // Se colidir por cima
        if (collision === 'cima') {
            mario.y = platform.y - mario.height;  
            mario.dy = 0; 
            mario.onGround = true;  
        }

        // Se colidir por baixo (impede que o jogador pule pela plataforma)
        if (collision === 'baixo') {
            mario.y = platform.y + platform.height;  
            mario.dy = 0;  
        }
    });

    updateBarris();

    barris.forEach(barril => {
        if (checkBarrilCollision(mario, barril)) {
            perdeVida();
        }
    });

    if (mario.x < peach.x + peach.width &&
        mario.x + mario.width > peach.x &&
        mario.y < peach.y + peach.height &&
        mario.y + mario.height > peach.y) {
        const victoryMessage = "Parabéns! Você zerou o game";
        const game = "home.html";
        window.location.href = `win.html?message=${victoryMessage}&game=${game}`;
    }

    if (mario.x < 0) mario.x = 0;
    if (mario.x + mario.width > canvas.width) mario.x = canvas.width - mario.width;

    requestAnimationFrame(update);
}

spawnBarris(9);
update();

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') moveRight();
    if (e.key === 'ArrowLeft') moveLeft();
    if (e.key === 'ArrowUp') jump();
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') stopMove();
});

document.addEventListener("keydown", function(e) {
    if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
      e.preventDefault();
    }
  }, false);