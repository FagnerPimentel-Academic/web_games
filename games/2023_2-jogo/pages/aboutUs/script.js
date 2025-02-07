function toggleCurriculo(id) {
    var curriculo = document.getElementById(id);
    if (curriculo.style.display === 'block') {
        curriculo.style.display = 'none';
    } else {
        curriculo.style.display = 'block';
    }
}