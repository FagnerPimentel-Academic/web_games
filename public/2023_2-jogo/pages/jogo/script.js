// Pega o elemento canvas do HTML e seu contexto 2D
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Classe da Capivara (Player)
class Capivara {
  constructor() {
    this.x = 130;
    this.y = canvas.height - 80;
    this.largura = 30;
    this.altura = 20;
    this.velocidadeX = 0;
    this.velocidadeY = 0;
    this.imgCap = new Image();
    this.imgCap.src = "./imagens/capi/Frente.png";
    this.imgCapDeath = new Image();
    this.imgCapDeath.src = "./imagens/capi/deathCap.png";
    this.imgCapLeft = new Image();
    this.imgCapLeft.src = "./imagens/capi/Esquerda.png";
    this.imgCapRight = new Image();
    this.imgCapRight.src = "./imagens/capi/Direita.png";
    this.imgCapUp = new Image();
    this.imgCapUp.src = "./imagens/capi/Costa.png";

    this.currentImage = this.imgCap; // Imagem padrão
  }

  movimentar() {
    // Atualiza a posição da Capivara com base na velocidade
    this.x += this.velocidadeX;
    this.y += this.velocidadeY;

    // Limita a posição para garantir que a Capivara não saia da tela
    if (this.x < 0) {
      this.x = 0;
    } else if (this.x > canvas.width - this.largura) {
      this.x = canvas.width - this.largura;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocidadeY = 0;
    } else if (this.y > canvas.height - this.altura) {
      this.y = canvas.height - this.altura;
    }
  }

  renderizar() {
    // Renderiza a Capivara na posição atual
    ctx.drawImage(this.currentImage, this.x, this.y, this.largura, this.altura);
  }

  renderizarMorta() {
    // Renderiza a Capivara morta na posição
    ctx.drawImage(this.imgCapDeath, this.x, this.y, this.largura, this.altura);
  }

  updateDirectionImage() {
    if (this.velocidadeX < 0) {
      this.currentImage = this.imgCapLeft; // Movendo para a esquerda
    } else if (this.velocidadeX > 0) {
      this.currentImage = this.imgCapRight; // Movendo para a direita
    } else if (this.velocidadeY < 0) {
      this.currentImage = this.imgCapUp;
    } else {
      this.currentImage = this.imgCap; // Sem movimento horizontal
    }
  }
}

// Classe dos Foguetes (Obstáculos)
class Foguete {
  constructor(x, y, largura, altura, velocidadeX, velocidadeY, imagemSrc) {
    this.x = x;
    this.y = y;
    this.largura = largura;
    this.altura = altura;
    this.velocidadeX = velocidadeX;
    this.velocidadeY = velocidadeY;
    this.imagem = new Image();
    this.imagem.src = imagemSrc;
  }

  movimentar() {
    // Atualiza a posição do Foguete com base na velocidade
    this.x += this.velocidadeX;
    this.y += this.velocidadeY;
  }

  renderizar() {
    // Renderiza o Foguete na posição atual
    ctx.drawImage(this.imagem, this.x, this.y, this.largura, this.altura);
  }
}

// Classe das Moedas (Coletáveis)
class Moeda {
  constructor(x, y, largura, altura, tempoVida) {
    this.x = x;
    this.y = y;
    this.largura = largura;
    this.altura = altura;
    this.tempoVida = tempoVida;
    this.imagem = new Image();
    this.imagem.src = "./imagens/coin.png";
  }

  renderizar() {
    // Renderiza a Moeda na posição atual
    ctx.drawImage(this.imagem, this.x, this.y, this.largura, this.altura);
  }
}

// Classe do Jogo, com as informações e funções para iniciar, reiniciar o jogo
class Jogo {
  constructor() {
    this.capivara = new Capivara(); // Cria uma instância da Capivara
    this.foguetes = []; // Array para armazenar os Foguetes
    this.moedas = []; // Array para armazenar as Moedas
    this.capivaraViva = true; // Variável para verificar se a Capivara está viva
    this.tempoDeJogo = 0; // Contador de tempo de jogo
    this.score = 0; // Pontuação do jogador
    this.tempoDeJogoInterval = setInterval(() => this.atualizarTempoDeJogo(), 1000); // Atualiza o tempo de jogo a cada segundo
    this.canvas = canvas; // Referência ao elemento canvas
    this.ctx = ctx; // Referência ao contexto 2D do canvas
    this.velocidade = 3; // Velocidade de movimentação da Capivara
    this.intervalosFoguetes = [];
    this.intervalosMoedas = [];
  }

