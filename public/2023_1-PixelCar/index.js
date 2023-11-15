let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
// Definiçoes dos carro:D
let FirstCar = {
    x: canvas.height / 3.5,
    y: canvas.width / 2,
    width: 300,
    height: 120,
}

let SecondCar = {
    x: canvas.height / 3.5,
    y: canvas.width / 2,
    width: 300,
    height: 120,
}
// Calling CarImages :D
let FcImage = new Image();
FcImage.src = "./img/PrimeirocArro.png"

let FcImage2 = new Image();
FcImage2.src = "./img/segundocarro.png"
// canvas definition :D
let maxCanvasWidth = 1900;
let objectPosition = FirstCar.x + FirstCar.width/2;
// desenhando os carros no canvas;
function drawObject() {
  ctx.drawImage(FcImage, FirstCar.x - FirstCar.width/2, FirstCar.y - 80 - FirstCar.height,FirstCar.width, FirstCar.height);
}
function drawObject2() {
    ctx.drawImage(FcImage2, SecondCar.x - SecondCar.width/2, SecondCar.y - 220 - SecondCar.height,SecondCar.width, SecondCar.height);
}

// Função draw - Limpa, desenha e expande o canvas em relação a posição do objeto "carro";
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  objectPosition = Math.max(objectPosition, FirstCar.x + FirstCar.width/2, SecondCar.x + SecondCar.width/2);
  canvas.width = Math.min(maxCanvasWidth, objectPosition + 200);
  drawObject();
  drawObject2();
  requestAnimationFrame(draw);
}
// -------------------------------------------
// Var que guardam a posiçao para depois compararmos.
let position = FirstCar.x;
let position2car = SecondCar.x;
let winner = null;
// contador de quem ganhar
firstWinner = 0;
SecondWinner = 0;
// velocidade do carro...
let velocity = 10;

document.addEventListener("keydown", (event) => {
  keyReceive = event.key;
  console.log(keyReceive);

  if (keyReceive == "d" || keyReceive == "D") {
    // guardando sua posição.
    position2car += velocity ;
     // simplesmente mandando o para frete.
    FirstCar.x += velocity;
    if (position2car >= 1750) {
      SecondCar.x = 1750;
    //   quem chegar first em 1750 é o winner.
      if (winner === null) {
        winner = 1;
      }
      showWinner();
    }
  }
  if (keyReceive == "l" || keyReceive == "L") {
    position += velocity;
    SecondCar.x += velocity;
    if (position >= 1750) {
      FirstCar.x = 1750;
      if (winner === null) {
        winner = 2;
      }
      showWinner();
    }
  }
});
// validador do vencedor.
// se o primeiro ganhar ele mostra a imagem
// bloqueia o perdedor
// e bloqueia o canvas
// chama o botao playagain
function showWinner() {
  const show = document.querySelector(".ganhador1");
  const show2 = document.querySelector(".ganhador2");
  const myCanvas = document.getElementById("canvas")
  if (winner === 1) {
    show.style.display = "block";
    show2.style.display = "none";
    myCanvas.style.display = "none";
    console.log(firstWinner += 1)
    PlayAgain()
  }
  if (winner === 2) {
    show2.style.display = "block";
    show.style.display = "none";
    myCanvas.style.display = "none";
    console.log(SecondWinner += 1)
    PlayAgain()
  }
}
// função playagain
function PlayAgain(){
    botao = document.querySelector(".playagain")
    botao.style.display = "flex";
}
// desenha nosso canvas ao clicar no comecar;
const canvasShow = () =>{
    const myCanvas = document.getElementById("canvas")
    const comecar = document.querySelector(".button")
    const back = document.querySelector("#menuback")
    comecar.style.display = "none"
    myCanvas.style.display = "block"
    back.style.display = "none"
    draw()
    
}
const musica = document.querySelector("#music")
musica.volume = "0.1"
