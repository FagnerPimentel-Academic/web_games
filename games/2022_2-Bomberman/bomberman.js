//canvas do jogo
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext('2d');

//imagem usada (Sprite)
const imgSprite = new Image();
imgSprite.src = "sprite-bomberman.png";
const queb = new Image();
queb.src = "sprite-bomberman.png";
const player1_bomber = new Image();
player1_bomber.src = "sprite-bomberman.png";

//parâmetros
const grid = 64; //pixels por quadrado
const numLinhas = 13; //quantidade de linhas na tela (canvas.width/grid)
const numColunas = 15; //quantidade de colunas na tela (canvas.height/grid)
var pontP1 = 0; //pontuação do player1
var pontP2 = 0; //pontuação do player2

//tipos de objetos fixos
const tipos = {
    inquebravel: 1,
    quebravel: 2,
    bomba: 3,
    player: 4,
    explosao: 5
}

//desenhar parede quebrável
const quebCanvas = document.createElement('canvas');
const quebCtx = quebCanvas.getContext('2d');
quebCanvas.width = quebCanvas.height = grid;

//desenhar parede inquebrável
const inqCanvas = document.createElement('canvas');
const inqCtx = inqCanvas.getContext('2d');
inqCanvas.width = inqCanvas.height = grid;

//desenhar bomba
const bmbCanvas = document.createElement('canvas');
const bmbCtx = bmbCanvas.getContext('2d');
bmbCanvas.width = bmbCanvas.height = grid;

//mapeamento da area do jogo
let objetos = [];
let celula = [];
const area = [
    [1, 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1],
    [1, 4 , 4 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 1],
    [1, 4 , 1 ,   , 1 ,   , 1 ,   , 1 ,   , 1 ,   , 1 ,   , 1],
    [1, 4 ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 1],
    [1,   , 1 ,   , 1 ,   , 1 ,   , 1 ,   , 1 ,   , 1 ,   , 1],
    [1,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 1],
    [1,   , 1 ,   , 1 ,   , 1 ,   , 1 ,   , 1 ,   , 1 ,   , 1],
    [1,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 1],
    [1,   , 1 ,   , 1 ,   , 1 ,   , 1 ,   , 1 ,   , 1 ,   , 1],
    [1,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 4 , 1],
    [1,   , 1 ,   , 1 ,   , 1 ,   , 1 ,   , 1 ,   , 1 , 4 , 1],
    [1,   ,   ,   ,   ,   ,   ,   ,   ,   ,   ,   , 4 , 4 , 1],
    [1, 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1]
];