  aumentarScore() {
    // Função para aumentar o score e atualizar o elemento HTML correspondente
    this.score++;
    document.getElementById("score").textContent = `Score: ${this.score}`;
  }

  atualizarScore() {
    document.getElementById("score").textContent = `Score: ${this.score}`;
  }

  atualizarTempoDeJogo() {
    // Função para atualizar o tempo de jogo e atualizar o elemento HTML correspondente
    if(this.capivaraViva){
    this.tempoDeJogo += 1;
    document.getElementById("tempoJogo").textContent = `Tempo de Jogo: ${this.tempoDeJogo} segundos`;
    }
  }

  encerrarTempoDeJogo() {
    // Função para atualizar o tempo de jogo e atualizar o elemento HTML correspondente
    this.tempoDeJogo = this.tempoDeJogo;
    document.getElementById("tempoJogo").textContent = `Tempo de Jogo: ${this.tempoDeJogo} segundos`;
  }

  printCapybara() {
    // Função para renderizar a Capivara no canvas
    if (this.capivaraViva) {
      this.capivara.renderizar();
    } else {
      this.capivara.renderizarMorta();
    }
  }


  limparIntervalosFoguetes() {
    for (const intervalo of this.intervalosFoguetes) {
      clearInterval(intervalo);
    }
    this.intervalosFoguetes = [];
  }

  limparIntervalosMoedas() {
    for (const intervalo of this.intervalosMoedas) {
      clearInterval(intervalo);
    }
    this.intervalosMoedas = [];
  }

  updateMoedas() {
    // Função para atualizar e renderizar as Moedas
    for (let i = 0; i < this.moedas.length; i++) {
      const moeda = this.moedas[i];
      moeda.renderizar();

      if (this.isColliding(this.capivara, moeda)) {
        // Se a Capivara colidir com a Moeda, aumenta o score e remove a Moeda
        this.moedas.splice(i, 1);
        i--;
        this.aumentarScore();
      } else if (moeda.tempoVida <= 0) {
        // Se o tempo de vida da Moeda esgotar, remove a Moeda
        this.moedas.splice(i, 1);
        i--;
      }
      moeda.tempoVida--;
    }
  }

  isColliding(object1, object2) {
    // Função para verificar colisões entre dois objetos retangulares
    const colisaoEsquerda = object1.x + object1.largura > object2.x;
    const colisaoDireita = object1.x < object2.x + object2.largura;
    const colisaoCima = object1.y + object1.altura > object2.y;
    const colisaoBaixo = object1.y < object2.y + object2.altura;
    return colisaoEsquerda && colisaoDireita && colisaoCima && colisaoBaixo;
  }

  createFoguete() {
    // Função para criar um novo Foguete à esquerda da tela
    const foguete = new Foguete(-50, Math.random() * this.canvas.height, 33, 18, 5,
      0, "./imagens/foguete/fogD.png");
    this.foguetes.push(foguete);
  }

  // Função que analisa as teclas pressionadas
  handleKeyDown(event) {
    if ((event.key === "r"|| event.key === "iniciar") && !this.capivaraViva) {
      // Se a tecla "r" for pressionada e a Capivara estiver morta, reinicia o jogo
      this.capivaraViva = true;
      this.capivara.x = 40;
      this.capivara.y = this.canvas.height - 38;
      this.tempoDeJogo = 0;
      clearInterval(this.tempoDeJogoInterval);
      this.moedas = []
      this.atualizarScore()
      document.getElementById("tempoJogo").textContent = "Tempo de Jogo: 0 segundos";
      this.tempoDeJogoInterval = setInterval(() => this.atualizarTempoDeJogo(this.capivaraViva), 1000);
    } else if (this.capivaraViva) {
      // Se a Capivara estiver viva, movimenta conforme as teclas pressionadas
      if (event.key === "a") {
        this.capivara.velocidadeX = -this.velocidade;
      } else if (event.key === "d") {
        this.capivara.velocidadeX = this.velocidade;
      } else if (event.key === "w") {
        this.capivara.velocidadeY = -this.velocidade;
      } else if (event.key === "s") {
        this.capivara.velocidadeY = this.velocidade;
      }
    }
  }

