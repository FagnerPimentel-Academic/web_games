let canvas = document.getElementById("Canvas"); 
let ctx = canvas.getContext("2d");
let startButton = document.getElementById("startButton");
let retryButton = document.getElementById("retryButton");
let jogoAtivo = false; 
let fimDeJogo = false; 

let faseAtual = 1;

let imgFase1 = new Image();
let imgFase2 = new Image();
let imgFase3 = new Image();

function configurarFase() {
    if (faseAtual === 1) {
        imgFase1.src = "Imagens/Cidade.jpg"; 
        moedas = [
            criarMoeda(400, 200),
        ];
        bolasVerticais = [
            criarBolaVertical(safe_1.x + safe_1.largura + espacoEntreBolas * 2.0, 150, 2),
            criarBolaVertical(safe_1.x + safe_1.largura + espacoEntreBolas * 4.0, 150, -2)
        ];
        bolasHorizontais = [
            criarBolaHorizontal(centroX, 200, 2),
        ];
    } else if (faseAtual === 2) {
        imgFase2.src = "Imagens/Floresta.png"; 
        moedas = [
            criarMoeda(300, 150),
            criarMoeda(500, 250)
        ];
        bolasVerticais = [
            criarBolaVertical(safe_1.x + safe_1.largura + espacoEntreBolas * 0.5, 150, 2),
            criarBolaVertical(safe_1.x + safe_1.largura + espacoEntreBolas * 2.5, 150, -2),
            criarBolaVertical(safe_1.x + safe_1.largura + espacoEntreBolas * 5.5, 150,  2)
        ];
        bolasHorizontais = [
            criarBolaHorizontal(centroX, 85, 2),  
            criarBolaHorizontal(centroX, 200, -2),
            criarBolaHorizontal(centroX, 315, 2),  
        ]; 
    } else if (faseAtual === 3) {
        imgFase3.src = "Imagens/Deserto.jpg"; 
        moedas = [
            criarMoeda(200, 150),
            criarMoeda(333, 250),
            criarMoeda(466, 100),
            criarMoeda(600, 290)
        ];
        bolasVerticais = [
            criarBolaVertical(safe_1.x + safe_1.largura + espacoEntreBolas * 0.5, 150, 2),
            criarBolaVertical(safe_1.x + safe_1.largura + espacoEntreBolas * 1.75, 150, -2),
            criarBolaVertical(safe_1.x + safe_1.largura + espacoEntreBolas * 3.0, 150, 2),
            criarBolaVertical(safe_1.x + safe_1.largura + espacoEntreBolas * 4.25, 150, -2),
            criarBolaVertical(safe_1.x + safe_1.largura + espacoEntreBolas * 5.5, 150, 2)
        ];
        bolasHorizontais = [
            criarBolaHorizontal(centroX, 85, 2),  
            criarBolaHorizontal(centroX, 142.5, -2),
            criarBolaHorizontal(centroX, 200, 2),  
            criarBolaHorizontal(centroX, 257.5, -2),
            criarBolaHorizontal(centroX, 315, 2)
        ];
    }
}

function verificarFimDeJogo() {
    if (
        jogador.x + jogador.largura > safe_2.x &&
        jogador.y + jogador.altura > safe_2.y &&
        jogador.y < safe_2.y + safe_2.altura &&
        todasMoedasColetadas()
    ) {
        if (faseAtual < 3) {  
            faseAtual++;  // Incrementa para a próxima fase
            configurarFase(); 
            jogador.reset();
        } else {
            fimDeJogo = true;
            jogoAtivo = false;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "White";
            ctx.font = "30px Arial";
            ctx.fillText("Parabéns! Você completou todas as fases!", canvas.width / 2 - 270, canvas.height / 2);
            retryButton.style.display = 'block';
        }
    } else if (
        jogador.x + jogador.largura > safe_2.x &&
        jogador.y + jogador.altura > safe_2.y &&
        jogador.y < safe_2.y + safe_2.altura &&
        !todasMoedasColetadas()
    ) {
        ctx.fillStyle = "red";
        ctx.font = "20px Arial";
        ctx.fillText("Colete todas as moedas antes de ir para a Safe Zone!", canvas.width / 2 - 200, canvas.height / 2 + 150);
    }
}