function criarPlayer(img, x, y, corteX, corteY, player) {
    //Varíáveis para saber para onde o boneco está se movendo.
    this.cima = this.baixo = this.esq = this.dir = false;

    //coordenadas de corte da imagem e tamanho do corte
    this.corteX = corteX;
    this.corteY = corteY;
    this.tamcorteX = 19;
    this.tamcorteY = 20;

    //onde o personagem será desenhado no canvas (linha e coluna)
    this.coluna = y;
    this.linha = x;

    //propriedades do player
    this.velocidade = 1;
    this.bombas = 1;

    //contador de animação
    this.contador = 0.1;

    this.desenhar = (ctx) => {
        ctx.drawImage(img, this.corteX, this.corteY, this.tamcorteX, this.tamcorteY, (this.coluna * grid) + 4, (this.linha * grid) + 4, 60, 60);
        this.animar();
    }

    this.animar = () => {
        if(this.cima || this.baixo || this.esq || this.dir) {
            this.contador += 0.05;
            if (this.contador > 3) {
                this.contador = 0.1;
            }
            this.corteX = Math.ceil(this.contador) * 7 + Math.ceil(this.contador) * 14 + 77 * player;
        }
        else {
            if (player === 1) {
                this.corteX = corteX + 21;
            }
            else {
                this.corteX = corteX;
            }
            this.contador = 0.1;
        }
    }

    this.movimentar = () => {
        if (this.dir || this.esq || this.cima || this.baixo) {
            if (this.dir || this.baixo)
            {
                if (this.dir) {
                    this.corteY = 113 + (27 * 3);
                    if (Number.isInteger(this.linha)) {
                        if (!celula[this.linha][Math.ceil(((this.coluna * grid) + this.velocidade) / grid)]) {
                            this.coluna = ((this.coluna * grid) + this.velocidade) / grid;
                        }
                    }
                    else {
                        if (celula[Math.floor(this.linha)][Math.ceil(((this.coluna * grid) + this.velocidade) / grid)]){
                            if ((this.linha * grid) - (Math.floor(this.linha) * grid) >= 45) {
                                if (!celula[Math.ceil(this.linha)][Math.ceil(((this.coluna * grid) + this.velocidade) / grid)]) {
                                    this.coluna = ((this.coluna * grid) + this.velocidade) / grid;
                                }
                            }
                        }
                        else if (!celula[Math.ceil(this.linha)][Math.ceil(((this.coluna * grid) + this.velocidade) / grid)]) {
                            this.coluna = ((this.coluna * grid) + this.velocidade) / grid;
                        }
                    }
                }
                else if (this.baixo) {
                    this.corteY = 113 + (27 * 2);
                    if (Number.isInteger(this.coluna)) {
                        if(!celula[Math.ceil(((this.linha * grid) + this.velocidade) / grid)][this.coluna]) {
                            this.linha = ((this.linha * grid) + this.velocidade) / grid;
                        }
                    }
                    else {
                        if (celula[Math.ceil(((this.linha * grid) + this.velocidade) / grid)][Math.ceil(this.coluna)]){
                            if ((Math.ceil(this.coluna) * grid) - (this.coluna * grid) >= 55) {
                                if(!celula[Math.ceil(((this.linha * grid) + this.velocidade) / grid)][Math.floor(this.coluna)]) {
                                    this.linha = ((this.linha * grid) + this.velocidade) / grid;
                                }
                            }
                        }
                        else if (celula[Math.ceil(((this.linha * grid) + this.velocidade) / grid)][Math.floor(this.coluna)]){
                            if ((this.coluna * grid) - (Math.floor(this.coluna) * grid) >= 55) {
                                if(!celula[Math.ceil(((this.linha * grid) + this.velocidade) / grid)][Math.ceil(this.coluna)]) {
                                    this.linha = ((this.linha * grid) + this.velocidade) / grid;
                                }
                            }
                        }
                        else if (!celula[Math.ceil(((this.linha * grid) + this.velocidade) / grid)][Math.ceil(this.coluna)]) {
                            this.linha = ((this.linha * grid) + this.velocidade) / grid;
                        }
                    }
                }
            }
            else if (this.esq || this.cima) {
                if (this.esq) {
                    this.corteY = 113 + 27;
                    if (Number.isInteger(this.linha)) {
                        if (!celula[this.linha][Math.floor(((this.coluna * grid) - this.velocidade) / grid)]) {
                            this.coluna = ((this.coluna * grid) - this.velocidade) / grid;
                        }
                    }
                    else {
                        if (celula[Math.floor(this.linha)][Math.floor(((this.coluna * grid) - this.velocidade) / grid)]){
                            if ((this.linha * grid) - (Math.floor(this.linha) * grid)>= 45) {
                                if (!celula[Math.ceil(this.linha)][Math.floor(((this.coluna * grid) + this.velocidade) / grid)]) {
                                    this.coluna = ((this.coluna * grid) - this.velocidade) / grid;
                                }
                            }
                        }
                        else if (!celula[Math.ceil(this.linha)][Math.floor(((this.coluna * grid) - this.velocidade) / grid)]) {
                            this.coluna = ((this.coluna * grid) - this.velocidade) / grid;
                        }
                    }
                }
                else if (this.cima) {
                    this.corteY = 113;
                    if (Number.isInteger(this.coluna)) {
                        if(!celula[Math.floor(((this.linha * grid) - this.velocidade) / grid)][this.coluna]) {
                            this.linha = ((this.linha * grid) - this.velocidade) / grid;
                        }
                    }
                    else {
                        if (celula[Math.floor(((this.linha * grid) - this.velocidade) / grid)][Math.ceil(this.coluna)]){
                            console.log((Math.ceil(this.coluna) * grid) - (this.coluna * grid))
                            if ((Math.ceil(this.coluna) * grid) - (this.coluna * grid) >= 55) {
                                if(!celula[Math.floor(((this.linha * grid) - this.velocidade) / grid)][Math.floor(this.coluna)]) {
                                    this.linha = ((this.linha * grid) - this.velocidade) / grid;
                                }
                            }
                        }
                        else if (celula[Math.floor(((this.linha * grid) - this.velocidade) / grid)][Math.floor(this.coluna)]){
                            if ((this.coluna * grid) - (Math.floor(this.coluna) * grid) >= 55) {
                                if(!celula[Math.floor(((this.linha * grid) + this.velocidade) / grid)][Math.ceil(this.coluna)]) {
                                    this.linha = ((this.linha * grid) - this.velocidade) / grid;
                                }
                            }
                        }
                        else if (!celula[Math.floor(((this.linha * grid) - this.velocidade) / grid)][Math.ceil(this.coluna)]) {
                            this.linha = ((this.linha * grid) - this.velocidade) / grid;
                        }
                    }
                }
            }
        }
    }
}

