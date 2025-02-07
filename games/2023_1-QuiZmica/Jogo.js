var canvas = document.getElementById("nossoCanvas");
var ctx = canvas.getContext("2d");
var opcao1 = document.getElementById("opcao1");
var opcao2 = document.getElementById("opcao2");
var opcao3 = document.getElementById("opcao3");
var opcao4 = document.getElementById("opcao4");
var tempoRestante = 90;
var cronometro;
var faseAtual = 1;

function exibirCronometro() {
    var img = new Image();
    img.src = "timer.png";
    img.onload = function() {
        ctx.drawImage(img, 480, 390, 70, 50);
    };
}
function iniciarCronometro() {
    cronometro = setInterval(atualizarCronometro, 1000);
}
function pararCronometro() {
    clearInterval(cronometro);
}
function atualizarCronometro() {
    ctx.clearRect(550, 400, 50, 25);
    tempoRestante--;
    if (tempoRestante >= 0) {
        escrever("black", formatarTempo(tempoRestante), 550, 420);
    } else {
        pararCronometro();
        if (faseAtual === 1) {
            Errou();
        } else if (faseAtual === 2) {
            Errou();
        } else if (faseAtual === 3) {
            Errou();
        } else if (faseAtual === 3) {
            fimJogo();
        }
    }
}
function formatarTempo(segundos) {
    var minutos = Math.floor(segundos / 60);
    var segundosRestantes = segundos % 60;
    return minutos.toString().padStart(2, "0") + ":" + segundosRestantes.toString().padStart(2, "0");
}
function Errou(){
    ctx.lineWidth = 4;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById("opcao1").classList.add("hidden");
    document.getElementById("opcao2").classList.add("hidden");
    document.getElementById("opcao3").classList.add("hidden");
    document.getElementById("opcao4").classList.add("hidden");
    quadrado(20,10,660,480,"#E0FFFF")
    quadrado(550, 400, 50, 25,"#E0FFFF")
    escrever("red","Você Errou!",300,250)
    escrever("red","Atualize a página para recomeçar!",200,280)
    escrever("black", "Tempo Restante:",490,390)
    linha(470,440,670,440,"black")
    linha(470,360,670,360,"black")
    linha(470,360,470,440,"black")
    linha(670,360,670,440,"black")
    pararCronometro();
}
function fimJogo(){
    ctx.lineWidth = 4;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById("opcao1").classList.add("hidden");
    document.getElementById("opcao2").classList.add("hidden");
    document.getElementById("opcao3").classList.add("hidden");
    document.getElementById("opcao4").classList.add("hidden");
    quadrado(20,10,660,480,"#E0FFFF")
    escrever("green","Você terminou o QuíZmica!",232,350)
    escrever("green","Parabéns!",320,380)
    escrever("black", "Tempo Restante:",490,390)
    linha(470,440,670,440,"black")
    linha(470,360,670,360,"black")
    linha(470,360,470,440,"black")
    linha(670,360,670,440,"black")
    pararCronometro();
    var img2 = new Image();
    img2.src = "emoji2.png";
    img2.onload = function () {
        ctx.drawImage(img2, 230, 70, 250, 250);
    };
}
function quadrado(x,y,w,h,cor){
    ctx.fillStyle = cor;
    ctx.fillRect(x,y,w,h);
}
function linha(x1,y1,x2,y2,cor){
    ctx.beginPath();
    ctx.strokeStyle = cor;
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
}
function arco(x,y,r,ang1,ang2,cor,cor2){
    ctx.beginPath();
    ctx.fillStyle = cor;
    ctx.strokeStyle = cor2;
    ctx.arc(x,y,r,ang1,ang2*Math.PI);
    ctx.stroke();
    ctx.fill();
}
function escrever(cor,escrita,x,y){
    ctx.beginPath();
    ctx.font = "20px Comic Sans MS";
    ctx.fillStyle = cor;
    ctx.fillText(escrita,x,y);
}
function primeira_fase(){
    faseAtual = 1;
    ctx.lineWidth = 4;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    exibirCronometro();
    iniciarCronometro();
    atualizarCronometro();
    quadrado(30, 30, 420, 300, '#E0FFFF')
    quadrado(500, 30, 150, 300, '#E0FFFF')
    quadrado(30, 350, 170, 50, '#E0FFFF')
    quadrado(220, 350, 170, 50, '#E0FFFF')
    quadrado(30, 410, 170, 50, '#E0FFFF')
    quadrado(220, 410, 170, 50, '#E0FFFF')
    arco(575, 140, 20, 1, 3, 'blue', 'black')
    arco(575, 250, 20, 1, 3, 'red', 'black')
    escrever('black', 'Hidrogênio', 525, 100)
    escrever('black', 'Oxigênio', 535, 210)
    arco(240, 130, 50, 1, 3, 'red', 'black')
    arco(160, 210, 25, 1, 3, 'blue', 'black')
    arco(320, 210, 25, 1, 3, 'blue', 'black')
    ctx.lineWidth = 6;
    linha(170, 190, 200, 160, 'black')
    linha(310, 190, 280, 160, 'black')
    document.getElementById("opcao1").classList.remove("hidden");
    document.getElementById("opcao2").classList.remove("hidden");
    document.getElementById("opcao3").classList.remove("hidden");
    document.getElementById("opcao4").classList.remove("hidden");
    opcao1.textContent = "H²O";
    opcao2.textContent = "HO²";
    opcao3.textContent = "O²H";
    opcao4.textContent = "HO³";
    opcao1.addEventListener("click", function() {
        segunda_fase();
    });
    opcao2.addEventListener("click", function() {
        Errou(false);
    });
    opcao3.addEventListener("click", function() {
        Errou(false);
    });
    opcao4.addEventListener("click", function() {
        Errou(false);
    });
}
function segunda_fase(){
    faseAtual = 2;
    ctx.lineWidth = 4;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    exibirCronometro();
    iniciarCronometro();
    atualizarCronometro();
    quadrado(30,30,420,300,'#E0FFFF')
    quadrado(500,30,150,350,'#E0FFFF')
    quadrado(30,350,170,50,'#E0FFFF')
    quadrado(220,350,170,50,'#E0FFFF')
    quadrado(30,410,170,50,'#E0FFFF')
    quadrado(220,410,170,50,'#E0FFFF')
    arco(575,120,20,1,3,'blue','black')
    arco(575,220,20,1,3,'red','black')
    arco(575,310,20,1,3,'grey','black')
    escrever('black','Hidrogênio',525,90)
    escrever('black','Oxigênio',535,185)
    escrever('black','Carbono',539,280)
    arco(170,180,30,1,3,'grey','black')
    arco(290,180,30,1,3,'grey','black')
    arco(360,120,30,1,3,'red','black')
    arco(100,120,20,1,3,'blue','black')
    arco(85,180,20,1,3,'blue','black')
    arco(100,240,20,1,3,'blue','black')
    arco(250,250,20,1,3,'blue','black')
    arco(330,250,20,1,3,'blue','black')
    arco(410,190,20,1,3,'blue','black')
    ctx.lineWidth = 6;
    linha(200,180,260,180,'black')
    linha(115,130,150,160,'black')
    linha(115,230,150,200,'black')
    linha(105,180,140,180,'black')
    linha(315,165,340,140,'black')
    linha(265,235,280,210,'black')
    linha(325,230,310,205,'black')
    linha(380,140,400,170,'black')
    document.getElementById("opcao1").classList.remove("hidden");
    document.getElementById("opcao2").classList.remove("hidden");
    document.getElementById("opcao3").classList.remove("hidden");
    document.getElementById("opcao4").classList.remove("hidden");
    opcao1.removeEventListener("click", segunda_fase);
    opcao2.removeEventListener("click", Errou);
    opcao3.removeEventListener("click", Errou);
    opcao4.removeEventListener("click", Errou);
    opcao1.textContent = "H³C²O⁶";
    opcao2.textContent = "C⁴H⁴O⁴";
    opcao3.textContent = "O²H⁴C";
    opcao4.textContent = "H⁶C²O";
    opcao1.addEventListener("click", function() {
        Errou(false);
    });
    opcao2.addEventListener("click", function() {
        Errou(false);
    });
    opcao3.addEventListener("click", function() {
        Errou(false);
    });
    opcao4.addEventListener("click", function() {
        terceira_fase();
    });
}
function terceira_fase(){
    faseAtual = 3;
    ctx.lineWidth = 4;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    exibirCronometro();
    iniciarCronometro();
    atualizarCronometro();
    quadrado(30,30,420,300,'#E0FFFF')
    quadrado(500,30,150,350,'#E0FFFF')
    quadrado(30,350,170,50,'#E0FFFF')
    quadrado(220,350,170,50,'#E0FFFF')
    quadrado(30,410,170,50,'#E0FFFF')
    quadrado(220,410,170,50,'#E0FFFF')
    arco(575,120,20,1,3,'blue','black')
    arco(575,215,20,1,3,'grey','black')
    arco(575,310,20,1,3,'darkgreen','black')
    escrever('black','Hidrogênio',525,90)
    escrever('black','Carbono',539,185)
    escrever('black','Nitrogênio',529,280)
    arco(170,160,30,1,3,'grey','black')
    arco(290,160,30,1,3,'grey','black')
    arco(290,260,30,1,3,'darkgreen','black')
    arco(100,100,20,1,3,'blue','black')
    arco(85,160,20,1,3,'blue','black')
    arco(100,220,20,1,3,'blue','black')
    arco(290,80,20,1,3,'blue','black')
    arco(370,160,20,1,3,'blue','black')
    arco(220,290,20,1,3,'blue','black')
    arco(360,290,20,1,3,'blue','black')
    ctx.lineWidth = 6;
    linha(200,160,260,160,'black')
    linha(105,160,140,160,'black')
    linha(350,160,320,160,'black')
    linha(290,190,290,230,'black')
    linha(290,100,290,130,'black')
    linha(115,110,150,140,'black')
    linha(115,210,150,180,'black')
    linha(235,280,265,275,'black')
    linha(315,275,340,280,'black')
    document.getElementById("opcao1").classList.remove("hidden");
    document.getElementById("opcao2").classList.remove("hidden");
    document.getElementById("opcao3").classList.remove("hidden");
    document.getElementById("opcao4").classList.remove("hidden");
    opcao1.removeEventListener("click", Errou);
    opcao2.removeEventListener("click", Errou);
    opcao3.removeEventListener("click", Errou);
    opcao4.removeEventListener("click", terceira_fase);
    opcao1.textContent = "C³N⁶H²";
    opcao2.textContent = "H⁶C²N";
    opcao3.textContent = "H³CN²";
    opcao4.textContent = "N²H³C⁶";
    opcao1.addEventListener("click", function() {
        Errou(false);
    });
    opcao2.addEventListener("click", function() {
        fimJogo();
    });
    opcao3.addEventListener("click", function() {
        Errou(false);
    });
    opcao4.addEventListener("click", function() {
        Errou(false);
    });
}
opcao1.style.width = "170px";
opcao1.style.height = "50px";
opcao1.style.background = "#E0FFFF";
opcao1.style.fontSize = "30px";

opcao2.style.width = "170px";
opcao2.style.height = "50px";
opcao2.style.background = "#E0FFFF";
opcao2.style.fontSize = "30px";

opcao3.style.width = "170px";
opcao3.style.height = "50px";
opcao3.style.background = "#E0FFFF";
opcao3.style.fontSize = "30px";

opcao4.style.width = "170px";
opcao4.style.height = "50px";
opcao4.style.background = "#E0FFFF";
opcao4.style.fontSize = "30px";
