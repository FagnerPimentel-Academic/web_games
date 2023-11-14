function jogo() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    const boneco = new Image();
    boneco.src = "img/pato.png";
    const cano_cima = new Image();
    cano_cima.src = "img/cano_cima.png";
    const cano_baixo = new Image();
    cano_baixo.src = "img/cano_baixo.png";
    var bonecoX = 10;
    var interval = 20;
    var bonecoY = 270;
    var bonecoDY = 0
    var gravidade = 0.5;
    var canoX = 900;
    var cano2X = 1350;
    var cano1_bocaCimaY = 315
    var cano2_bocaCimaY = 72
    var score = 0
    var recorde = 0
    function clicou() {
        bonecoDY = 10
    }
    canvas.addEventListener("click", function(){
        bonecoDY = 10
    }, false)
    setInterval(function () {
        context.clearRect(0, 0, 900, 540);
        bonecoY -= bonecoDY -= gravidade;
        context.drawImage(boneco, bonecoX, bonecoY, 41.4, 67.5);
        context.fillStyle = "#00ff00";
        context.fillRect(canoX, 0, 45, cano1_bocaCimaY);
        context.fillRect(canoX, cano1_bocaCimaY + 180, 45, 540);
        canoX -= 8
        context.fillRect(cano2X, 0, 45, cano2_bocaCimaY);
        context.fillRect(cano2X, cano2_bocaCimaY + 180, 45, 540);
        cano2X -= 8
        context.fillStyle = "#000000"
        context.fillText(`Ponutação: ${score++}`, 9, 25)
        context.fillText(`Recorde: ${recorde}`, 9, 50)
        if (canoX < -45) {
            canoX = 900
            cano1_bocaCimaY = 180 * Math.random()
        }
        if (cano2X < -45) {
            cano2X = 900
            cano2_bocaCimaY = 180 * Math.random()
        }
        if (bonecoY > 540) { // boneco caiu da tela
            bonecoDY = 0
            bonecoY = 270
            canoX = 900
            cano2X = 1350
            score = 0
        }
        if ((bonecoY < cano1_bocaCimaY || bonecoY > (cano1_bocaCimaY + 180)) && canoX < (bonecoX)) {
            bonecoDY = 0
            bonecoY = 270
            canoX = 900
            cano2X = 1350
            score = 0
        } // boneco bateu no cano
        if ((bonecoY < cano2_bocaCimaY || bonecoY > (cano2_bocaCimaY + 180)) && cano2X < (bonecoX)) {
            bonecoDY = 0
            bonecoY = 270
            canoX = 900
            cano2X = 1350
            score = 0
        } // boneco bateu no cano
        if (recorde < score) {
            recorde = score
        }
    }, interval);
};
