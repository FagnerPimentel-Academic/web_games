const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const collisionsMap = []
for (let i = 0; i < collisions.length; i += 150) {
    collisionsMap.push(collisions.slice(i,150+i))
}

class Boundary {
    static width = 64
    static height = 64
    constructor({ position }) {
        this.position = position
        this.width = 64
        this.height = 30
    }

    draw() {
        c.fillStyle = 'rgba(255,0,0,0'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const boundaries = []
const offset = {
    x: -6670,
    y: -3950    
}

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 2178)
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                }
            })
        )
    })
})

class Boundary2 {
    static width = 64
    static height = 64
    constructor({ position }) {
        this.position = position
        this.width = 64
        this.height = 30
    }

    draw() {
        c.fillStyle = 'rgba(255,255,0,0'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const colisaoAlavanca = []
for (let i = 0; i < alavanca1.length; i += 150) {
    colisaoAlavanca.push(alavanca1.slice(i,150+i))
}

const boundaries2 = []
const offset2 = {
    x: -6670,
    y: -3950
}

colisaoAlavanca.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 200)
            boundaries2.push(
                new Boundary2({
                    position: {
                        x: j * Boundary2.width + offset2.x,
                        y: i * Boundary2.height + offset2.y
                    }
                })
            )
    })
})

class Boundary3 {
    static width = 64
    static height = 64
    constructor({ position }) {
        this.position = position
        this.width = 64
        this.height = 30
    }

    draw() {
        c.fillStyle = 'rgba(255,0,255,0'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const colisaoBlock = []
for (let i = 0; i < block1.length; i += 150) {
    colisaoBlock.push(block1.slice(i,150+i))
}

const boundaries3 = []
const offset3 = {
    x: -6670,
    y: -3950
}

colisaoBlock.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 2178)
            boundaries3.push(
                new Boundary3({
                    position: {
                        x: j * Boundary3.width + offset3.x,
                        y: i * Boundary3.height + offset3.y
                    }
                })
            )
    })
})

class Boundary4 {
    static width = 64
    static height = 64
    constructor({ position }) {
        this.position = position
        this.width = 64
        this.height = 30
    }

    draw() {
        c.fillStyle = 'rgba(100,150,100,0'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const colisaoAlavanca2 = []
for (let i = 0; i < alavanca2.length; i += 150) {
    colisaoAlavanca2.push(alavanca2.slice(i,150+i))
}

const boundaries4 = []
const offset4 = {
    x: -6670,
    y: -3950
}

colisaoAlavanca2.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 2178)
            boundaries4.push(
                new Boundary4({
                    position: {
                        x: j * Boundary4.width + offset4.x,
                        y: i * Boundary4.height + offset4.y
                    }
                })
            )
    })
})

class Boundary5 {
    static width = 64
    static height = 64
    constructor({ position }) {
        this.position = position
        this.width = 64
        this.height = 30
    }
    draw() {
        c.fillStyle = 'rgba(255,200,150,0'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const colisaoBlock2 = []
for (let i = 0; i < block2.length; i += 150) {
    colisaoBlock2.push(block2.slice(i,150+i))
}

const boundaries5 = []
const offset5 = {
    x: -6670,
    y: -3950
}

colisaoBlock2.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 2178)
            boundaries5.push(
                new Boundary5({
                    position: {
                        x: j * Boundary5.width + offset5.x,
                        y: i * Boundary5.height + offset5.y
                    }
                })
            )
    })
})

class Boundary7 {
    static width = 64
    static height = 64
    constructor({ position }) {
        this.position = position
        this.width = 64
        this.height = 30
    }
    draw() {
        c.fillStyle = 'rgba(255,200,150,0'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const bauvitoria = []
for (let i = 0; i < bau.length; i += 150) {
    bauvitoria.push(bau.slice(i,150+i))
}

const boundaries7 = []
const offset7 = {
    x: -6670,
    y: -3950
}

bauvitoria.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 2178)
            boundaries7.push(
                new Boundary7({
                    position: {
                        x: j * Boundary7.width + offset7.x,
                        y: i * Boundary7.height + offset7.y
                    }
                })
            )
    })
})

c.fillStyle = 'white'
c.fillRect(0,0,canvas.width,canvas.height)

const image = new Image()
image.src = './img/map-new-alavanca.png'

const imagerampa1 = new Image()
imagerampa1.src = './img/map-new-alavanca2.png'

const imagerampa2 = new Image()
imagerampa2.src = './img/map-new-alavanca3.png'