function criarBomba(img, x, y, player) {
    this.dono = player;
    this.coluna = x;
    this.linha = y;

    this.corteX = 140;
    this.corteY = 221;
    this.tamcorteX = 16;
    this.tamcorteY = 16;

    this.tempo = 0;
    this.tipo = tipos.bomba;
    this.vivo = true;
    this.tempoVivo = 450;

    this.desenharBomb = (ctx) => {
        ctx.clearRect(0, 0, bmbCanvas.width, bmbCanvas.height);
        ctx.drawImage(img, this.corteX, this.corteY, this.tamcorteX, this.tamcorteY, 0, 0, 64, 64);
        this.animarBomb();
    }

    this.animarBomb = () => {
        if (this.tempoVivo <= 0) {
            return explodirBomba(this);
        }

        this.tempoVivo--;

        if (this.tempo >= 2) {
            this.tempo = 0;
        }
        this.tempo += 0.025;

        this.corteX = 140 + (24 * Math.floor(this.tempo));
    }
}

function explodirBomba(bomba) {
    if (!bomba.vivo) return;

    //remover a bomba
    bomba.vivo = false;
    celula[Math.ceil(bomba.linha)][Math.ceil(bomba.coluna)] = null;


    //valores das respectivas direções
    const direcoes = [{
        //cima
        linha: -1,
        col: 0
    }, {
        //baixo
        linha: 1,
        col: 0
    }, {
        //esquerda
        linha: 0,
        col: -1
    }, {
        //direita
        linha: 0,
        col: 1
    }];
    direcoes.forEach((dir) => {
        for (let i = 0; i < 3; i++) {
            var row = bomba.linha + (dir.linha * i);
            var col = bomba.coluna + (dir.col * i);
            var cell = celula[row][col];

            //parar a explosão caso a entidade ao lado seja um bloco inquebrável
            if (cell === tipos.inquebravel) {
                return;
            }

            //criar uma nova etapa da explosão (o centro será a primeira)
            let novaExplosao = new explosao(imgSprite, row, col, dir, i);
            objetos.push(novaExplosao);
            celula[row][col] = null;
            novaExplosao.desenharExplosao(ctx);

            if (cell) {
                return;
            }
        }
    });
}

