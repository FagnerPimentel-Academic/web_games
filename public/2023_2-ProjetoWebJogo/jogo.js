const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
function jogo(){
    let comeco = 0
    let tempo1 = 0
    let tempo2 = 233
    let tempo3 = 466
    let lotacao = 0
    let passageirosNovos = 0
    let passageirosSaindo = 0
    let tempoPassageiro = 0
    let tempoPassageiroS = 0
    let tempoPassageiroChateado = 0
    let PassageiroChateado = false
    let PassageiroChateadoSaindo = false
    let imunidade = 0
    let parado = false
    let parou = 1
    let vel= 7
    let espacoOnibus = 20
    let onibusPisca = 5
    let setas = new Image();
    let onibusF = new Image();
    let onibusUP = new Image();
    let onibusMelhoria = 1
    let onibusEx = 1
    let buraco = new Image();
    let ponto = new Image ();
    let faixaO = new Image();
    let pontos = 0
    let tempoAviso = 0
    let tempoObs = 0
    let avisoPisca = -3
    let l = (Math.floor(Math.random() * 3) + 1)*253;
    let obstaculo = -100
    let obstaculoAtivo = 0
    let tempoPAviso = 200
    let tempoPas = 0
    let lp = 0
    let lpp = 0
    if (Math.floor(Math.random() * 2) + 1===2){lp = 935;lpp = 715}else{lp = 65;lpp = 130}
    let passageiro = -100
    let passageiroAtivo = 0
    let pavisoPisca = -3
    let vidas = 3
    let limite = 0
    let limites = 0
//Imagens
    onibusF.src = "imagem/onibus.png";
    onibusUP.src = "imagem/onibusup.png";
    buraco.src = "imagem/buraco.png";
    ponto.src = "imagem/ponto-de-onibus.png";
    faixaO.src = "imagem/FAIXAonibus.png"
    setas.src = "imagem/setas.png"
//Objeto do Onibus
    let bus = {
        x: 750,
        y: canvas.height - 250,
    };
//Controle das setas
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft" && parado === false) {bus.x -= vel*4;}
        else if (event.key === "ArrowRight" && parado === false) {bus.x += vel*4;}
        else if (event.key === "ArrowUp" && parado === false && vel < 10*onibusMelhoria) {vel += 1}
        else if (event.key === "ArrowDown" && parado === false && vel > 0) {vel -= 1}
    });
//Controle do mouse
    document.addEventListener("click", (event) => {
        let rect = canvas.getBoundingClientRect();
        let x_mouse = event.clientX - rect.left;
        let y_mouse = event.clientY - rect.top;
        if (x_mouse >= 1050 && x_mouse <= 1150 && y_mouse >= 150 && y_mouse <= 250 && vidas > 0 && parado === false && pontos>=15) {
            //Compra da melhoria do onibus
            pontos = pontos - 15
            onibusF.src = "imagem/onibusup.png";
            onibusMelhoria = 2
            espacoOnibus = (10 + onibusMelhoria*10) * onibusEx
        }
        if (x_mouse >= 1050 && x_mouse <= 1150 && y_mouse >= 400 && y_mouse <= 500 && vidas > 0 && parado === false && pontos>=40) {
            // Compra de outro onibus
            pontos = pontos - 40
            onibusEx = 2
            espacoOnibus = (10 + onibusMelhoria*10) * onibusEx

        }if(x_mouse >= 780 && x_mouse <= 1200 && y_mouse >= 480 && y_mouse <= 600 && vidas <= 0){
            alert('Reiniciando jogo!');
            jogo()
        }if(x_mouse >= 900 && x_mouse <= 1200 && y_mouse >= 480 && y_mouse <= 600 && comeco === 1){
            alert('Começando jogo!');
            loopJogo()
        }
    });
