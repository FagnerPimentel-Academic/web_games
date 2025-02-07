const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 100;
const ctx = canvas.getContext("2d");


const numStars = 200;
let stars = [];

// Initialize stars
for (let i = 0; i < numStars; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = Math.random() * 2;
    const speed = size / 2;
    stars.push({ x: x, y: y, size: size, speed: speed });
}

// Draw stars
function drawStars() {
    for (let i = 0; i < numStars; i++) {
        const star = stars[i];
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.closePath();
    }
}

// Move stars
function moveStars() {
    for (let i = 0; i < numStars; i++) {
        const star = stars[i];
        star.y += star.speed;
        if (star.y > canvas.height) {
            star.y = 0;
        }
    }
}

// Score
let score = 0;

// game over
let playerhit = false;

// Player object
const player = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    radius: 10,
    color: "#a6e3a1"
};

// Array of bullets
let bullets = [];

// Draw player
function drawPlayer() {
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    ctx.fillStyle = player.color;
    ctx.fill();
    ctx.closePath();
}

// Draw bullets
function drawBullets() {
    for (let i = 0; i < bullets.length; i++) {
        ctx.beginPath();
        ctx.arc(bullets[i].x, bullets[i].y, 5, 0, Math.PI * 2);
        ctx.fillStyle = "#ff6347";
        ctx.fill();
        ctx.closePath();
    }
}

// Move bullets
function moveBullets() {
    for (let i = 0; i < bullets.length; i++) {
        const bullet = bullets[i];
        if (bullet.enemycheck) {
            // If the bullet is owned by an enemy, move it towards the player
            if(speed >= 0.0495){
                bullet.x += bullet.dx;
                bullet.y += bullet.dy;
            } else {
                bullet.y += 2 + speed;
            }
        } else {
            bullet.y -= 5;
        }

        // Check if bullet is out of the screen
        if (bullet.x < 0 || bullet.x > canvas.width || bullet.y < 0 || bullet.y > canvas.height) {
            // Remove bullet from bullets array
            bullets.splice(i, 1);
            i--;
        }
    }
}


// Enemy object
const enemy = {
    width: 20,
    height: 20,
    color: "#ff6347",
    speed: 0.5,
    shootInterval: 1000, // in milliseconds
    lastShotTime: 0,
    bulletSpeed: 0.5,
    bulletColor: "#ffffff"
};


// Difficulty Settings
let speed = 0;
let spawnRate = 0;

// Array of enemies
let enemies = [];

// Spawn enemies
function spawnEnemies() {

    // Probability of spawning enemies
    if (Math.random() < (0.002 + spawnRate)) { // adjust this probability to control spawn rate
        const x = Math.random() * (canvas.width - enemy.width);
        enemies.push({ x: x, y: -enemy.height, lastShotTime: 0 });
    }

    // Get all enemies from list, one by one
    for (let i = 0; i < enemies.length; i++) {
        const currentEnemy = enemies[i];

        // Draw enemy
        ctx.fillStyle = enemy.color;
        ctx.fillRect(currentEnemy.x, currentEnemy.y, enemy.width, enemy.height);

        // Move enemy
        currentEnemy.y = currentEnemy.y + enemy.speed + speed;

        // Shoot bullets
        const now = new Date().getTime();
        if (now - currentEnemy.lastShotTime > enemy.shootInterval || currentEnemy.lastShotTime == 0) {
            //enemaudio = new Audio("../sound/laserenem.mp3");
            //enemaudio.play();
            const bulletX = currentEnemy.x + enemy.width / 2;
            const bulletY = currentEnemy.y + enemy.height;
            const bulletAngle = Math.atan2(player.y - bulletY, player.x - bulletX);
            bullets.push({ x: bulletX, y: bulletY, dx: (enemy.bulletSpeed + speed) * Math.cos(bulletAngle), dy: (enemy.bulletSpeed + speed) * Math.sin(bulletAngle), color: enemy.bulletColor, owner: currentEnemy, enemycheck: true, bulletAngle: bulletAngle });
            currentEnemy.lastShotTime = now;
        }

        // Check for collision with bullets
        for (let j = 0; j < bullets.length; j++) {
            const currentBullet = bullets[j];
            if (!(currentBullet.enemycheck) && currentBullet.x > currentEnemy.x && currentBullet.x < currentEnemy.x + enemy.width && currentBullet.y > currentEnemy.y && currentBullet.y < currentEnemy.y + enemy.height) {
                score++;
                bullets.splice(j, 1);
                enemies.splice(i, 1);
                break;
            }
            if (currentBullet.enemycheck && currentBullet.x >= player.x && currentBullet.x < player.x + player.radius && currentBullet.y >= player.y && currentBullet.y < player.y + player.radius) {
                playerhit = true;
                break;
            }
            if (currentEnemy.x >= player.x && currentEnemy.x < player.x + player.radius && currentEnemy.y >= player.y && currentEnemy.y < player.y + player.radius) {
                playerhit = true;
                break;
            }
        }
        // Remove enemy if it goes off-screen
        if (currentEnemy.y > canvas.height + enemy.height) {
            enemies.splice(i, 1);
        }
    }
}