const nivel_dificuldade = new Image()
function selecionanivel() {
    if (document.getElementById("nivel").value === "nivel1") {
        console.log("Nivel 1")
        nivel_dificuldade.src = './img/sombra1.png'
    } else if (document.getElementById("nivel").value === "nivel2") {
        console.log("Nivel 2")
        nivel_dificuldade.src = './img/sombra2.png'
    } else if (document.getElementById("nivel").value === "nivel3") {
        console.log("Nivel 3")
        nivel_dificuldade.src = './img/sombra3.png'
    }
}

const playerDownImage = new Image()
playerDownImage.src = './img/persDown.png'

const playerUpImage = new Image()
playerUpImage.src = './img/persUp.png'

const playerLeftImage = new Image()
playerLeftImage.src = './img/persLeft.png'

const playerRightImage = new Image()
playerRightImage.src = './img/persRight.png'

class Sprite {
    constructor({ position, velocity, image, frames = {max: 1}, sprites}) {
        this.position = position
        this.image = image
        this.frames = {...frames, val: 0, elapsed: 0}

        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
        }
        this.moving = false
        this.sprites = sprites
    }
    draw() {
        c.drawImage(
            this.image,
            this.frames.val * this.width,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
        )
        
        if (!this.moving) return

        if (this.frames.max > 1) {
            this.frames.elapsed++
        }

        if (this.frames.elapsed % 10 === 0){
        if(this.frames.val < this.frames.max - 1) this.frames.val++
        else this.frames.val = 0
        }
    }
}

const player = new Sprite({
    position: {
        x: canvas.width/2 - (192 / 4) / 2 ,
        y: canvas.height / 2 - 68 / 2
    },
     image: playerDownImage,
    frames: {
        max: 4
    },
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        right: playerRightImage,
        down: playerDownImage
    }
})

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
})

const foreground = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    image: nivel_dificuldade
    
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}


const movables = [background, ...boundaries, ...boundaries2, ...boundaries3, ...boundaries4, ...boundaries5, ...boundaries7]

function rectangularCollision ({retangulo1, retangulo2}) {
    return(retangulo1.position.x + retangulo1.width >= retangulo2.position.x &&
        retangulo1.position.x <= retangulo2.position.x + retangulo2.width &&
        retangulo1.position.y <= retangulo2.position.y + retangulo2.height &&
        retangulo1.position.y + retangulo1.height >= retangulo2.position.y)
}

let objetoAmarelo = false;
let objetoAzul = false;
let podeandar = false;
let podeandar2 = false;

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case ' ':
            if (objetoAmarelo) {
                background.image = imagerampa1;
                podeandar = true;
            } else if (objetoAzul) {
                background.image = imagerampa2;
                podeandar2 = true;
            }
            break;
    }
});


