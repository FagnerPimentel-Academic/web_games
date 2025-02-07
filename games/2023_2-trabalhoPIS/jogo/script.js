const canvas = document.getElementById("canvas_quiz");
const ctx = canvas.getContext('2d');

const pipe = document.querySelector('.pipe');
const satelite = document.querySelector('.satelite');

const pipe2 = document.querySelector('.pipe2');
const satelite2 = document.querySelector('.satelite2');

const pipe3 = document.querySelector('.pipe3');
const satelite3 = document.querySelector('.satelite3');

const personagem = document.querySelector('.personagem');
const pontuacao = document.querySelector('.pontuacao');

let pipePosition = 100; // posição inicial do buraco negro
let satelitePosition = 60; // posição inicial do satélite
let personagemHorizontalPosition = 0; // posição inicial horizontal do personagem
let personagemVerticalPosition = 50; // posição inicial vertical do personagem

let pipePosition2 = 80; // posição inicial do segundo buraco negro
let satelitePosition2 = 20; // posição inicial do segundo satélite

let pipePosition3 = 60; // posição inicial do segundo buraco negro
let satelitePosition3 = 10; // posição inicial do segundo satélite

const estrela = document.querySelector('.estrela');
let estrelaPositionX = 0;
let estrelaPositionY = 0;


const questionTime = 20;
let currentQuestionIndex = 0;
let score = 0;
let timer;

let isGamePaused = false;
let isSatelliteCollision = false;

let isGameOver = false;

let sateliteCollision1 = false;
let sateliteCollision2 = false;
let sateliteCollision3 = false;

let estrelaTimer;



// Lista de questões
const questions = [ 
    {
        question: "Quem foi a primeira pessoa a viajar no Espaço?",
        options: ["Yuri Gagarin", "A cadela Laika", "Neil Armstrong", "Marcos Pontes"],
        correctAnswer: "Yuri Gagarin"
    },
    {
        question: "Qual a montanha mais alta do mundo?",
        options: ["Mauna Kea", "Monte Chimborazo", "Monte Everest", "Pico da Neblina"],
        correctAnswer: "Monte Everest"
    },
    {
        question: "Que país tem o formato de uma bota?",
        options: ["Butão", "Brasil", "Portugal", "Itália"],
        correctAnswer: "Itália"
    },
    {
        question: "Quem inventou a lâmpada?",
        options: ["Graham Bell", "Thomas Edison", "Henry Ford", "Santos Dumont"],
        correctAnswer: "Thomas Edison"
    },
    {
        question: "De quem é a famosa frase “Penso, logo existo”?",
        options: ["Platão", "Galileu Galilei", "Descartes", "Sócrates"],
        correctAnswer: "Descartes"
    },
    {
        question: '"twenty past six”. Que horas são em inglês?',
        options: ["12:06", "6:20", "2:20", "6:02"],
        correctAnswer: "6:20"
    },
    {
        question: "Qual o metal cujo símbolo químico é o Au?",
        options: ["Cobre", "Prata", "Mercúrio", "Ouro"],
        correctAnswer: "Ouro"
    },
    {
        question: "Qual o lugar mais profundo dos oceanos?",
        options: ["Fossa de Bentley", "Fossa de Java", "Fossa das Ilhas Sandwich", "Fossa das Marianas"],
        correctAnswer: "Fossa das Marianas"
    },
    {
        question: "Qual animal produz o som mais alto?",
        options: ["Bugio", "Leão", "Baleia azul", "Elefante africano"],
        correctAnswer: "Baleia azul"
    },
    {
        question: "Quantos pares de costelas um ser humano possui?",
        options: ["5", "8", "10", "12"],
        correctAnswer: "12"
    },
];

const personagemWidth = personagem.offsetWidth;
const personagemHeight = personagem.offsetHeight;
const personagemSpeed = 5;
let animationFrameId;

initializeEstrela();

document.addEventListener('keydown', keyDownHandler);

function keyDownHandler(event) {
    if (!isGamePaused) {
        switch (event.key) {
            case 'ArrowUp':
                moveCharacterUp();
                break;
            case 'ArrowDown':
                moveCharacterDown();
                break;
            case 'ArrowLeft':
                moveCharacterLeft();
                break;
            case 'ArrowRight':
                moveCharacterRight();
                break;
        }
    }
}

function moveCharacterUp() {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = requestAnimationFrame(() => {
        personagemVerticalPosition += personagemSpeed;
        personagem.style.bottom = `${personagemVerticalPosition}%`;

        if (personagemVerticalPosition > 100) {
            personagemVerticalPosition = 100;
        }
    });
}

function moveCharacterDown() {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = requestAnimationFrame(() => {
        personagemVerticalPosition -= personagemSpeed;
        personagem.style.bottom = `${personagemVerticalPosition}%`;

        if (personagemVerticalPosition < 0) {
            personagemVerticalPosition = 0;
        }
    });
}