let jogador = {
    x: 50,
    y: 150,
    dx: 0,
    dy: 0,
    largura: 35,
    altura: 35,
    img: new Image(),
    desenha: function() {
        this.img.src = "Imagens/Ninja.png";
        ctx.beginPath();
        ctx.drawImage(this.img, this.x, this.y, this.largura, this.altura);
        ctx.closePath();
    },
    move: function() {
        this.x += this.dx;
        this.y += this.dy;
        
        if (this.x < 0) this.x = 0;
        if (this.x + this.largura > canvas.width) this.x = canvas.width - this.largura;
        
        let minY = safe_1.y;
        let maxY = safe_1.y + safe_1.altura - this.altura;
        if (this.y < minY) this.y = minY;
        if (this.y > maxY) this.y = maxY;
    },
    reset: function() {
        this.x = 50;
        this.y = 150;
        this.dx = 0;
        this.dy = 0;
    }
};

let bordaSuperior = {
    x: 0,
    y: 0,
    largura: canvas.width,
    altura: 50,
    cor_preenchimento: 'black',
    desenha: function() {
        ctx.beginPath();
        ctx.fillStyle = this.cor_preenchimento;
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
        ctx.closePath();
    }
};

let bordaInferior = {
    x: 0,
    y: 350,
    largura: canvas.width,
    altura: 50,
    cor_preenchimento: 'black',
    desenha: function() {
        ctx.beginPath();
        ctx.fillStyle = this.cor_preenchimento;
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
        ctx.closePath();
    }
};

let safe_1 = {
    x: 0,
    y: 50,
    largura: 100,
    altura: 300,
    cor_preenchimento: '#1e1e1e',
    desenha: function() {
        ctx.beginPath();
        ctx.fillStyle = this.cor_preenchimento;
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
        ctx.closePath();
    }
};

let safe_2 = {
    x: 700,
    y: 50,
    largura: 100,
    altura: 300,
    cor_preenchimento: '#1e1e1e',
    desenha: function() {
        ctx.beginPath();
        ctx.fillStyle = this.cor_preenchimento;
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
        ctx.closePath();
    }
};

let bolaImg = new Image();
bolaImg.src = "Imagens/Shuriken.png";
function criarBolaHorizontal(x, y, direction) {
    return {
        x: x,
        y: y,
        raio: 20,
        speed: 2,
        direction: direction,
        desenha: function() {
            ctx.beginPath();
            ctx.drawImage(bolaImg, this.x - this.raio, this.y - this.raio, this.raio * 2, this.raio * 2);
            ctx.closePath();
        },
        move: function() {
            let minX = safe_1.x + safe_1.largura;
            let maxX = safe_2.x - this.raio;
            this.x += this.speed * this.direction;
            if (this.x + this.raio > maxX || this.x - this.raio < minX) {
                this.direction *= -1;
            }
        }
    };
}

function criarBolaVertical(x, y, direction) {
    return {
        x: x,
        y: y,
        raio: 20,
        speed: 2,
        direction: direction,
        desenha: function() {
            ctx.beginPath();
            ctx.drawImage(bolaImg, this.x - this.raio, this.y - this.raio, this.raio * 2, this.raio * 2);
            ctx.closePath();
        },
        move: function() {
            let minY = 30 + this.raio;
            let maxY = 370 - this.raio;
            this.y += this.speed * this.direction;
            if (this.y + this.raio > maxY || this.y - this.raio < minY) {
                this.direction *= -1;
            }
        }
    };
}