function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
    boundaries.forEach(boundary => {
        boundary.draw()
    })
    boundaries2.forEach(boundary => {
        boundary.draw();
    });
    boundaries3.forEach(boundary => {
        boundary.draw();
    });
    boundaries4.forEach(boundary => {
        boundary.draw();
    })
    boundaries5.forEach(boundary => {
        boundary.draw();
    })
    boundaries7.forEach(boundary => {
        boundary.draw();
    })
    player.draw()
    foreground.draw()
    selecionanivel()

    let moving = true

    for (let i = 0; i < boundaries2.length; i++) {
        const boundary = boundaries2[i];
        if (rectangularCollision({ retangulo1: player, retangulo2: boundary })) {
            objetoAmarelo = true;
            break;
        } else {
            objetoAmarelo = false;
        }
    }

    for (let i = 0; i < boundaries4.length; i++) {
        const boundary = boundaries4[i];
        if (rectangularCollision({ retangulo1: player, retangulo2: boundary })) {
            objetoAzul = true;
            break;
        } else {
            objetoAzul = false;
        }
    }

    for (let i = 0; i < boundaries7.length; i++) {
        const boundary = boundaries7[i];
        if (rectangularCollision({ retangulo1: player, retangulo2: boundary })) {
            terminar_fase();
            break;
        }
    }

    let playerReachedChest = false;
    
    for (let i = 0; i < boundaries7.length; i++) {
        const boundary = boundaries7[i];
        if (rectangularCollision({ retangulo1: player, retangulo2: boundary })) {
            terminar_fase();
            playerReachedChest = true; 
            break;
        }
    }
    
    if (!playerReachedChest) {
        if (keys.w.pressed){
            player.moving = true
            for (let i = 0; i < boundaries3.length; i++) {
                const boundary = boundaries3[i];
                const boundary2 = boundaries5[i];
                if (rectangularCollision({ retangulo1: player, retangulo2: {...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y + 10
                        }
                    } })) {
                    keys.w.pressed = podeandar;
                }
                else if (rectangularCollision({ retangulo1: player, retangulo2: {...boundary2,
                        position: {
                            x: boundary2.position.x,
                            y: boundary2.position.y + 10
                        }
                    } })) {
                    keys.w.pressed = podeandar2;
                }
            }
        }
        else if (keys.a.pressed){
            player.moving = true
            for (let i = 0; i < boundaries3.length; i++) {
                const boundary = boundaries3[i];
                const boundary2 = boundaries5[i];
                if (rectangularCollision({ retangulo1: player, retangulo2: {...boundary,
                        position: {
                            x: boundary.position.x + 10,
                            y: boundary.position.y
                        }
                    }
                })) {
                    keys.a.pressed = podeandar;
                }
                else if (rectangularCollision({ retangulo1: player, retangulo2: {...boundary2,
                        position: {
                            x: boundary2.position.x + 10,
                            y: boundary2.position.y
                        }
                    } })) {
                    keys.a.pressed = podeandar2;
                }
            }
        }
        else if (keys.d.pressed){
            player.moving = true
            for (let i = 0; i < boundaries3.length; i++) {
                const boundary = boundaries3[i];
                const boundary2 = boundaries5[i];
                if (rectangularCollision({ retangulo1: player, retangulo2: {...boundary,
                        position: {
                            x: boundary.position.x - 10,
                            y: boundary.position.y
                        }
                    }
                })) {
                    keys.d.pressed = podeandar;
                }
                else if (rectangularCollision({ retangulo1: player, retangulo2: {...boundary2,
                        position: {
                            x: boundary2.position.x - 10,
                            y: boundary2.position.y
                        }
                    } })) {
                    keys.d.pressed = podeandar2;
                }
            }
        }
    }

    player.moving = false
    if (!playerReachedChest) {
        if (keys.w.pressed && lastKey === 'w') {
            player.moving = true
            player.image = player.sprites.up
            for (let i = 0; i < boundaries.length; i++){
                const boundary = boundaries[i]
                if (rectangularCollision({
                    retangulo1: player,
                    retangulo2: {...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y + 10
                        }
                    }
                })
                ) {
                    moving = false
                    break
                }
            }
            if (moving)
                movables.forEach(movable => {
                    movable.position.y += 10
                })
        }
        else if (keys.a.pressed && lastKey === 'a') {
            player.moving = true
            player.image = player.sprites.left
            for (let i = 0; i < boundaries.length; i++){
                const boundary = boundaries[i]
                if (rectangularCollision({
                    retangulo1: player,
                    retangulo2: {...boundary,
                        position: {
                            x: boundary.position.x + 10,
                            y: boundary.position.y
                        }
                    }
                })
                ) {
                    moving = false
                    break
                }
            }
            if (moving)
                movables.forEach(movable => {
                    movable.position.x += 10
            })}
        else if (keys.s.pressed && lastKey === 's') {
            player.moving = true
            player.image = player.sprites.down
            for (let i = 0; i < boundaries.length; i++){
                const boundary = boundaries[i]
                if (rectangularCollision({
                    retangulo1: player,
                    retangulo2: {...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y - 10
                        }
                    }
                })
                ) {
                    moving = false
                    break
                }
            }
            if (moving)
            movables.forEach(movable => {
                movable.position.y -= 10
            })}
        else if (keys.d.pressed && lastKey === 'd') {
            player.moving = true
            player.image = player.sprites.right
            for (let i = 0; i < boundaries.length; i++){
                const boundary = boundaries[i]
                if (rectangularCollision({
                    retangulo1: player,
                    retangulo2: {...boundary,
                        position: {
                            x: boundary.position.x - 10,
                            y: boundary.position.y
                        }
                    }
                })
                ) {
                    moving = false
                    break
                }
            }
            if (moving)
            movables.forEach(movable => {
                movable.position.x -= 10
            })}}
}
animate()

let lastKey = ''
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break
        case 'W':
            keys.w.pressed = true
            lastKey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 'A':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break
        case 'S':
            keys.s.pressed = true
            lastKey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break
        case 'D':
            keys.d.pressed = true
            lastKey = 'd'
            break
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'W':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
        case 'A':
            keys.a.pressed = false
            break
        case 'S':
            keys.s.pressed = false
            break
        case 'D':
            keys.d.pressed = false
            break
    }
})