function moveCharacterLeft() {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = requestAnimationFrame(() => {
        personagemHorizontalPosition -= personagemSpeed;
        personagem.style.left = `${personagemHorizontalPosition}%`;

        if (personagemHorizontalPosition < 0) {
            personagemHorizontalPosition = 0;
        }
    });
}

function moveCharacterRight() {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = requestAnimationFrame(() => {
        personagemHorizontalPosition += personagemSpeed;
        personagem.style.left = `${personagemHorizontalPosition}%`;

        if (personagemHorizontalPosition > 100) {
            personagemHorizontalPosition = 100;
        }
    });
}

canvas.addEventListener('click', function (event) {
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;

    const options = questions[currentQuestionIndex].options;
    for (let i = 0; i < options.length; i++) {
        const optionY = 40 + i * 30;
        if (mouseY > optionY && mouseY < optionY + 20) {
            clearInterval(timer);
            checkAnswer(options[i]);
            isGamePaused = false;
            break;
        }
    }
});

function pauseGameAndDisplayQuestion() {
    if (sateliteCollision1 === true) {
        satelitePosition =- 10
    }
    if (sateliteCollision2 === true) {
        satelitePosition2 =- 10
    }
    if (sateliteCollision3 === true) {
        satelitePosition3 =- 10
    }
    isGamePaused = true;
    displayQuestion();

    // personagemHorizontalPosition += 5;
    // personagem.style.bottom = `${personagemHorizontalPosition}%`;
    // personagemVerticalPosition += 20;
    // personagem.style.bottom = `${personagemVerticalPosition}%`;
}
function checkSateliteCollision() {
    const personagemRect = personagem.getBoundingClientRect();
    const sateliteRect = satelite.getBoundingClientRect();

    if (
        personagemRect.right > sateliteRect.left &&
        personagemRect.left < sateliteRect.right &&
        personagemRect.bottom > sateliteRect.top &&
        personagemRect.top < sateliteRect.bottom
    ) {
        if (!isSatelliteCollision) {
            isSatelliteCollision = true;

            // Ajusta a posição vertical do personagem quando colide com o satélite
            // personagemVerticalPosition += 30;
            // personagemHorizontalPosition += 30;
            // personagem.style.bottom = `${personagemHorizontalPosition}%`;
            // personagem.style.bottom = `${personagemVerticalPosition}%`;

            // Pausa o jogo e exibe a pergunta
            pauseGameAndDisplayQuestion();
        }
    } else {
        isSatelliteCollision = false;
    }
}



function checkCollision() {
    const personagemRect = personagem.getBoundingClientRect();

    // Verifica colisão com o buraco negro
    if (isColliding(personagemRect, pipe.getBoundingClientRect())) {
        endGame();
        return;
    }

    // Verifica colisão com o satélite apenas se não houver colisão previamente tratada
    if (!isSatelliteCollision && isColliding(personagemRect, satelite.getBoundingClientRect())) {
        isSatelliteCollision = true;
        sateliteCollision1 = true
        pauseGameAndDisplayQuestion();
        return;
    }

    // Verifica colisão com o segundo buraco negro
    if (isColliding(personagemRect, pipe2.getBoundingClientRect())) {
        endGame();
        return;
    }

    // Verifica colisão com o segundo satélite apenas se não houver colisão previamente tratada
    if (!isSatelliteCollision && isColliding(personagemRect, satelite2.getBoundingClientRect())) {
        sateliteCollision2 = true
        isSatelliteCollision = true;
        pauseGameAndDisplayQuestion();
        return;
    }

    // Verifica colisão com o terceiro satélite apenas se não houver colisão previamente tratada
    if (isColliding(personagemRect, pipe3.getBoundingClientRect())) {
        sateliteCollision3 = true
        endGame();
        return;
    }
    
    // Verifica colisão com o terceiro satélite apenas se não houver colisão previamente tratada
    if (!isSatelliteCollision && isColliding(personagemRect, satelite3.getBoundingClientRect())) {
        isSatelliteCollision = true;
        sateliteCollision3 = true
        pauseGameAndDisplayQuestion();
        return;
    }

    // Reseta a variável se não houver colisão com nenhum objeto
    isSatelliteCollision = false;
}

function isColliding(rect1, rect2) {
    return (
        rect1.right > rect2.left &&
        rect1.left < rect2.right &&
        rect1.bottom > rect2.top &&
        rect1.top < rect2.bottom
    );
}
// ----------------------estrela

function initializeEstrela() {
    estrelaPositionX = 80; // Inicializa fora da tela
    estrelaPositionY = Math.random() * 80 + 10; // Posição vertical aleatória
    estrela.style.top = `${estrelaPositionY}%`;
    estrela.style.left = `${estrelaPositionX}%`;
}