let supImg = new Image();
supImg.src = "Imagens/Suprimentos.png";
function criarMoeda(x, y) {
    return {
        x: x,
        y: y,
        raio: 15,
        coletada: false,
        desenha: function() {
            if (!this.coletada) {
                ctx.beginPath();
                ctx.drawImage(supImg, this.x - this.raio, this.y - this.raio, this.raio * 2, this.raio * 2);
                ctx.closePath();
            }
        },
        coletar: function() {
            this.coletada = true;
        }
    };
}

let espacoEntreBolas = (safe_2.x - (safe_1.x + safe_1.largura)) / 6;  
let bolasVerticais = [];
let centroX = (safe_1.x + safe_1.largura + safe_2.x) / 2;
let bolasHorizontais = [];
let moedas = [];

let mortes = {
    valor: 0,
    desenha: function() {
        ctx.fillStyle = "white";  
        ctx.font = "20px Arial";
        ctx.fillText(`Mortes: ${this.valor}`, 10, 30);
    },
    reset: function() {
        this.valor = 0;
    }
};

function checkCollision(bola) {
    let distX = jogador.x + jogador.largura / 2 - bola.x;
    let distY = jogador.y + jogador.altura / 2 - bola.y;
    let distance = Math.sqrt(distX * distX + distY * distY);
    if (distance < bola.raio + jogador.largura / 2) {
        mortes.valor++;
        jogador.reset();
    }
}

function verificarColetaMoedas() {
    moedas.forEach(moeda => {
        if (!moeda.coletada) {
            let distX = jogador.x + jogador.largura / 2 - moeda.x;
            let distY = jogador.y + jogador.altura / 2 - moeda.y;
            let distance = Math.sqrt(distX * distX + distY * distY);
            if (distance < jogador.largura / 2 + moeda.raio) {
                moeda.coletar(); 
            }
        }
    });
}

function todasMoedasColetadas() {
    return moedas.every(moeda => moeda.coletada);
}

function animacao() {
    if (!jogoAtivo || fimDeJogo) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (faseAtual === 1) {
        ctx.drawImage(imgFase1, 0, 0, canvas.width, canvas.height);
    } else if (faseAtual === 2) {
        ctx.drawImage(imgFase2, 0, 0, canvas.width, canvas.height);
    } else if (faseAtual === 3) {
        ctx.drawImage(imgFase3, 0, 0, canvas.width, canvas.height);
    } 

    bordaSuperior.desenha();
    bordaInferior.desenha();
    safe_1.desenha();
    safe_2.desenha();
    jogador.desenha();
    mortes.desenha();
    bolasHorizontais.forEach(bola => {
        bola.desenha();
        bola.move();
        checkCollision(bola);
    });
    bolasVerticais.forEach(bola => {
        bola.desenha();
        bola.move();
        checkCollision(bola);
    });
    moedas.forEach(moeda => moeda.desenha());
    verificarColetaMoedas();
    jogador.move();
    verificarFimDeJogo();
    if (!fimDeJogo) {
        requestAnimationFrame(animacao);
    }
}

document.addEventListener("keydown", function(event) {
    if (jogoAtivo) {
        if (event.key === "ArrowRight") jogador.dx = 2;
        if (event.key === "ArrowLeft") jogador.dx = -2;
        if (event.key === "ArrowDown") jogador.dy = 2;
        if (event.key === "ArrowUp") jogador.dy = -2;
    }
});

document.addEventListener("keyup", function(event) {
    if (jogoAtivo) {
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") jogador.dx = 0;
        if (event.key === "ArrowDown" || event.key === "ArrowUp") jogador.dy = 0;
    }
});

function iniciarJogo() {
    jogador.reset();
    mortes.reset();
    fimDeJogo = false;
    jogoAtivo = true;
    moedas.forEach(moeda => moeda.coletada = false); 
    retryButton.style.display = 'none';
    configurarFase();  
    animacao();
}

startButton.addEventListener("click", iniciarJogo);
retryButton.addEventListener("click", iniciarJogo);