//Funcão com as atualizações das mecanicas do jogo
    function AtualizaJogo(){
        //Barreira do onibus
        bus.x = Math.max(130, Math.min(bus.x,750));
        //temporizadores
        if (tempo1 > 600){tempo1 = -100;tempo2=133;tempo3=366} else{tempo1 += vel}
        if (tempo2 > 600){tempo2 = -100} else{tempo2 += vel}
        if (tempo3 > 600){tempo3 = -100} else{tempo3 += vel}
        //Temporizador para aviso de obstaculo e para obstaculo
        if (tempoAviso > 250 && obstaculoAtivo < 5){
            if (avisoPisca > 10  && obstaculoAtivo < 5){
                avisoPisca = -10;
            }else if(obstaculoAtivo < 5){
                avisoPisca += 1;
            }if (tempoObs > 100 && obstaculoAtivo < 5){
                obstaculoAtivo = 10
                tempoAviso = 0
                avisoPisca = 0
                tempoObs = 0
                obstaculoF()
            }else if(obstaculoAtivo < 5){
                tempoObs += 1
            }
        }else if(obstaculoAtivo < 5){
            tempoAviso += vel/5
        }
        //Temporizador para aviso de passageiro e para passageiro
        if (tempoPAviso > 550 && passageiroAtivo < 5){
            if (pavisoPisca > 10  && passageiroAtivo < 5){
                pavisoPisca = -10;
            }else if(passageiroAtivo < 5){
                pavisoPisca += 1;
            }if (tempoPas > 100 && passageiroAtivo < 5){
                passageiroAtivo = 10
                tempoPAviso = 0
                pavisoPisca = 0
                tempoPas = 0
                passageiroF()
            }else if(passageiroAtivo < 5){
                tempoPas += 1
            }
        }else if(passageiroAtivo < 5){
            tempoPAviso += vel/5
        }



    }
//Funcão com o ponto de onibus do jogo
    function passageiroF(){
        //Coletar passageiros
        if (vel === 0 && bus.x < lpp + 155 -10 && bus.x + 120 > lpp-10 && bus.y < passageiro+233+10 && bus.y + 200 > passageiro+10 && parou === 1){
            parado = true
            PassageiroChateado = false
            if (lp === 65){
                tempoPassageiro = -10;
                limite = bus.x;
                tempoPassageiroS = bus.x;
                limites = -10;
                tempoPassageiroChateado = bus.x;
            }else{
                tempoPassageiro = 950;
                limite = bus.x+120;
                tempoPassageiroS =bus.x+120;
                limites = 950;
                tempoPassageiroChateado = bus.x+120;
            }
            parou = 0
            passageirosNovos = (Math.floor(Math.random() *(5*onibusMelhoria)) + 1)
            if (lotacao>0)
            {
                passageirosSaindo = (Math.round(Math.random() * onibusMelhoria)) * (Math.floor(Math.random() * 5 * (Math.floor(lotacao / 2 * onibusEx) * (onibusMelhoria - 1))) + 1);
                if (passageirosSaindo>lotacao){
                    passageirosSaindo = lotacao
                }
                lotacao = lotacao - passageirosSaindo;
                pontos = pontos + passageirosSaindo*2;
            }else{
                passageirosSaindo = 0;
            }
            if (passageirosNovos+lotacao>(10 + onibusMelhoria*10) * onibusEx){
                PassageiroChateado = true;
            }
            paradaPonto()
        }
        if (passageiro > 600){
            passageiro = -100
            passageiroAtivo = 0
            if (Math.floor(Math.random() * 2) + 1===2){lp = 935;lpp = 715}else{lp = 65;lpp = 130}
        }else{
            passageiro += vel
            requestAnimationFrame(passageiroF);
        }
    }
   function paradaPonto(){
       //coletaPassageiro();
        if (lp === 65 && tempoPassageiro>=limite) {
            if (PassageiroChateado === false){
                parado = false;
                tempoPassageiro = -50;
                tempoPassageiroS = -50;
                vel = 1;
                lotacao = lotacao + passageirosNovos;
            }else{
                lotacao = espacoOnibus
                PassageiroChateadoSaindo = true
                if (tempoPassageiroChateado<=limites){
                    parado = false;
                    tempoPassageiro = -50;
                    tempoPassageiroS = -50;
                    tempoPassageiroChateado = -50;
                    PassageiroChateado = false;
                    PassageiroChateadoSaindo = false;
                    vel = 1;
                }else{
                    tempoPassageiroChateado -=1;
                    requestAnimationFrame(paradaPonto);
                }
            }
        }else if(lp === 65 && PassageiroChateadoSaindo === false){
            tempoPassageiro+=1;
            tempoPassageiroS-=1;
            requestAnimationFrame(paradaPonto);
        }if (lp === 935 && tempoPassageiro<=limite) {
           if (PassageiroChateado === false){
               parado = false;
               tempoPassageiro = -50;
               tempoPassageiroS = -50;
               vel = 1;
               if (lotacao + passageirosNovos>=0) {lotacao = lotacao + passageirosNovos;}else{lotacao = 0}
           }else{
               lotacao = espacoOnibus
               PassageiroChateadoSaindo = true
               if (tempoPassageiroChateado>=limites){
                   parado = false;
                   tempoPassageiro = -50;
                   tempoPassageiroS = -50;
                   tempoPassageiroChateado = -50;
                   PassageiroChateado = false;
                   PassageiroChateadoSaindo = false;
                   vel = 1;
               }else{
                   tempoPassageiroChateado +=1;
                   requestAnimationFrame(paradaPonto);
               }
           }
        }else if(lp === 935 && PassageiroChateadoSaindo === false){
            tempoPassageiro-=1;
            tempoPassageiroS+=1;
            requestAnimationFrame(paradaPonto);
        }
   }