// Função para mover a estrela
function moveEstrela() {
    // Verifica se a estrela está escondida
    if (estrelaPositionX <= -100) {
        // Gera um número aleatório para decidir se a estrela deve aparecer
        if (Math.random() < 0.01) {
            // Aparece em um lugar aleatório
            estrelaPositionX = 100;
            estrelaPositionY = Math.random() * 80 + 10;
            estrela.style.left = `${estrelaPositionX}%`;
            estrela.style.top = `${estrelaPositionY}%`;

            

           
// Configura um temporizador para esconder a estrela após 4 segundos
            estrelaTimer = setTimeout(() => {
                hideEstrela();
            }, 4000);
        }
    }

    // Move a estrela para a esquerda com uma velocidade de 0.1 unidades
    estrelaPositionX -= 0.1;
    estrela.style.left = `${estrelaPositionX}%`;

    // Obtém os retângulos que representam a posição e tamanho do astronauta e da estrela
    const personagemRect = personagem.getBoundingClientRect();
    const estrelaRect = estrela.getBoundingClientRect();

    // Verifica se há colisão entre o astronauta e a estrela
    if (
        personagemRect.right > estrelaRect.left &&
        personagemRect.left < estrelaRect.right &&
        personagemRect.bottom > estrelaRect.top &&
        personagemRect.top < estrelaRect.bottom
    ) {
        // O astronauta pegou a estrela
        score++;
        pontuacao.innerHTML = `${score}`;
        
        // Cancela o temporizador se o astronauta pegou a estrela antes de esconder
        clearTimeout(estrelaTimer);
        hideEstrela();
    }
}
function hideEstrela() {
    // Esconde a estrela configurando sua posição fora da tela
    estrelaPositionX = -100;
    estrela.style.left = `${estrelaPositionX}%`;
    estrela.style.top = `${estrelaPositionY}%`;
}


function displayQuestion() {
    clearInterval(timer);

    canvas.style.display = 'block';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText(`Questão ${currentQuestionIndex + 1}: ${questions[currentQuestionIndex].question}`, 20, 30);

    const options = questions[currentQuestionIndex].options;
    for (let i = 0; i < options.length; i++) {
        ctx.fillText(`${i + 1}. ${options[i]}`, 20, 60 + i * 30);
    }

    sateliteCollision1 = false
    sateliteCollision2 = false
    sateliteCollision3 = false

    let timeRemaining = questionTime;
    timer = setInterval(function () {
        ctx.clearRect(650, 10, 150, 20);
        ctx.fillText(`Tempo: ${timeRemaining}`, 650, 30);

        if (timeRemaining <= 0) {
            clearInterval(timer);
            checkAnswer(null);
        }

        timeRemaining--;
    }, 1000);
}

function checkAnswer(selectedOption) {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    if (selectedOption === correctAnswer) {
        score++;
        pontuacao.innerHTML = `${score}`
    }

    clearInterval(sateliteCollisionInterval);

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        canvas.style.display = 'none';
        // Reinicia o intervalo de colisão com o satélite após um breve intervalo
        setTimeout(() => {
            sateliteCollisionInterval = setInterval(() => {
                checkSateliteCollision();
            }, 100);
        }, 500);
    } else {
        endGame();
    }

    isGamePaused = false;
}

function endGame() {
    clearInterval(loop);
    clearInterval(timer);
    document.removeEventListener('keydown', keyDownHandler);

    // Reinicia a posição vertical do personagem
    personagemVerticalPosition = 50;
    personagem.style.bottom = `${personagemVerticalPosition}%`;

    canvas.style.display = 'block';
    pontuacao.style.display = 'none';
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillText(`Fim de jogo! Sua pontuação: ${score}`, 20, 30);

    clearInterval(sateliteCollisionInterval);
    isGameOver = true;
}

let sateliteCollisionInterval = setInterval(() => {
    if (!isGameOver) { // Adiciona esta verificação para continuar verificando a colisão apenas se o jogo não estiver encerrado
        checkSateliteCollision();
    }
}, 100);


const loop = setInterval(() => {
    if (!isGamePaused && !isGameOver) {
        checkCollision();

        // Movimento dos buracos negros e satélites (pipe e satelite)
        pipePosition -= 0.3;
        pipe.style.left = `${pipePosition}%`;

        if (pipePosition <= 0) {
            pipePosition = 100;
        }

        satelitePosition -= 0.3;
        satelite.style.left = `${satelitePosition}%`;

        if (satelitePosition <= 0) {
            satelitePosition = 100;
        }

        // Movimento do segundo par de buracos negros e satélites (pipe2 e satelite2)
        pipePosition2 -= 0.2;
        pipe2.style.left = `${pipePosition2}%`;

        if (pipePosition2 <= 0) {
            pipePosition2 = 100;
        }

        satelitePosition2 -= 0.2;
        satelite2.style.left = `${satelitePosition2}%`;

        if (satelitePosition2 <= 0) {
            satelitePosition2 = 100;
        }

        // Movimento do terceiro par de buracos negros e satélites (pipe3 e satelite3)
        pipePosition3 -= 0.2;
        pipe3.style.left = `${pipePosition3}%`;

        if (pipePosition3 <= 0) {
            pipePosition3 = 100;
        }

        satelitePosition3 -= 0.2;
        satelite3.style.left = `${satelitePosition3}%`;

        if (satelitePosition3 <= 0) {
            satelitePosition3 = 100;
        }

        // Movimento da estrela
        moveEstrela();
    }
}, 10);