// Refresh Rate Independent Method
var interval = 1000 / 165;
function refresh(animate) {
    setTimeout(() => {
        gameLoop();
    }, interval);

}

// Game loop
firstLoop = true;
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Stars
    drawStars();
    moveStars();

    // Draw player and bullets
    drawPlayer();
    spawnRate += 0.000005;
    speed += 0.000005;
    drawBullets();
    spawnEnemies();
    // Move bullets and handle player movement
    moveBullets();
    movePlayer();

    // Display score
    ctx.font = "bold 20px JetBrains Mono";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText("Score: " + score, canvas.width / 2, 30);

    if (firstLoop) {
        ctx.font = "bold 40px JetBrains Mono";
        ctx.fillStyle = "#a6e3a1";
        ctx.textAlign = "center";
        ctx.fillText("Space Bullets", canvas.width / 2, canvas.height / 2);
    } else {
        if (!(playerhit)) {
            //requestAnimationFrame(gameLoop);
            refresh(gameLoop);
        } else {
            ctx.font = "bold 40px JetBrains Mono";
            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "center";
            ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
        }
    }
}


// Event listener for mouse click or space bar
canvas.addEventListener("click", event => {
    spaceclick();
});
document.addEventListener("keydown", function(event) {
    console.log(event.code);
    if(event.code == "Space"){
        spaceclick();
    }
})
function spaceclick() {
        if (!(playerhit) && !(firstLoop)) {
            playeraudio = new Audio("../sound/laser.mp3")
            bullets.push({ x: player.x, y: player.y - player.radius, owner: player, enemycheck: false });
            playeraudio.play();
        } else {
            enemies = [];
            bullets = [];
            player.x = canvas.width / 2;
            player.y = canvas.height - 50;
            playerhit = false;
            speed = 0;
            spawnRate = 0;
            score = 0;
            firstLoop = false;
            //requestAnimationFrame(gameLoop);
            refresh(gameLoop);
        }
}
// track the position of the mouse
mouseX = 0;
mouseY = 0;
canvas.addEventListener("mousemove", setMousePosition, false);
function setMousePosition(e) {
    mouseX = e.clientX - canvas.offsetLeft;
    mouseY = e.clientY - canvas.offsetTop;
}

// move the player towards the mouse position
function movePlayer() {
    // calculate the distance between the player and the mouse
    var dx = mouseX - player.x;
    var dy = mouseY - player.y;
    var distance = Math.sqrt(dx * dx + dy * dy);

    // move the player towards the mouse if they are not already at the mouse position
    if (distance > player.radius) {
        var movespeed = 5 + speed;
        if (mouseX != 0 && mouseY != 0) {
            player.x += dx / distance * movespeed;
            player.y += dy / distance * movespeed;
        }
    }
}


// Start game loop
gameLoop();
