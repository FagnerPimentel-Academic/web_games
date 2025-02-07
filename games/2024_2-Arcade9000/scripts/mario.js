const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 440;
canvas.height = 330;

const scale = 0.75; 
ctx.scale(scale, scale);

let gravity = 1.2;
let scrollOffset = 0; // o quao longe o mapa foi "scrollado"
const mapWidth = 3000;
const marioStartPosition = { x: 100, y: canvas.height - 150 }; 

const marioImage = new Image();
marioImage.src = 'imgs/mario.png';
const marioJumpImage = new Image();
marioJumpImage.src = 'imgs/mario_jump.png';
const marioRunImage = new Image();
marioRunImage.src = 'imgs/mario_run.png'; 
const marioRunBackImage = new Image();
marioRunBackImage.src = 'imgs/mario_run_back.png';
const marioJumpBackImage = new Image();
marioJumpBackImage.src = 'imgs/mario_jump_back.png'; 

let gameFinished = false;

const mario = {
    x: marioStartPosition.x,
    y: marioStartPosition.y,
    width: 50,
    height: 50,
    speedX: 0,
    speedY: 0,
    isJumping: false,
    draw: function() {
        if (this.isJumping) {
            if (this.speedX < 0) {
                ctx.drawImage(marioJumpBackImage, this.x - scrollOffset, this.y, this.width, this.height);
            } else {
                ctx.drawImage(marioJumpImage, this.x - scrollOffset, this.y, this.width, this.height);
            }
        } 
        else if (this.speedX !== 0) {
            if (this.speedX < 0) {
                ctx.drawImage(marioRunBackImage, this.x - scrollOffset, this.y, this.width, this.height);
            } else {
                ctx.drawImage(marioRunImage, this.x - scrollOffset, this.y, this.width, this.height);
            }
        } 
        else {
            ctx.drawImage(marioImage, this.x - scrollOffset, this.y, this.width, this.height);
        }
    },
    update: function() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.y + this.height < canvas.height) {
            this.speedY += gravity;
        } else {
            this.speedY = 0;
            this.isJumping = false;
            this.y = canvas.height - this.height;
        }

        if (this.x < 0) this.x = 0;
        if (this.x + this.width > mapWidth) this.x = mapWidth - this.width;

        if (this.y > canvas.height - 100) {
            this.resetPosition();
        }
    },
    resetPosition: function() {
        this.x = marioStartPosition.x;
        this.y = marioStartPosition.y;
        scrollOffset = 0;
    }
};

const platforms = [
    { x: 100, y: canvas.height - 100, width: 200, height: 20 },
    { x: 350, y: canvas.height - 150, width: 200, height: 20 },
    { x: 650, y: canvas.height - 200, width: 150, height: 20 },
    { x: 900, y: canvas.height - 250, width: 200, height: 20 },
    { x: 1100, y: canvas.height - 150, width: 150, height: 20 },
    { x: 1350, y: canvas.height - 100, width: 150, height: 20 },
    { x: 1600, y: canvas.height - 150, width: 150, height: 20 },
    { x: 1850, y: canvas.height - 200, width: 150, height: 20 },
    { x: 2100, y: canvas.height - 150, width: 150, height: 20 },
    { x: 2280, y: canvas.height - 8 , width: 150, height: 20 },
];

const goombaImage = new Image();
goombaImage.src = 'imgs/goomba.png'; 

const goombas = [
    { x: 400, y: canvas.height - 185, width: 50, height: 50, speed: 2, direction: 1, platform: platforms[1] },
    { x: 950, y: canvas.height - 285, width: 50, height: 50, speed: 2, direction: 1, platform: platforms[3] },
    { x: 1400, y: canvas.height - 135, width: 50, height: 50, speed: 2, direction: 1, platform: platforms[5] }
];

function drawGoombas() {
    goombas.forEach(goomba => {
        ctx.drawImage(goombaImage, goomba.x - scrollOffset, goomba.y, goomba.width, goomba.height);
    });
}

function updateGoombas() {
    goombas.forEach(goomba => {
        goomba.x += goomba.speed * goomba.direction;

        // Inverter a direção ao atingir as bordas da plataforma
        if (goomba.x < goomba.platform.x || goomba.x + goomba.width > goomba.platform.x + goomba.platform.width) {
            goomba.direction *= -1;
        }
    });
}

