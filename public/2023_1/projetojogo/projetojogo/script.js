let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
const img = new Image();
img.src = 'img/main.png'
const img2 = new Image();
img2.src = 'img/main2.png'


let borders = {
    desenha: function(){
        const bg = document.getElementById("bg")
        ctx.drawImage(bg,0,0,1000,500)

        const border = document.getElementById("border")
        ctx.drawImage(border,0,500,1000,-80)
        ctx.drawImage(border,0,0,1000,80)
    }
}

let points = 0

let pontos = {
    x: 700,
    y: 50,
    desenha: function (){
        ctx.font = "40px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("Pontos: " + String(points), this.x, this.y);
    }
}

let main = {
    x: 100,
    y: 390,
    image: img,
    check: true,
    desenha: function(){
        ctx.beginPath();
        ctx.drawImage(this.image,this.x,this.y)
    }
}


let start = {
    desenha: function(){
        const menuimg = new Image();
        menuimg.src = 'img/menu.jpg'
        menuimg.onload = function (){
            ctx.drawImage(menuimg, 0, 0);
        }
    }
}

let gameOver = {
    desenha: function(){
        const gameoverimg = new Image();
        gameoverimg.src = 'img/gameover.jpg'
        gameoverimg.onload = function (){
            ctx.drawImage(gameoverimg, 0, 0);
        }
    }
}


class Platform {
    constructor(x,y,h,check,point) {
        this.x = x,
        this.y = y,
        this.altura = h
        this.verify = check
        this.point = point
        }
    desenha(){
        const platformimg = document.getElementById("platform")
        // ctx.fillStyle = "#012064";
        // ctx.fillRect(this.x, this.y, 30, this.altura);
        ctx.drawImage(platformimg, this.x, this.y, 30, this.altura)
    }
}
let platforms = []

let gravity = true

function createPlatform(){
    cb = Math.floor(Math.random() * 2)
    if(cb == 1){
        platforms.push(new Platform(1050, 80, 100, false, false))
    }
    else{
        platforms.push(new Platform(1050, 420, -100, true, false))
    }
    platforms.push()
}


let stage = 1
let interval
function loopPlatform(){
    if(stage == 1){
        interval = 1000
    }
    if(stage == 2){
        interval = 600
    }
    if(stage == 3){
        interval = 400
    }
    if(stage == 4){
        interval = 200
    }
    createPlatform()
    setTimeout(loopPlatform, interval)
}

function changeStage(){
    if(stage <= 4){
        stage += 1
    }
    console.log(stage)
}

setInterval(changeStage, 15000)



loopPlatform()


function changeGravity(){
    platforms.forEach((platform) => {
        platform.x = platform.x - 5
    })
    if(gravity == true){
        main.y = 390
        main.image = img
        main.check = true
    }
    else{
        main.y = 80
        main.image = img2
        main.check = false
    }
    ctx.clearRect(0,0,1000,500);
    borders.desenha()
    pontos.desenha()
    main.desenha()
    platforms.forEach((platform) => {
        platform.desenha()
    })
    animacao = requestAnimationFrame(changeGravity)
    platforms.forEach((platform) => {
        if(platform.x == main.x+30 && main.check == platform.verify){
            gameOver.desenha()
            cancelAnimationFrame(animacao)
        }
    })
    platforms.forEach((platform) => {
        if(platform.x+30 <= main.x+30 && platform.point == false){
            points += 1
            platform.point = true
        }
    })
}

document.addEventListener("keydown", function(evento){
    if(evento.key == " "){
        if(gravity == true){
            gravity = false
        }
        else{
            gravity = true
        }
        console.log("button pressed")
    }
})

function startar(){
    start.desenha()
    document.addEventListener("keydown", function(evento){
        if(evento.key == "Enter"){
            stage = 1
            points = 0
            platforms = []
            gravity = true
            changeGravity()
        }
    })
}

startar()
