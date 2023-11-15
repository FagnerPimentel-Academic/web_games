var FPS = 30;
var ATRITO = 0.7;
var DISTANCIA = 0.5;
var NAVE_BLINK_DUR = 0.1;
var NAVE_EXPLOZAO = 0.3;
var NAVE_INV_DUR = 3;
var NAVE_TAMANHO = 30;
var ACCELERATION = 5;
var NAVE_SPD = 360;
var CIRCULO_COLISAO = false;
var CENTRO_NAVE = false;
var ASTEROIDS = 0.4;
var ASTEROIDS_NUM = 3;
var ASTEROIDS_TAM = 100;
var ASTEROIDS_SPD = 50;
var ASTEROIDS_VERT = 10;
var LAZER_EXPLOZAO = 0.1;
var LAZER_MAX = 10;
var LAZER_SPD = 500;

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
    
var nave = newNave();

function explozao_nave() {
    nave.tempoExplode = Math.ceil(NAVE_EXPLOZAO * FPS);
}

function Pressionar(ev) {
    switch(ev.keyCode) {
        case 32: // espaço atira
            tiroLaser();
            break;
        case 37: // seta esquerda rotação da nave pra esquerda
            nave.rot = NAVE_SPD / 180 * Math.PI / FPS;
            break;
        case 38: // seta para cima nave segue a direção
            nave.thrusting = true;
            break;
        case 39: // seta direita rotação da nave pra direita
            nave.rot = -NAVE_SPD / 180 * Math.PI / FPS;
            break;
    }
}

function Soltar(ev) {
    switch(ev.keyCode) {
        case 32: // espaço para de atirar
            nave.canShoot = true;
            break;
        case 37: // seta esquerda para rotação pra esquerda
            nave.rot = 0;
            break;
        case 38: // seta para cima para de seguir
            nave.thrusting = false;
            break;
        case 39: // seta direita para rotação pra direita
            nave.rot = 0;
            break;
    }
}

function newNave() {
    return {
        x: canvas.width / 2,
        y: canvas.height / 2,
        a: 90 / 180 * Math.PI,
        r: NAVE_TAMANHO / 2,
        blinkNum: Math.ceil(NAVE_INV_DUR / NAVE_BLINK_DUR),
        blinkTime: Math.ceil(NAVE_BLINK_DUR * FPS),
        canShoot: true,
        tempoExplode: 0,
        lasers: [],
        rot: 0,
        thrusting: false,
        thrust: {
            x: 0,
            y: 0
        }
    }
}

document.addEventListener("keydown", Pressionar);
document.addEventListener("keyup", Soltar);

var asteroids = [];
createAsteroid();

function createAsteroid() {
    asteroids = [];
    var x, y;
    for (var i = 0; i < ASTEROIDS_NUM; i++) {
        // asteroids gerados aleatoriamente
        do {
            x = Math.floor(Math.random() * canvas.width);
            y = Math.floor(Math.random() * canvas.height);
        } while (DistEntrePontos(nave.x, nave.y, x, y) < ASTEROIDS_TAM * 2 + nave.r);
        asteroids.push(newAsteroid(x, y, Math.ceil(ASTEROIDS_TAM / 2)));
    }
}

function destroiAsteroid(R) {
    var x = asteroids[R].x;
    var y = asteroids[R].y;
    var r = asteroids[R].r;

    // divide os ateroids grandes
    if (r == Math.ceil(ASTEROIDS_TAM / 2)) { // grande asteroid
        asteroids.push(newAsteroid(x, y, Math.ceil(ASTEROIDS_TAM / 4)));
        asteroids.push(newAsteroid(x, y, Math.ceil(ASTEROIDS_TAM / 4)));
    } else if (r == Math.ceil(ASTEROIDS_TAM / 4)) { // medio asteroid
        asteroids.push(newAsteroid(x, y, Math.ceil(ASTEROIDS_TAM / 8)));
        asteroids.push(newAsteroid(x, y, Math.ceil(ASTEROIDS_TAM / 8)));
    }

    // destruição do asteroid
    asteroids.splice(R, 1);
}

