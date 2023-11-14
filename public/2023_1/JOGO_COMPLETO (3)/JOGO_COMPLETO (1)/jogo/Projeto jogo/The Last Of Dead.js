//codigo da estrutura do canvas

window.onload = function() {
    var canvas = document.getElementById('jogo');
    canvas.width = 800;
    canvas.height = 400;
    var ctx = canvas.getContext('2d');
    var pontos = 0;
    var iniciarjogo = false;
    var musica = new Audio('musicadefundo.mp3');
    musica.loop = true;
    var pontuacaoMaxima = localStorage.getItem('pontuacaoMaxima');
    if (pontuacaoMaxima===null){
        pontuacaoMaxima=0
    }

    //codigos para iniciar o jogo junto com a musica
    var botaoiniciar = document.getElementById('Play');
    botaoiniciar.addEventListener('click', function() {
        if (!iniciarjogo) {
            iniciarjogo = true;
            botaoiniciar.disabled = true;
            musica.play();
            setInterval(gerarAlvo, 1000);
            let segundos = 60;
            let timer = setInterval(function() {
                segundos--;
                ctx.clearRect(0, 0, canvas.width/2, canvas.height/2);
                ctx.font = "30px Arial";
                ctx.fillText("tempo: "+segundos, canvas.width/5, canvas.height/5);
                if(pontos === 20){
                    ctx.fillText("Meta batida", canvas.width/3, canvas.height/3);
                }
                if(segundos === 0) {
                    clearInterval(timer);
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.font = "30px Arial";
                    ctx.fillText("Tempo esgotado!", canvas.width/2, canvas.height/2);
                    setTimeout(function() {
                        if (pontos>pontuacaoMaxima){
                            pontuacaoMaxima=pontos
                            localStorage.setItem('pontuacaoMaxima', pontuacaoMaxima);
                        }
                        location.reload();
                    }, 100);
                }
            }, 1000);
        }
    });

    //armazenar os alvos
    var alvos = [];

    canvas.addEventListener('click', function(event) {
        if (iniciarjogo) {
            var rect = canvas.getBoundingClientRect();
            var mouseX = event.clientX - rect.left;
            var mouseY = event.clientY - rect.top;
            var clickedTarget = checkarClickAlvo(mouseX, mouseY);
            if (clickedTarget) {
                if (clickedTarget.color === 'red') {
                    pontos += 1;
                } else if (clickedTarget.color === 'blue') {
                    pontos -= 2;
                }
                removeAlvo(clickedTarget);
                playSound('somtiro.mp3');
                atualizarPontos();
            }
            else{
                pontos-=2;
                playSound('somtiro.mp3');
                atualizarPontos();
            }
        }
    });

    function gerarAlvo() {
        var isZombie = Math.random() < 0.9; // 90% de chance de ser um zumbi
        var target = {
            x: getRandomPosition(100, canvas.width - 100),
            y: getRandomPosition(100, canvas.height - 100),
            size: 100,
            color: isZombie ? 'red' : 'blue'
        };
        alvos.push(target);
        desenharAlvo(target);
        setTimeout(function() {
            removeAlvo(target);
            atualizarPontos();
        }, 900);
    }

    function getRandomPosition(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    //imagens do alvos
    function desenharAlvo(target) {
        var targetImage = new Image();
        targetImage.src = target.color === 'red' ? 'zombie1.png' : 'policial.png';
        targetImage.onload = function() {
            ctx.drawImage(targetImage, target.x, target.y, target.size, target.size);
        };
        target.image = targetImage;
    }

    function removeAlvo(target) {
        var index = alvos.indexOf(target);
        if (index !== -1) {
            alvos.splice(index, 1); // Remove o alvo do array de alvos
        }
        ctx.clearRect(target.x, target.y, target.size, target.size);
    }

    function checkarClickAlvo(mouseX, mouseY) {
        for (var i = 0; i < alvos.length; i++) {
            var target = alvos[i];
            if (
                mouseX >= target.x &&
                mouseX <= target.x + target.size &&
                mouseY >= target.y &&
                mouseY <= target.y + target.size
            ) {
                return target;
            }
        }
        return null;
    }

    function atualizarPontos() {
        var pontosElement = document.getElementById('pontos');
        if (pontosElement) {
            pontosElement.textContent = 'Pontos: ' + pontos;
        }
        var pontuacaoMaximaElement = document.getElementById('pontuacaoMaxima');
        if (pontuacaoMaximaElement) {
            pontuacaoMaximaElement.textContent = 'Maximo de pontos: ' + pontuacaoMaxima;
        }}

    function playSound(soundFile) {
        var audio = new Audio(soundFile);
        audio.play();
    }


};


