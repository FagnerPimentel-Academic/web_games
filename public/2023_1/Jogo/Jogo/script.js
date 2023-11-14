var canvas = document.getElementById('canvas')
var ctt = canvas.getContext('2d')
var w = canvas.width
var h = canvas.height
var diagonal = Math.sqrt(w*w+h*h)
var maxEnemyRay = diagonal / 2 * 0.05 * 2
var enemyTimeout = 750
var score = 0
var time = 0
console.log(w, h)


// characters
var hero = {
    x: w/2,
    y: h/2,
    ray: maxEnemyRay / 2,
    start: 0,
    end: 2 * Math.PI,
    angle: 0,
    corf: 'n', // stroke color
    cord: 'red', // fill color
    draw: function (){
        ctt.beginPath()
        ctt.arc(this.x, this.y, this.ray, this.start, this.end)
        if (this.corf != 'n'){
            ctt.strokeStyle = this.corf
            ctt.stroke()
        }
        if (this.cord != 'n'){
            ctt.fillStyle = this.cord
            ctt.fill()
        }
        }
}
var gun = {
    xs: w/2,
    ys: h/2,
    xe: w/2 + 50,
    ye: h/2,
    cor: 'yellow',
    width: hero.ray / 2,
    draw: function(){
        ctt.beginPath()
        ctt.moveTo(this.xs, this.ys)
        ctt.lineTo(this.xe, this.ye)
        ctt.strokeStyle = this.cor
        ctt.lineWidth = this.width
        ctt.stroke()
        }
    }
var enemies = []
var bullets = []

//functions
function text(font, color, txt, x, y){
    ctt.beginPath()
    ctt.font = font
    ctt.fillStyle = color
    ctt.textAlign = 'center'
    ctt.fillText(txt, x, y)
}
function randomInterval(min, max) {
    return Math.random() * (max - min + 1) + min
  }
