let canvas = document.getElementById("id_canvas2")
let ctx = canvas.getContext("2d")

// variavel dos frames para criar plasmas
let frames = 0;
// variavel usada para congelar elementos da tela
let caiu = 1;
let Gameover = false;
let pontuacao = 0;

// criando personagem
let personagem = {
    spritex: 0,
    spritey: 0,
    x: canvas.width/2.5,
    y: 220,
    largura: 50,
    altura: 48,
    pulo: 4.6,
    velocidade: 1,
    gravidade: 0.1,
    img: new Image(),
    desenhar(){
        this.img.src = "../images/ghost2.png"
        ctx.drawImage(this.img, this.spritex, this.spritey, this.largura, this.altura, this.x, this.y, this.largura, this.altura)
    },
    atualizar() {
        personagem.y = Math.max(0, personagem.y); //limitador de altura
        personagem.y += this.velocidade * caiu
        this.velocidade += this.gravidade
    }
};

// criando chao
let chao = {
    x: 0,
    y: canvas.height - 80,
    largura: 1000,
    altura: 80,
    img: document.getElementById('chao'),
    //movimento do chao
    atualizar(){
        let movimento = 1;
        let repetir = chao.largura/2;
        let mover = chao.x - movimento * caiu;
        chao.x = mover % repetir;
    },
    desenhar() {
        ctx.drawImage(this.img, this.x, this.y,);
        ctx.drawImage(this.img, (this.x + chao.largura), this.y,);
    }
};

// criando mensagem do inicio
let msginicio = {
    x: canvas.width/3.5,
    y: canvas.height/4.5,
    largura: 500,
    altura: 100,
    img: new Image(),
    desenhar() {
        this.img.src = "../images/telainicio.png"
        ctx.drawImage(this.img, this.x, this.y, this.largura, this.altura)
    }
};

// criando mensagem de gameover
let msggameover = {
    x: canvas.width/4,
    y: canvas.height/4,
    largura: 500,
    altura: 250,
    img: new Image(),
    desenhar() {
        this.img.src = "../images/gameover.png"
        ctx.drawImage(this.img, this.x, this.y, this.largura, this.altura)
    }
}

// criando mensagem de reinicio
let msgrestart = {
    x: canvas.width/4,
    y: canvas.height/2,
    largura: 500,
    altura: 250,
    img: new Image(),
    desenhar() {
        this.img.src = "../images/restart.png"
        ctx.drawImage(this.img, this.x, this.y, this.largura, this.altura)
    }
}

// caracteristicas plasma
let plasma = {
    Array: [],
    largura: 30,
    altura: 30,
    x: canvas.width,
}
// imagem plasma
let plasmaImg;
plasmaImg = new Image();
plasmaImg.src = "../images/plasma.png"

// elementos da tela de inicio
function telainicial() {
    let inicio = {
        desenhar() {
            msginicio.desenhar();
            personagem.desenhar(); //desenhar personagem
            chao.desenhar(); //desenhar chao
        }
    }
    inicio.desenhar()
}

// elementos da tela do jogo
function telajogo() {
    let jogo = {

        atualizar() {
            personagem.atualizar()
            chao.atualizar(); //movimento do chao
            const plasma100frames = frames % 250 === 0; // criacao dos plasmas a cada 100 frames
            if(plasma100frames) {
                criarPlasmas()
            }
        },
        desenhar() {
            personagem.desenhar(); //desenhar personagem
            chao.desenhar(); //desenhar chao
        },

    }
    jogo.atualizar()
    jogo.desenhar()
}

//elemtentos da tela de gameover
function telagameover() {
    let gameover = {
        desenhar() {
            msggameover.desenhar()
            msgrestart.desenhar()
            personagem.desenhar(); //desenhar personagem
            chao.desenhar(); //desenhar chao
        }
    }
    gameover.desenhar()
}

// variavel para mudar a tela
let mudartela = {
    opcoes: 0,
}

// criacao randomica do plasma + adicao em um array
function criarPlasmas() {

    let random = Math.floor(Math.random() * 300) + 50;

    let plasmas = {
        img : plasmaImg,
        x : plasma.x,
        y : random,
        width : plasma.largura,
        height : plasma.altura,
    }
    plasma.Array.push(plasmas);
}

// funcao que muda a tela para tela do jogo
document.addEventListener("keydown", space)
function space(evento) {
    if(evento.keyCode === 32){
        mudartela.opcoes = 1;
    }
}

let velocidadeplasmaX = -1.5;
function atualizar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(mudartela.opcoes === 0){
        telainicial()
    }
    if(mudartela.opcoes === 1){
        telajogo()
    }
    // gameover com o toque do personagem com o chao
    if(personagem.y + personagem.altura > chao.y - 9){
        telagameover()
        caiu = 0;
        Gameover = true
    }

    // Pontuacao
    ctx.fillStyle = "white";
    ctx.font="40px Cinzel";
    ctx.fillText(pontuacao, 920, 70);

    // criacao dos multiplos plasmas + movimento dos plasmas + desenho dos plasmas
    for (let i = 0; i < plasma.Array.length; i++) {
        let Plasmas = plasma.Array[i];
        Plasmas.x += velocidadeplasmaX * caiu;
        ctx.drawImage(Plasmas.img, Plasmas.x, Plasmas.y, Plasmas.width, Plasmas.height);

        // verificando caso o personagem passou pelo plasma e pontuando + apagando esse plasma (ja que nao foi possivel delimitar a pontuacao com o personagem passando NO plasma)
        if (personagem.x + personagem.largura >= Plasmas.x + (Plasmas.width)) {
            plasma.Array.shift()
            pontuacao += 1;
        }

    }
    // aumentando frames para contagem deles
    frames = frames + 1
    requestAnimationFrame(atualizar);

}
atualizar()


// movimentacao do personagem
document.addEventListener("keydown", pular);
function pular(evento) {
    if (evento.code === "Space" || evento.code === "ArrowUp"){
        personagem.velocidade = - personagem.pulo
        if(Gameover){
            personagem.x = canvas.width/2.5;
            personagem.y = 220;
            Gameover = false;
            mudartela.opcoes = 0;
            caiu = 1;
            plasma.Array = [];
            pontuacao = 0;
        }
    }
}