//Funcão com o obstaculo do jogo
    function obstaculoF(){
        //Colisao com onibus
        if (imunidade === 0 && bus.x < l-50 + 100 && bus.x + 120 > l-50 && bus.y < obstaculo+ 50 + 100 && bus.y + 200 > obstaculo + 50 && parado===false){
            imunidade = 200
            vidas -= 1;
            imunidadeOnibus()
        }
        if (obstaculo > 600){
            obstaculo = -100
            obstaculoAtivo = 0
            l = (Math.floor(Math.random() * 3) + 1)*253;
            parou = 1
        }else{
            obstaculo += vel;
            requestAnimationFrame(obstaculoF);
        }
    }
    function imunidadeOnibus(){
        //Imunidade apos colisao
        if (imunidade <= 0){
            imunidade = 0;
            onibusPisca = 5;
        }else{
            imunidade -= 1;
            //Temporizador de imunidade do onibus
            if (onibusPisca > 10){onibusPisca = -10;}else{onibusPisca += 1;}
            requestAnimationFrame(imunidadeOnibus);
        }
    }
//Funcão com as atualizações dos desenhos do jogo
    function desenhoJogo() {
        //Apaga Tudo
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //Fundo

        ctx.fillStyle = "dimgray"
        ctx.fillRect(0, 0, canvas.width, canvas.height)


        //Calçada

        ctx.fillStyle = "gray"
        ctx.fillRect(870, 0, 130, canvas.height)
        ctx.fillStyle = "gray"
        ctx.fillRect(0, 0, 130, canvas.height)

        //Detalhes

        //Calcada e Faixa Tempo 1 Esquerda

        ctx.fillStyle = "white"
        ctx.fillRect(376, tempo1, 20, 100)
        ctx.fillStyle = "#4c4c4c"
        ctx.fillRect(0, tempo1, 130, 8)

        //Calcada e Faixa Tempo 2 Esquerda

        ctx.fillStyle = "white"
        ctx.fillRect(376, tempo2, 20, 100)
        ctx.fillStyle = "#4c4c4c"
        ctx.fillRect(0, tempo2, 130, 8)

        //Calcada e Faixa Tempo 3 Esquerda

        ctx.fillStyle = "white"
        ctx.fillRect(376, tempo3, 20, 100)
        ctx.fillStyle = "#4c4c4c"
        ctx.fillRect(0, tempo3, 130, 8)

        //Calcada e Faixa Tempo 1 Direita

        ctx.fillStyle = "white"
        ctx.fillRect(622, tempo1, 20, 100)
        ctx.fillStyle = "#4c4c4c"
        ctx.fillRect(870, tempo1, 130, 8)

        //Calcada e Faixa Tempo 2 Direita

        ctx.fillStyle = "white"
        ctx.fillRect(622, tempo2, 20, 100)
        ctx.fillStyle = "#4c4c4c"
        ctx.fillRect(870, tempo2, 130, 8)

        //Calcada e Faixa Tempo 3 Direita

        ctx.fillStyle = "white"
        ctx.fillRect(622, tempo3, 20, 100)
        ctx.fillStyle = "#4c4c4c"
        ctx.fillRect(870, tempo3, 130, 8)

        //Aviso

        if (avisoPisca > 0) {
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.fillStyle = "yellow";
            ctx.strokeStyle = 'yellow';
            ctx.moveTo(l, 40);
            ctx.lineTo(l + 48, 144);
            ctx.lineTo(l - 48, 144);
            ctx.lineTo(l, 40);
            ctx.stroke();
            ctx.fillStyle = "black";
            ctx.font = "50px Arial";
            ctx.fillText("!", l - 7, 122);
            ctx
                .closePath();
        }

        //Passageiro

        if (pavisoPisca > 0) {
            ctx.beginPath();
            ctx.lineWidth = 10;
            ctx.strokeStyle = 'darkblue';
            ctx.fillStyle = 'blue';
            ctx.arc(lp, 100, 50, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fill();
            ctx.fillStyle = "black";
            ctx.font = "50px Arial";
            ctx.fillText("P", lp - 9, 120);
            ctx.closePath();
        }


        //Obstaculo
        if (obstaculo !== -100) {
            ctx.drawImage(buraco, l - 100, obstaculo, 200, 200);
        }

        //Ponto
        if (passageiro !== -100) {
            ctx.drawImage(ponto, lp - 45, passageiro, 90, 90);
        }

        //Faixa de Onibus
        if (passageiro !== -100) {
            ctx.drawImage(faixaO, lpp, passageiro, 155, 233);
        }

        //Onibus
        if (onibusPisca > 0) {
            ctx.drawImage(onibusF, bus.x, bus.y, 120, 200);
            if (onibusEx === 2) {
                ctx.drawImage(onibusF, bus.x, bus.y + 220, 120, 200);
            }
        }

        //Texto
        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.fillText("Espaço:     /", 10, 30);
        ctx.fillText(lotacao, 128, 30);
        ctx.fillText(espacoOnibus, 170, 30);
        ctx.fillText("Vidas:   /3", 210, 30);
        ctx.fillText(vidas, 300, 30);
        ctx.font = "20px Arial";

        if (parado === true) {
            if (PassageiroChateadoSaindo === false) {
                //passageiroEntra
                ctx.beginPath()
                ctx.lineWidth = 4;
                ctx.strokeStyle = 'darkred';
                ctx.fillStyle = 'red';
                ctx.arc(tempoPassageiro, canvas.height - 180, 10, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.fill();
                ctx.closePath()
                //passageiroSai
                if (passageirosSaindo !== 0) {
                    ctx.beginPath()
                    ctx.lineWidth = 4;
                    ctx.strokeStyle = 'darkgreen';
                    ctx.fillStyle = 'green';
                    ctx.arc(tempoPassageiroS, canvas.height - 100, 10, 0, 2 * Math.PI);
                    ctx.stroke();
                    ctx.fill();
                    ctx.closePath()
                }
            }
            if (PassageiroChateado === true && PassageiroChateadoSaindo === true) {
                ctx.beginPath()
                ctx.lineWidth = 4;
                ctx.strokeStyle = 'darkred';
                ctx.fillStyle = 'red';
                ctx.arc(tempoPassageiroChateado, canvas.height - 160, 10, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.fill();
                ctx.closePath()
            }
        }


        //Loja

        ctx.fillStyle = "#f38c36"
        ctx.fillRect(1000, 0, 200, 600)

        // Melhorias

        ctx.fillStyle = "#4c4c4c"
        ctx.fillRect(1050, 150, 100, 100)
        ctx.fillRect(1050, 400, 100, 100)
        ctx.fillStyle = "black";
        ctx.drawImage(onibusUP, 1075, 160, 45, 75);
        ctx.drawImage(onibusF, 1090, 410, 45, 75);
        ctx.fillText("Melhorar Onibus", 1020, 140);
        ctx.fillText("Preço: 15 Pontos", 1020, 270);
        ctx.fillText("Adicionar Onibus", 1020, 360);
        ctx.fillText("na Frota", 1060, 390);
        ctx.fillText("Preço: 40 Pontos", 1020, 530);
        ctx.font = "30px Arial";
        ctx.fillText("+1", 1060, 460);
        ctx.fillText("Melhorias", 1030, 30);
        ctx.fillText("Pontos:", 1030, 60);
        ctx.fillText(pontos, 1140, 60);
        if (lotacao===(10 + onibusMelhoria*10) * onibusEx){
            ctx.fillStyle = "red";
            ctx.font = "50px Arial";
            ctx.fillText("ONIBUS LOTADO", 300, 560);
        }
    }
    function telaPerdeu(){
        //Limpa Tela
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //Desenha Tela
        ctx.fillStyle = "dimgray"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = "black";
        ctx.font = "100px Arial";
        ctx.fillText("Você Perdeu!", 10, 100);
        ctx.fillText("Reiniciar?", 780, 560);
        requestAnimationFrame(telaPerdeu);
    }
//loop do jogo que realiza todas funcoes do jogo
    function loopJogo() {
        comeco = 0
        AtualizaJogo();
        desenhoJogo();
        if (vidas > 0){
            requestAnimationFrame(loopJogo);
        }else{
            telaPerdeu()
        }
    }
    function telaInicio(){
        //Desenha Tela
        comeco = 1
        ctx.beginPath();
        ctx.lineWidth = 15;
        ctx.fillStyle = "lightblue"
        ctx.strokeStyle = "#002aff"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.strokeRect(0, 0, canvas.width, canvas.height)
        ctx.font = "50px Arial";
        ctx.fillStyle = "BLACK"
        ctx.fillText("CONTROL RUSH", 30, 70);
        ctx.fillText("COMEÇAR", 900, 550);
        ctx.fillText("Como Jogar:", 30, 130);
        ctx.font = "27px Arial";
        ctx.fillText("Colete e deixe seus passageiros pelos pontos enquanto desvia dos buracos", 30, 170);
        ctx.fillText("pare completamente nos pontos para realizar o embarque e desembarque.", 30, 200);
        ctx.fillText("Se o ônibus estiver cheio quando parar no ponto, alguns cidadões vão ficar chateados.", 30, 230);
        ctx.fillText("Use os pontos que ganha quando seus passageiros desembarcam para melhorar o ônibus.", 30, 260);
        ctx.fillText("Aumenta a velocidade:", 170, 380);
        ctx.fillText("Dirige para", 80, 450);
        ctx.fillText("Esquerda:", 80, 480);
        ctx.fillText("Diminui a velocidade:", 170, 540);
        ctx.fillText("Dirige para", 398, 450);
        ctx.fillText("Direita:", 398, 480);
        setas.onload = function() {
            ctx.drawImage(setas, 200, 350, 200, 200);
            ctx.drawImage(onibusF, 750, 350, 120, 200);
        };
    }
    telaInicio()
}
jogo()