function explosao(img, linha, col, dir, centro) {
    this.linha = linha;
    this.coluna = col;
    this.dir = dir;
    this.vivo = true;
    this.tipo = 5;

    this.horizontal = this.dir.col;
    this.vertical = this.dir.linha;

    if (centro === 0) {
        this.corteX = 69;
        this.corteY = 476;
    }
    else if (centro === 1) {
        if (this.horizontal !== 0) {
            this.corteX = 85;
            this.corteY = 476;
        }
        else if (this.vertical !== 0)
        {
            this.corteX = 69;
            this.corteY = 460;
        }
    }
    else {
        if (this.horizontal > 0) {
            this.corteX = 101;
            this.corteY = 476;
        }
        else if (this.horizontal < 0) {
            this.corteX = 37;
            this.corteY = 476;
        }
        else if (this.vertical > 0) {
            this.corteX = 69;
            this.corteY = 508;
        }
        else if (this.vertical < 0) {
            this.corteX = 69;
            this.corteY = 444;
        }
    }

    //tempo que a explosão ficará na tela
    this.tempoVivo = 200;

    //desenhar a bomba
    this.desenharExplosao = (ctx) => {
        ctx.drawImage(img, this.corteX, this.corteY, 16, 16, this.coluna * grid, this.linha*grid, 64, 64);
        this.animarExplosao();
    }

    //animar a explosão (crescimento e decrescimento)
    this.animarExplosao = () => {
        if (this.tempoVivo <= 0) {
            this.vivo = false;
        }
        else {
            this.tempoVivo--;
            if (centro === 0) {
                if (this.tempoVivo === 175 || this.tempoVivo === 50){
                    this.corteX = 159
                    if (this.tempoVivo === 50)
                        this.corteY = 476;
                }
                else if (this.tempoVivo === 150  || this.tempoVivo === 75) {
                    this.corteX = 66;
                    this.corteY = 588;
                }
                else if (this.tempo === 125 || this.tempo === 100) {
                    this.corteX = 164;
                }
                else if (this.tempoVivo === 25) {
                    this.corteX = 69;
                }
            }
            else if (centro === 1) {
                if (this.horizontal !== 0) {
                    if (this.tempoVivo === 175 || this.tempoVivo === 50) {
                        this.corteX = 175
                        if (this.tempoVivo === 50)
                            this.corteY = 476;
                    } else if (this.tempoVivo === 150 || this.tempoVivo === 75) {
                        this.corteX = 82;
                        this.corteY = 588;
                    } else if (this.tempo === 125 || this.tempo === 100) {
                        this.corteX = 181;
                        this.corteY = 589;
                    } else if (this.tempoVivo === 25) {
                        this.corteX = 85;
                    }
                }
                else if (this.vertical !== 0) {
                    if (this.tempoVivo === 175 || this.tempoVivo === 50) {
                        this.corteX = 159
                        if (this.tempoVivo === 50)
                            this.corteY = 460;
                    } else if (this.tempoVivo === 150 || this.tempoVivo === 75) {
                        this.corteX = 66;
                        this.corteY = 572;
                    } else if (this.tempo === 125 || this.tempo === 100) {
                        this.corteX = 165;
                        this.corteY = 573;
                    } else if (this.tempoVivo === 25) {
                        this.corteX = 69;
                    }
                }
            }
            else if (centro === 2) {
                this.dif = 0;
                if (this.horizontal > 0) this.dif = 1;
                else this.dif = 0;
                if (this.horizontal !== 0) {
                    if (this.tempoVivo === 175 || this.tempoVivo === 50) {
                        this.corteX = 127 + (64 * this.dif);
                        if (this.tempoVivo === 50)
                            this.corteY = 476;
                    } else if (this.tempoVivo === 150 || this.tempoVivo === 75) {
                        this.corteX = 34 + (64 * this.dif);
                        this.corteY = 588;
                    } else if (this.tempo === 125 || this.tempo === 100) {
                        this.corteX = 133 + (64 * this.dif);
                        this.corteY = 589;
                    } else if (this.tempoVivo === 25) {
                        this.corteX = 37 + (64 * this.dif);
                    }
                }
                if (this.vertical > 0) this.dif = 1;
                else this.dif = 0;
                if (this.vertical !== 0) {
                    if (this.tempoVivo === 175 || this.tempoVivo === 50) {
                        this.corteX = 159;
                        if (this.tempoVivo === 50)
                            this.corteY = 444 + (64 * this.dif);
                    } else if (this.tempoVivo === 150 || this.tempoVivo === 75) {
                        this.corteX = 66;
                        this.corteY = 556 + (64 * this.dif);
                    } else if (this.tempo === 125 || this.tempo === 100) {
                        this.corteX = 165;
                        this.corteY = 557 + (64 * this.dif);
                    } else if (this.tempoVivo === 25) {
                        this.corteX = 69;
                    }
                }
            }
        }
    };
}