function DistEntrePontos(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function newAsteroid(x, y, r) {
    var asteroid = {
        x: x,
        y: y,
        xv: Math.random() * ASTEROIDS_SPD / FPS * (Math.random() < 0.5 ? 1 : -1),
        yv: Math.random() * ASTEROIDS_SPD / FPS * (Math.random() < 0.5 ? 1 : -1),
        a: Math.random() * Math.PI * 2,
        r: r,
        offs: [],
        vert: Math.floor(Math.random() * (ASTEROIDS_VERT + 1) + ASTEROIDS_VERT / 2)
    };

    for (var i = 0; i < asteroid.vert; i++) {
        asteroid.offs.push(Math.random() * ASTEROIDS * 2 + 1 - ASTEROIDS);
    }

    return asteroid;
}

setInterval(() => {
    x = Math.floor(Math.random() * canvas.width);
    y = Math.floor(Math.random() * canvas.height);
    asteroids.push(newAsteroid(x, y, Math.ceil(ASTEROIDS_TAM / 2)))
  }, 5000)

setInterval(update, 1000 / FPS);

function tiroLaser() {
    // cria o laser da ponta da nave
    if (nave.canShoot && nave.lasers.length < LAZER_MAX) {
        nave.lasers.push({
            x: nave.x + 4 / 3 * nave.r * Math.cos(nave.a),
            y: nave.y - 4 / 3 * nave.r * Math.sin(nave.a),
            xv: LAZER_SPD * Math.cos(nave.a) / FPS,
            yv: -LAZER_SPD * Math.sin(nave.a) / FPS,
            dist: 0,
            tempoExplode: 0
        });
    }

    // evita muitos disparos
    nave.canShoot = false;
}

function update() {
    var blink = nave.blinkNum % 2 == 0;
    var explosao = nave.tempoExplode > 0;

    // desenha espaço vazio
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // desenha asteroids
    var a, r, x, y, offs, vert;
    for (var i = 0; i < asteroids.length; i++) {
        ctx.strokeStyle = "slategrey";
        ctx.lineWidth = NAVE_TAMANHO / 20;

        // propriedades dos asteroids
        a = asteroids[i].a;
        r = asteroids[i].r;
        x = asteroids[i].x;
        y = asteroids[i].y;
        offs = asteroids[i].offs;
        vert = asteroids[i].vert;
        
        // desenha o caminho
        ctx.beginPath();
        ctx.moveTo(
            x + r * offs[0] * Math.cos(a),
            y + r * offs[0] * Math.sin(a)
        );

        // desenha o polígono
        for (var j = 1; j < vert; j++) {
        ctx.lineTo(
                x + r * offs[j] * Math.cos(a + j * Math.PI * 2 / vert),
                y + r * offs[j] * Math.sin(a + j * Math.PI * 2 / vert)
            );
        }
        ctx.closePath();
        ctx.stroke();

        // circulo de colisão dos asteroids
        if (CIRCULO_COLISAO) {
            ctx.strokeStyle = "lime";
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2, false);
            ctx.stroke();
        }
    }
    
    // movimento da nave
    if (nave.thrusting) {
        nave.thrust.x += ACCELERATION * Math.cos(nave.a) / FPS;
        nave.thrust.y -= ACCELERATION * Math.sin(nave.a) / FPS;

        // desenho da propulsão
        if (!explosao && blink) {
            ctx.fillStyle = "blue";
            ctx.strokeStyle = "cyan";
            ctx.lineWidth = NAVE_TAMANHO / 10;
            ctx.beginPath();
            ctx.moveTo( // lado esquerdo
                nave.x - nave.r * (2 / 3 * Math.cos(nave.a) + 0.5 * Math.sin(nave.a)),
                nave.y + nave.r * (2 / 3 * Math.sin(nave.a) - 0.5 * Math.cos(nave.a))
            );
            ctx.lineTo( // traseira da nave
                nave.x - nave.r * 5 / 3 * Math.cos(nave.a),
                nave.y + nave.r * 5 / 3 * Math.sin(nave.a)
            );
            ctx.lineTo( // lado direito
                nave.x - nave.r * (2 / 3 * Math.cos(nave.a) - 0.5 * Math.sin(nave.a)),
                nave.y + nave.r * (2 / 3 * Math.sin(nave.a) + 0.5 * Math.cos(nave.a))
            );
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }
    } else {
        // aplicação de atrito, parando a nave lentamente
        nave.thrust.x -= ATRITO * nave.thrust.x / FPS;
        nave.thrust.y -= ATRITO * nave.thrust.y / FPS;
    }
    
    // desenho da nave triangular
    if (!explosao) {
        if (blink) {
            ctx.strokeStyle = "blue";
            ctx.lineWidth = NAVE_TAMANHO / 20;
            ctx.beginPath();
            ctx.moveTo( // ponta da nave
                nave.x + 4 / 3 * nave.r * Math.cos(nave.a),
                nave.y - 4 / 3 * nave.r * Math.sin(nave.a)
            );
            ctx.lineTo( // traseira esquerda
                nave.x - nave.r * (2 / 3 * Math.cos(nave.a) + Math.sin(nave.a)),
                nave.y + nave.r * (2 / 3 * Math.sin(nave.a) - Math.cos(nave.a))
            );
            ctx.lineTo( // traseira direita
                nave.x - nave.r * (2 / 3 * Math.cos(nave.a) - Math.sin(nave.a)),
                nave.y + nave.r * (2 / 3 * Math.sin(nave.a) + Math.cos(nave.a))
            );
            ctx.closePath();
            ctx.stroke();
        }

        // tempo do blink
        if (nave.blinkNum > 0) {

            // redução do tempo do blink
            nave.blinkTime--;

            // reduz o numero do blink
            if (nave.blinkTime == 0) {
                nave.blinkTime = Math.ceil(NAVE_BLINK_DUR * FPS);
                nave.blinkNum--;
            }
        }
    } else {
        // desenho da explosão
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(nave.x, nave.y, nave.r * 1.4, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.fillStyle = "orange";
        ctx.beginPath();
        ctx.arc(nave.x, nave.y, nave.r * 1.1, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(nave.x, nave.y, nave.r * 0.8, 0, Math.PI * 2, false);
        ctx.fill();
    }

    // circulo de colisão da nave
    if (CIRCULO_COLISAO) {
        ctx.strokeStyle = "lime";
        ctx.beginPath();
        ctx.arc(nave.x, nave.y, nave.r, 0, Math.PI * 2, false);
        ctx.stroke();
    }
    
    // centro da nave
    if (CENTRO_NAVE) {
        ctx.fillStyle = "red";
        ctx.fillRect(nave.x - 1, nave.y - 1, 2, 2);
    }

    // desenha laser
    for (var i = 0; i < nave.lasers.length; i++) {
        if (nave.lasers[i].tempoExplode == 0) {
            ctx.fillStyle = "green";
            ctx.beginPath();
            ctx.arc(nave.lasers[i].x, nave.lasers[i].y, NAVE_TAMANHO / 15, 0, Math.PI * 2, false);
            ctx.fill();
        } else {
            // desenha explosão
            ctx.fillStyle = "blue";
            ctx.beginPath();
            ctx.arc(nave.lasers[i].x, nave.lasers[i].y, nave.r * 0.75, 0, Math.PI * 2, false);
            ctx.fill();
            ctx.fillStyle = "green";
            ctx.beginPath();
            ctx.arc(nave.lasers[i].x, nave.lasers[i].y, nave.r * 0.5, 0, Math.PI * 2, false);
            ctx.fill();
            ctx.fillStyle = "yellow";
            ctx.beginPath();
            ctx.arc(nave.lasers[i].x, nave.lasers[i].y, nave.r * 0.25, 0, Math.PI * 2, false);
            ctx.fill();
        }
    }

    // detecta laser nos asteroids
    var ax, ay, ar, lx, ly;
    for (var i = asteroids.length - 1; i >= 0; i--) {

        // propriedades dos asteroids
        ax = asteroids[i].x;
        ay = asteroids[i].y;
        ar = asteroids[i].r;

        // loop dos lasers
        for (var j = nave.lasers.length - 1; j >= 0; j--) {

            // propriedades dos lasers
            lx = nave.lasers[j].x;
            ly = nave.lasers[j].y;

            // detecta hits
            if (nave.lasers[j].tempoExplode == 0 && DistEntrePontos(ax, ay, lx, ly) < ar) {

                // destroi asteroids e ativa explosão de laser
                destroiAsteroid(i);
                nave.lasers[j].tempoExplode = Math.ceil(LAZER_EXPLOZAO * FPS);
                break;
            }
        }
    }

    // verifica colisão de asteroids, quando não explodem
    if (!explosao) {

        // verifica apenas quando não blinka
        if (nave.blinkNum == 0) {
            for (var i = 0; i < asteroids.length; i++) {
                if (DistEntrePontos(nave.x, nave.y, asteroids[i].x, asteroids[i].y) < nave.r + asteroids[i].r) {
                    explozao_nave();
                    destroiAsteroid(i);
                    break;
                }
            }
        }

        // gira nave
        nave.a += nave.rot;

        // move nave
        nave.x += nave.thrust.x;
        nave.y += nave.thrust.y;
    } else {
        // reduz tempo de explosão
        nave.tempoExplode--;

        // reset da nave após termino da explosão
        if (nave.tempoExplode == 0) {
            nave = newNave();
        }
    }

    // borda da tela
    if (nave.x < 0 - nave.r) {
        nave.x = canvas.width + nave.r;
    } else if (nave.x > canvas.width + nave.r) {
        nave.x = 0 - nave.r;
    }
    if (nave.y < 0 - nave.r) {
        nave.y = canvas.height + nave.r;
    } else if (nave.y > canvas.height + nave.r) {
        nave.y = 0 - nave.r;
    }

    // movimento do laser
    for (var i = nave.lasers.length - 1; i >= 0; i--) {
        
        // dist percorrida
        if (nave.lasers[i].dist > DISTANCIA * canvas.width) {
            nave.lasers.splice(i, 1);
            continue;
        }

        // segura explosão
        if (nave.lasers[i].tempoExplode > 0) {
            nave.lasers[i].tempoExplode--;

            // laser acaba após certo tempo
            if (nave.lasers[i].tempoExplode == 0) {
                nave.lasers.splice(i, 1);
                continue;
            }
        } else {
            // movimento do laser
            nave.lasers[i].x += nave.lasers[i].xv;
            nave.lasers[i].y += nave.lasers[i].yv;

            // calcula dist percorrida
            nave.lasers[i].dist += Math.sqrt(Math.pow(nave.lasers[i].xv, 2) + Math.pow(nave.lasers[i].yv, 2));
        }

        // lida com borda da tela
        if (nave.lasers[i].x < 0) {
            nave.lasers[i].x = canvas.width;
        } else if (nave.lasers[i].x > canvas.width) {
            nave.lasers[i].x = 0;
        }
        if (nave.lasers[i].y < 0) {
            nave.lasers[i].y = canvas.height;
        } else if (nave.lasers[i].y > canvas.height) {
            nave.lasers[i].y = 0;
        }
    }

    // movimento dos asteroids
    for (var i = 0; i < asteroids.length; i++) {
        asteroids[i].x += asteroids[i].xv;
        asteroids[i].y += asteroids[i].yv;

        // lida com borda da tela
        if (asteroids[i].x < 0 - asteroids[i].r) {
            asteroids[i].x = canvas.width + asteroids[i].r;
        } else if (asteroids[i].x > canvas.width + asteroids[i].r) {
            asteroids[i].x = 0 - asteroids[i].r
        }
        if (asteroids[i].y < 0 - asteroids[i].r) {
            asteroids[i].y = canvas.height + asteroids[i].r;
        } else if (asteroids[i].y > canvas.height + asteroids[i].r) {
            asteroids[i].y = 0 - asteroids[i].r
        }
    }
}