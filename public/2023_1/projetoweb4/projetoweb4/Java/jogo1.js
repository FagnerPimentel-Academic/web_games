let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")

// Definição dos personagens:
let tam_jogador = 60;

let jogador = {
    x: 250,
    y: 450,
    alt: tam_jogador,
    larg: tam_jogador,
    cor: 'blue',
    desenha:
        function(){
            ctx.fillStyle = this.cor
            ctx.fillRect(this.x, this.y, this.alt, this.larg)
        }
}


cores = ['black', 'yellow', 'purple', 'red', 'green']

class blocos {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
    }

    desenha() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}

// Funções

function gerar_cor(lista){
    return lista[Math.floor(Math.random() * lista.length)]
}

let x_mouse = 0;
let y_mouse = 0;

function atualizar() {

    let centroX = x_mouse;
    let centroY = y_mouse;

    jogador.x = centroX - tam_jogador / 2
    jogador.y = centroY - tam_jogador / 2

    if (jogador.x > 500) {
        jogador.x = 500
    }
    if (jogador.x < 0) {
        jogador.x = 0
    }
    if (jogador.y > 500) {
        jogador.y = 500
    }
    if (jogador.y < 0) {
        jogador.y = 0
    }

    ctx.fillStyle = "blue";
    ctx.fillRect(jogador.x, jogador.y, tam_jogador, tam_jogador);

    tam_jogador -= 0.01;

    if (tam_jogador <= 15) {
        tam_jogador = 15;
    }

    requestAnimationFrame(atualizar)
}

function desenhaBlocos() {
    let x = Math.floor(Math.random() * (canvas.width - 50));
    let y = Math.floor(Math.random() * (canvas.height - 50));
    let tam = 50
    let cor = gerar_cor(cores)
    let bloco = new blocos(x, y, tam, cor);
    bloco.desenha();
}
//
function quadrado(x, y, cor) {
    ctx.fillStyle = cor;
    ctx.fillRect(x, y, 500, 500);
}

function escrever(x, y, texto, cor){
    ctx.font = '30px Arial'
    ctx.fillStyle = cor
    ctx.fillText(texto, x, y)
}

function aparece() {
    setInterval(desenhaBlocos, 3000);
}

let desistir = document.getElementById('desistir')
let timer = document.getElementById('timer')
let comeca;
let contagem;

function desistencia(){
    clearInterval(contagem)
    quadrado(0,0,'green')
    escrever(65,200, 'Parabéns, você perdeu em: ', 'black')
    escrever(175,250, tempoQuePassou + ' segundos!','black')
    requestAnimationFrame(desistencia)
}


function contagemTimer() {
    const agora = Date.now();
    tempoQuePassou = Math.floor((agora - comeca) / 1000);
    timer.textContent =`Tempo de jogo: ${tempoQuePassou} segundos`;
}

function iniciarTimer() {
    comeca = Date.now();
    contagem = setInterval(contagemTimer, 1000);
}

function pararTimer(){
    clearInterval(contagem)
}

//Eventos
let botao = document.getElementById('iniciar');
let iniciar = false;

botao.addEventListener('click', function (){
        iniciar = true
    }
)

let isMouseMoving = false;
let mouseTimer;

function resetMouseTimer() {
    clearTimeout(mouseTimer);
    mouseTimer = setTimeout(function() {
        if (!isMouseMoving) {
            desistencia();
        }
    }, 3000);
}


setInterval(function() {
    if (isMouseMoving) {
        isMouseMoving = false;}}, 1000)


canvas.addEventListener('mousemove', function (evento){
    if (iniciar) {
        let rect = canvas.getBoundingClientRect()
        x_mouse = evento.clientX - rect.left
        y_mouse = evento.clientY - rect.top
        console.log(x_mouse, y_mouse)
        isMouseMoving = true
        resetMouseTimer()
    }
})


botao.addEventListener('click', iniciarTimer)
desistir.addEventListener('click', pararTimer)


// Montagem do jogo
function main() {
    atualizar()
    aparece()
}