//Gerar nivel
function gerarNivel() {
    celula = [];

    for (let linha = 0; linha < numLinhas; linha++) {
        celula[linha] = [];

        for (let col = 0; col < numColunas; col++) {

            //85% de chance da célula conter um bloco quebrável
            if (!area[linha][col] && Math.random() < 0.85) {
                celula[linha][col] = tipos.quebravel;
            }
            else if (area[linha][col] === tipos.inquebravel) {
                celula[linha][col] = tipos.inquebravel;
            }
        }
    }
}

var invP1 = false;
var invP2 = false;
var invencibilidadeP1 = 200;
var invencibilidadeP2 = 200;
var player1 = new criarPlayer(imgSprite, 1, 1, 42, 88, 0);
var player2 = new criarPlayer(imgSprite, 11, 13, 98, 88, 1);
function iniciarGame() {
    requestAnimationFrame(iniciarGame);
    ctx.clearRect(0,0,canvas.width,canvas.height);

    //atualizar a área do jogo e preencher com as imagens
    for (let linha = 0; linha < numLinhas; linha++) {
        for (let col = 0; col < numColunas; col++) {
            switch(celula[linha][col]) {
                case tipos.inquebravel:
                    ctx.drawImage(inqCanvas, col * grid, linha * grid);
                    break;
                case tipos.quebravel:
                    ctx.drawImage(quebCanvas, col * grid, linha * grid);
                    break;
                case tipos.bomba:
                    ctx.drawImage(bmbCanvas, col * grid, linha * grid);
                    break;
            }
        }
    }

    player1.movimentar();
    player2.movimentar();


    if (invP1) invencibilidadeP1--;
    if (invP2) invencibilidadeP2--;

    if (invencibilidadeP1 <= 0) invP1 = false;
    if (invencibilidadeP2 <= 0) invP2 = false;

    //caso algum dos players seja atingido pela explosão ele erá considerado morto
    objetos.forEach((objeto) => {
        if (objeto.tipo === tipos.explosao && objeto.vivo === true) {
            if (!invP1) {
                if (Math.round(player1.linha) === objeto.linha && Math.round(player1.coluna) === objeto.coluna) {
                    player1.linha = 1;
                    player1.coluna = 1;
                    pontP2++
                    document.getElementById("placarP2").innerText = String(":" + pontP2);
                    invencibilidadeP1 = 200;
                    invP1 = true;
                }
            }
            if (!invP2) {
                if (Math.round(player2.linha) === objeto.linha && Math.round(player2.coluna) === objeto.coluna) {
                    player2.linha = 11;
                    player2.coluna = 13;
                    pontP1++
                    document.getElementById("placarP1").innerText = String(":" + pontP1);
                    invencibilidadeP2 = 200;
                    invP2 = true;
                }
            }
        }
    });

    player1.desenhar(ctx);
    player2.desenhar(ctx);

    objetos.forEach((objeto) => {
        if (objeto.tipo === tipos.bomba) {
            objeto.desenharBomb(bmbCtx);
        }
        else {
            objeto.desenharExplosao(ctx);
        }
    });

    objetos = objetos.filter((objeto) => objeto.vivo);
}

