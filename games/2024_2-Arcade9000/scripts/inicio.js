document.addEventListener('keydown', function(evento) {
    tecla = evento.key;
    if (evento.key === 'Enter') {
        window.location.href = 'pacman.html'; 
    }
});