let inicio_contador;
let fim_contador;
let tempo_final_chamado = false

const menu_jogo = document.getElementById('teste');
const comojogar = document.getElementById('como_jogar');
const fim = document.getElementById('fim_do_jogo');
const jogo =  document.getElementById('canvas');
const timer = document.getElementById('Timer')
function iniciar(){
    menu_jogo.style.display = 'none'
    jogo.style.display = 'block'
    tempo_incial()
}

function terminar_fase(){
    fim.style.display = 'block'

    jogo.style.display = 'block'
    comojogar.style.display = 'none'
    jogo.style.zIndex = -1
    if(!tempo_final_chamado){
        tempo = tempo_final();
        tempo_final_chamado = true
        timer.innerHTML = `Tempo: ${tempo.toFixed(2)} segundos`
    }
}

function jogar_novamente(){
    fim.style.display = 'none'
    location.reload()
}

function f_comojogar(){
    comojogar.style.display = 'block'
    menu_jogo.style.display = 'block'
    menu_jogo.style.zIndex = -2
}

function fechar_comojogar(){
    comojogar.style.display = 'none'
    menu_jogo.style.zIndex = 1
}

function tempo_incial(){
    inicio_contador = new Date();
}
function tempo_final(){
    fim_contador = new Date();
    const duracao = (fim_contador - inicio_contador) / 1000;
    return duracao
}