//controles
document.addEventListener('keydown', function(e) {
    //identificar se o comando foi do player 1 ou do player 2
    if (e.key === "w" || e.key === "a" || e.key === "s" || e.key === "d" || e.code === "Space") {
        //movimentar o player 1 para cima
        if (e.key === "w") {
            player1.cima = true;
            player1.esq = false;
            player1.baixo = false;
            player1.dir = false;
            player1.tamcorteX = 17;
            player1.tamcorteY = 20;
        }
        //movimentar o player 1 para a esquerda
        else if (e.key === "a") {
            player1.cima = false;
            player1.esq = true;
            player1.baixo = false;
            player1.dir = false;
            player1.tamcorteX = 18;
            player1.tamcorteY = 21;
        }
        //movimentar o player 1 para baixo
        else if (e.key === "s") {
            player1.cima = false;
            player1.esq = false;
            player1.baixo = true;
            player1.dir = false;
            player1.tamcorteX = 17;
            player1.tamcorteY = 20;
        }
        //movimentar o player 1 para a direita
        else if (e.key === "d") {
            player1.cima = false;
            player1.esq = false;
            player1.baixo = false;
            player1.dir = true;
            player1.tamcorteX = 18;
            player1.tamcorteY = 21;
        }
        //posicionar bomba
        else if (e.code === "Space" &&
            objetos.filter((objeto) => {
                return objeto.tipo === tipos.bomba && objeto.dono === player1;
            }).length < player1.bombas)
        {
            var bombaPlayer1 = new criarBomba(imgSprite, Math.round(player1.coluna), Math.round(player1.linha), player1)
            celula[Math.round(player1.linha)][Math.round(player1.coluna)] = tipos.bomba;
            bombaPlayer1.desenharBomb(bmbCtx);
            objetos.push(bombaPlayer1);
        }
    }
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "ArrowDown" || e.key === "ArrowRight" || e.code === "Numpad0") {
        if(e.key === "ArrowUp") {
            player2.cima = true;
            player2.esq = false;
            player2.baixo = false;
            player2.dir = false;
            player2.tamcorteX = 17;
            player2.tamcorteY = 20;
        }
        if(e.key === "ArrowLeft") {
            player2.cima = false;
            player2.esq = true;
            player2.baixo = false;
            player2.dir = false;
            player2.tamcorteX = 18;
            player2.tamcorteY = 21;
        }
        if(e.key === "ArrowDown") {
            player2.cima = false;
            player2.esq = false;
            player2.baixo = true;
            player2.dir = false;
            player2.tamcorteX = 17;
            player2.tamcorteY = 20;
        }
        if(e.key === "ArrowRight") {
            player2.cima = false;
            player2.esq = false;
            player2.baixo = false;
            player2.dir = true;
            player2.tamcorteX = 18;
            player2.tamcorteY = 21;
        }
        else if (e.code === "Numpad0" &&
            objetos.filter((objeto) => {
                return objeto.tipo === tipos.bomba && objeto.dono === player2;
            }).length < player2.bombas)
        {
            var bombaPlayer2 = new criarBomba(imgSprite, Math.round(player2.coluna), Math.round(player2.linha), player2)
            celula[Math.round(player2.linha)][Math.round(player2.coluna)] = tipos.bomba;
            bombaPlayer2.desenharBomb(bmbCtx);
            objetos.push(bombaPlayer2);
        }
    }
});

document.addEventListener('keyup', function (e) {
    if (e.key === "w") {
        player1.cima = false;
        player1.tamcorteX = 17;
        player1.tamcorteY = 20;
    }
    else if (e.key === "a") {
        player1.esq = false;
        player1.tamcorteX = 18;
        player1.tamcorteY = 21;
    }
    else if (e.key === "s") {
        player1.baixo = false;
        player1.tamcorteX = 17;
        player1.tamcorteY = 20;
    }
    else if (e.key === "d") {
        player1.dir = false;
        player1.tamcorteX = 18;
        player1.tamcorteY = 21;
    }
    if (e.key === "ArrowUp") {
        player2.cima = false;
        player2.tamcorteX = 17;
        player2.tamcorteY = 20;
    }
    else if (e.key === "ArrowLeft") {
        player2.esq = false;
        player2.tamcorteX = 18;
        player2.tamcorteY = 21;
    }
    else if (e.key === "ArrowDown") {
        player2.baixo = false;
        player2.tamcorteX = 17;
        player2.tamcorteY = 20;
    }
    else if (e.key === "ArrowRight") {
        player2.dir = false;
        player2.tamcorteX = 18;
        player2.tamcorteY = 21;
    }
})

imgSprite.onload = () => {
    quebCtx.drawImage(imgSprite, 78, 222, 16, 16, 0, 0, quebCanvas.width, quebCanvas.height);
    inqCtx.drawImage(imgSprite, 57, 222, 16, 16, 0, 0, inqCanvas.width, inqCanvas.height);

    gerarNivel();
    requestAnimationFrame(iniciarGame);
}



