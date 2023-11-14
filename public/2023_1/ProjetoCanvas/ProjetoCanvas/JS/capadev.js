let id_canvas3 = document.getElementById("id_canvas3")
let ctx = id_canvas3.getContext("2d")
//mudar a fonte//
ctx.font="16px cursive";
ctx.fillStyle="black"
ctx.fillText("Desenvolvedores",180,140);

function quadrado(cor, x, y, w, h){
    ctx.beginPath()
    ctx.fillStyle=cor;
    ctx.fillRect(x,y,w, h);
    ctx.stroke();
}

quadrado("gold",150,120,200,30)
ctx.font="24px cursive";
ctx.fillStyle="black"
ctx.fillText("Desenvolvedores",160,140);