  // Função que analisa as teclas liberadas
  handleKeyUp(event) {
    if (event.key === "a" || event.key === "d") {
      // Se as teclas de movimentação horizontal forem liberadas, zera a velocidade X da Capivara
      this.capivara.velocidadeX = 0;
    }
    if (event.key === "w" || event.key === "s") {
      // Se as teclas de movimentação vertical forem liberadas, zera a velocidade Y da Capivara
      this.capivara.velocidadeY = 0;
    }
  }
}

function start() {

  const game = new Jogo(); // Cria uma instância do Jogo

  function animationLoad() {
    // Função que atualiza o canvas em cada frame

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (game.capivaraViva) {
      // Se a Capivara estiver viva, movimenta e renderiza
      game.capivara.movimentar();
      game.capivara.updateDirectionImage();
      game.printCapybara();
    } else {
      // Se a Capivara estiver morta, apenas renderiza a versão morta
      game.printCapybara();
      game.encerrarTempoDeJogo();

    }

    // Laço de repetição para movimentação e colisão dos foguetes
    for (let i = 0; i < game.foguetes.length; i++) {
      const foguete = game.foguetes[i];
      foguete.movimentar();
      foguete.renderizar();

      if (game.capivaraViva && game.isColliding(game.capivara, foguete)) {
        // Se a Capivara estiver viva e colidir com um foguete, a Capivara morre
        game.capivaraViva = false;
        game.score = 0;
        document.getElementById('iniciar').disabled = false;
      }

      if (foguete.x > canvas.width || foguete.y > canvas.height || foguete.y + foguete.altura < 0) {
        // Se o foguete sair da tela, remove-o do array
        game.foguetes.splice(i, 1);
        i--;
      }
    }

    game.updateMoedas(); // Atualiza as moedas

    requestAnimationFrame(animationLoad); // Solicita o próximo frame de animação
  }

  // Funções para criar foguetes e moedas em intervalos regulares
  function createFoguete() {
    const foguete = new Foguete(-50, Math.random() * canvas.height, 40, 16, 2.5, 0, "./imagens/foguete/fogD.png");
    game.foguetes.push(foguete);
  }



  function createFogueteRightToLeft() {
    const foguete = new Foguete(canvas.width, Math.random() * canvas.height, 40, 16, -2.5, 0, "./imagens/foguete/fogE.png");
    game.foguetes.push(foguete);
  }

  function createMoeda() {
    const moeda = new Moeda(Math.random() * canvas.width, Math.random() * canvas.height, 30, 18, 600);
    game.moedas.push(moeda);
  }
  // Adiciona os event listeners para as teclasd
  window.addEventListener("keydown", (event) => game.handleKeyDown(event));
  window.addEventListener("keyup", (event) => game.handleKeyUp(event));

  if (game.capivaraViva) {
    game.limparIntervalosFoguetes();
    game.limparIntervalosMoedas();
    animationLoad(); // Inicia a animação
    setInterval(createFoguete, 2500); // Cria um novo foguete a cada 1.5 segundos
    setInterval(createFoguete, 4000); // Cria um novo foguete a cada 4 segundos

    setInterval(createFogueteRightToLeft, 1500); // Cria um novo foguete da direita para a esquerda a cada 2.25 segundos
    setInterval(createFogueteRightToLeft, 3000); // Cria um novo foguete da direita para a esquerda a cada 3 segundos
    setInterval(createMoeda, 5000); // Cria uma nova moeda a cada 5 segundos
    setInterval(createMoeda, 7500); // Cria uma nova moeda a cada 7.5 segundos
  } else {
    game.foguetes = []
    game.moedas = []
  }
  // Desabilita o suavização de imagens no canvas
  ctx.imageSmoothingEnabled = false;
}

function iniciarJogo() {
    start();
    document.getElementById('iniciar').disabled = true;  // Desativa o botão após o clique
    document.getElementById('iniciar').style.display = 'none';
  }
  document.getElementById('iniciar').addEventListener('click', iniciarJogo);
  