function createProjectile(angle){
    var projectile = {
        x: gun.xe,
        y: gun.ye,
        ray: gun.width / 2,
        start: 0,
        end: 2 * Math.PI,
        angle: angle,
        velocity: 8,
        corf: 'n',
        cord: 'gray',
        draw: function (){
            ctt.beginPath()
            ctt.arc(this.x, this.y, this.ray, this.start, this.end)
            if (this.corf != 'n'){
                ctt.strokeStyle = this.corf
                ctt.stroke()
            }
            if (this.cord != 'n'){
                ctt.fillStyle = this.cord
                ctt.fill()
            }
            }
    }
    return projectile
}
function createEnemy(x, y, ray, angle){
    var enemy = {
        x: x,
        y: y,
        ray: ray,
        start: 0,
        end: Math.PI * 2,
        angle: angle,
        velocity: Math.random() * 1.5 + 2,
        corf: 'n',
        cord: 'blue',
        draw: function(){
            ctt.beginPath()
            ctt.arc(this.x, this.y, this.ray, this.start, this.end)
            if (this.corf != 'n'){
                ctt.strokeStyle = this.corf
                ctt.stroke()
            }
            if (this.cord != 'n'){
                ctt.fillStyle = this.cord
                ctt.fill()
            }
        }
    }
    enemies.push(enemy)
}
function aim(){
    let dx = mousex - w/2
    let dy = mousey - h/2
    let d = Math.sqrt(dx*dx + dy*dy)
    let sen = dy / d
    let cos = dx / d
    gun.xe = cos * hero.ray * 1.5+ w/2
    gun.ye = sen * hero.ray * 1.5+ h/2
    var needle = createProjectile(hero.angle)
    needle.draw()
    gun.draw()
}
function shoot(){
    for(let i = 0; i < bullets.length; i++){
        bullets[i].draw()
        bullets[i].x += Math.cos(bullets[i].angle) * bullets[i].velocity
        bullets[i].y += Math.sin(bullets[i].angle) * bullets[i].velocity
       
    }
    bullets = bullets.filter(function(bul){
        return (bul.x > 0 && bul.x < w && bul.y > 0 && bul.y < h)
    })
}
function declareEnemy(){
    let enemyRay = Math.random() * maxEnemyRay + 8
    let enemyAngle = Math.PI * 2 * Math.random()
    let sen = Math.sin(enemyAngle)
    let cos = Math.cos(enemyAngle)
    let enemyX = hero.x + diagonal/2 * cos
    let enemyY = hero.y + diagonal/2 * sen
    createEnemy(enemyX, enemyY, enemyRay, enemyAngle)
    
}
function raid(){
    for(let i = 0;i < enemies.length; i++){
        enemies[i].draw()
        let dx = enemies[i].x - hero.x
        let dy = enemies[i].y - hero.y
        let d = Math.sqrt(dx*dx+dy*dy)
        let cos = dx/d
        let sen = dy/d
        enemies[i].x -= cos * enemies[i].velocity
        enemies[i].y -= sen * enemies[i].velocity
    }
    enemies = enemies.filter(function(ene){
        return (ene.x > 0 - diagonal/2 && ene.x < w + diagonal/2 && ene.y > 0 - diagonal/2 && ene.y < h + diagonal/2)
    })
}
function death(){
    cancelAnimationFrame(id)
    ctt.clearRect(0, 0, w, h)
    enemies = []
    bullets = []
    time = 0
    score = 0
    clearInterval(interval)
    clearInterval(spawnEnemy, 750)
    text('40px cursive', 'red', 'Você morreu', w/2, h/2)
    text('20px cursive', 'red', 'Pressione F5 para reiniciar', w/2, h/2 + 50)
    canvas.style.backgroundColor = 'black'
    
}
function checkColision(){
    for(let k = 0; k < enemies.length; k++){
        let dx = enemies[k].x - hero.x
        let dy = enemies[k].y - hero.y
        let d = Math.sqrt(dx*dx+dy*dy)
        let dMax = enemies[k].ray + hero.ray
        if (d <= dMax){
            let x = enemies.splice(k, 1)
            death()
        }
        for (let c = 0; c < bullets.length; c++){
            let dx = enemies[k].x - bullets[c].x
            let dy = enemies[k].y - bullets[c].y
            let d = Math.sqrt(dx*dx+dy*dy)
            let dMax = enemies[k].ray + bullets[c].ray
            if(d <= dMax){
                score += 1
                let x = enemies.splice(k, 1)
                let x2 = bullets.splice(c, 1)
            }
        }
    }
}
function keepScore(){
    text('20px cursive', 'black', 'Pontuação: ' + score, w/2, 25)
    text('20px cursive', 'black', 'Tempo: ' + time, w/2, h - 10)
}

function update(){
    ctt.clearRect(0, 0, w, h)
    shoot()
    aim()
    hero.draw()
    raid()
    keepScore()
    id = requestAnimationFrame(update)
    checkColision()
}
function Time(){
    time += 1
}ctt.clearRect(0, 0, w, h)
function spawnEnemy(){
    enemyTimeout = Math.random() * 5000 + 1000
    setTimeout(declareEnemy, enemyTimeout)
}
function main(){
    canvas.removeEventListener('mousedown', main)
    interval = setInterval(Time, 1000)
    interval2 = setInterval(spawnEnemy, 750)
    update()
}
//code
canvas.addEventListener('mousedown', main)
document.addEventListener('click', function(eve){
    var b = createProjectile(hero.angle)
    bullets.push(b)
})
let mousex, mousey
document.addEventListener('mousemove', function(eve){
    let r = canvas.getBoundingClientRect()
    mousex = eve.clientX - r.left
    mousey = eve.clientY - r.top
    var angle = Math.atan2(mousey - h/2, mousex - w/2)
    hero.angle = angle
})
text('40px cursive', 'midnightblue', 'Clique para começar', w/2, h/2)
text('20px cursive', 'midnightblue', 'Use o mouse para mirar e clique para atirar', w/2, h/2 + 50)
scrollTo(1000000, 10000000)