function detectPlatformCollision() {
    platforms.forEach(platform => {
        if (mario.x + mario.width > platform.x &&
            mario.x < platform.x + platform.width &&
            mario.y + mario.height > platform.y &&
            mario.y + mario.height < platform.y + platform.height) {
            mario.speedY = 0;
            mario.isJumping = false;
            mario.y = platform.y - mario.height;
        }
    });
}

function detectGoombaCollision() {
    goombas.forEach(goomba => {
        if (mario.x + mario.width > goomba.x &&
            mario.x < goomba.x + goomba.width &&
            mario.y + mario.height > goomba.y &&
            mario.y < goomba.y + goomba.height) {
            mario.resetPosition(); 
        }
    });
}

const pipeImage = new Image();
pipeImage.src = 'imgs/pipe.png'; 

const pipe = {
    x: 2300, 
    y: canvas.height - 150,
    width: 100,
    height: 150,
    draw: function() {
        if (pipeImage.complete) {
            ctx.drawImage(pipeImage, this.x - scrollOffset, this.y, this.width, this.height);
        } else {
            pipeImage.onload = () => {
                ctx.drawImage(pipeImage, this.x - scrollOffset, this.y, this.width, this.height);
            };
        }
    }
};

function endGame() {
    const victoryMessage = "Preparado para o próximo desafio? Chegue na Peach e derrote o Donkey Kong!";
    const game = "donkeykong.html";
    window.location.href = `win.html?message=${victoryMessage}&game=${game}`;
}

function detectPlatformCollision() {
    platforms.forEach(platform => {
        if (mario.x + mario.width > platform.x &&
            mario.x < platform.x + platform.width &&
            mario.y + mario.height > platform.y &&
            mario.y + mario.height < platform.y + platform.height) {
            mario.speedY = 0;
            mario.isJumping = false;
            mario.y = platform.y - mario.height; 
        }
    });

    if (mario.x + mario.width > pipe.x &&
        mario.x < pipe.x + pipe.width &&
        mario.y + mario.height > pipe.y &&
        mario.y + mario.height < pipe.y + pipe.height) {
        mario.speedY = 0; 
        mario.isJumping = false; 
        mario.y = pipe.y - mario.height; 
    }
}

const brickTexture = new Image();
brickTexture.src = 'imgs/brick_block.png'; 
const brickWidth = 50;
const brickHeight = 50;
const overlap = 8; 

function drawPlatforms() {
    platforms.forEach(platform => {
        const numBricksX = Math.ceil(platform.width / brickWidth);
        const numBricksY = Math.ceil(platform.height / brickHeight);

        for (let i = 0; i < numBricksX; i++) {
            for (let j = 0; j < numBricksY; j++) {
                const brickX = platform.x - scrollOffset + i * (brickWidth - overlap);
                const brickY = platform.y + j * (brickHeight - overlap);
                ctx.drawImage(brickTexture, brickX, brickY, brickWidth, brickHeight);
            }
        }
    });
}

function drawPipe() {
    pipe.draw();
}

function gameLoop() {
    if (!gameFinished) {
        ctx.clearRect(0, 0, canvas.width / scale, canvas.height / scale);

        mario.update();
        mario.draw();
        drawPlatforms(); 
        drawGoombas();
        updateGoombas();
        detectPlatformCollision();
        detectGoombaCollision();
        drawPipe(); 
        
        // Scroll do cenário (centralizando o Mario)
        if (mario.x > canvas.width / 2 / scale && mario.x < mapWidth - canvas.width / 2 / scale) {
            scrollOffset = mario.x - (canvas.width / 2 / scale);
        }

        requestAnimationFrame(gameLoop);
    }
}

gameLoop();

document.addEventListener("keydown", function(e) {
    if (["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
      e.preventDefault();
    }
}, false);

window.addEventListener('keydown', function(e) {
    if (e.code === 'ArrowRight') {
        mario.speedX = 5;
    } else if (e.code === 'ArrowLeft') {
        mario.speedX = -5;
    } else if (e.code === 'ArrowUp' && !mario.isJumping) {
        mario.speedY = -20;
        mario.isJumping = true;
    } else if (e.code === 'ArrowDown') {
        if (mario.x + mario.width > pipe.x &&
            mario.x < pipe.x + pipe.width)
             {
            endGame();
        }
    }
});

window.addEventListener('keyup', function(e) {
    if (e.code === 'ArrowRight' || e.code === 'ArrowLeft') {
        mario.speedX = 0;
    }
});