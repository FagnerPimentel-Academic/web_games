function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const victoryMessage = getQueryParam('message');
document.getElementById('message').textContent = victoryMessage;
const keynote = getQueryParam('keynotes');
document.getElementById('keynotes').textContent = keynote;
const gameName = getQueryParam('game');

document.addEventListener('keydown', function(evento) {
    tecla = evento.key;
    if (evento.key === 'Enter') {
        window.location.href =gameName; 
    }
});