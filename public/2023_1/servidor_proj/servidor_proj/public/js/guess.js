val = Math.floor(Math.random() * 100)
function adivinhacao(){
    x = document.getElementById("valor").value
    resul = document.getElementById("guesscheck")
    if(x == val){
        resul.innerHTML = "Acertou!"
        resul.style.backgroundColor = "green"
    } else{
        resul.style.backgroundColor = "red"
        if(x < val){
            resul.innerHTML = "O número é maior que o seu!"
        } else if(x > val){
            resul.innerHTML = "O número é menor que o seu!"
        }
    }
}