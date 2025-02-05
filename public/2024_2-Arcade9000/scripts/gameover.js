function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
const gameName = getQueryParam('game');
document.addEventListener('keydown', function(evento) {
    if (evento.key === 'Enter') {
        window.location.href = gameName; 
    }
});