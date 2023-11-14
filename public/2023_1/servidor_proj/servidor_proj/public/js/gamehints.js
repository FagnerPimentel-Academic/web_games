// Refresh Rate Independent Method
var canvas = ""
var ctx = ""
var interval = 1000 / 165;
speed = 0
spawnRate = 0
function refresh() {
    setTimeout(() => {
        loop();
    }, interval);

}
// Enemy object
const enemy = {
    width: 20,
    x: 65,
    y: 65, 
    height: 20,
    color: "#ff6347",
    speed: 0.5,
    shootInterval: 1000, // in milliseconds
    lastShotTime: 0,
    bulletSpeed: 0.5,
    bulletColor: "#ffffff"
};
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
function moveBullets2() {
    for (let i = 0; i < bullets2.length; i++) {
        const bullet = bullets2[i];
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
            bullets2.splice(i, 1);
            i--;
        }
    }
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
function drawBullets2() {
    for (let i = 0; i < bullets2.length; i++) {
        ctx.beginPath();
        ctx.arc(bullets2[i].x, bullets2[i].y, 5, 0, Math.PI * 2);
        ctx.fillStyle = "#ff6347";
        ctx.fill();
        ctx.closePath();
    }
}
// Player object
const player = {
    x: 70,
    y: 70,
    radius:10,
    color: "#a6e3a1"
};

bullets = []
bullets2 = []

// Draw player
function drawPlayer() {
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    ctx.fillStyle = player.color;
    ctx.fill();
    ctx.closePath();
}

const numStars = 20;
let stars = [];



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

// Initialize stars
function starStart(){
for (let i = 0; i < numStars; i++) {
    canvas = document.getElementById("enemy")
    ctx = canvas.getContext("2d")
    canvas = document.getElementById("player")
    ctx = canvas.getContext("2d") 
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = Math.random() * 2;
    const speed = size / 2;
    stars.push({ x: x, y: y, size: size, speed: speed });
}

}
starStart()
function loop(){
    canvas = document.getElementById("enemy")
    ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStars()
    // Draw enemy
    ctx.fillStyle = enemy.color;
    ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    // Move Enemy
    if(enemy.y - enemy.height >= canvas.height){
        enemy.y = -enemy.height;
    } else {
        enemy.y = enemy.y + 1
    }
    // Shoot bullets
    const now = new Date().getTime();
    if (now - enemy.lastShotTime > enemy.shootInterval || enemy.lastShotTime == 0) {
        const bulletX = enemy.x + enemy.width / 2;
        const bulletY = enemy.y + enemy.height;
        const bulletAngle = Math.atan2(player.y - bulletY, player.x - bulletX);
        bullets.push({ x: bulletX, y: bulletY, dx: (enemy.bulletSpeed + speed) * Math.cos(bulletAngle), dy: (enemy.bulletSpeed + speed) * Math.sin(bulletAngle), color: enemy.bulletColor, owner: enemy, enemycheck: true, bulletAngle: bulletAngle });
        enemy.lastShotTime = now;
    }
    moveBullets()
    drawBullets()
    moveStars()

    canvas = document.getElementById("player")
    ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStars()
    drawPlayer()
    moveStars()
    movePlayer()
    drawBullets2()
    moveBullets2()

    refresh()
}
// Event listener for mouse click or space bar
canvas.addEventListener("click", event => {
    spaceclick();
});
document.addEventListener("keydown", function(event) {
    if(event.code == "Space"){
        spaceclick();
    }
})
function spaceclick() {
        playeraudio = new Audio("./sound/laser.mp3")
        bullets2.push({ x: player.x, y: player.y - player.radius, owner: player, enemycheck: false });
        playeraudio.play();
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


loop()