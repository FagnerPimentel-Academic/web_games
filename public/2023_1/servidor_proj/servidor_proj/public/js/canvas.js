c = document.getElementById("canvas").getContext("2d");
function retang(x,y,w,h,cor){
    c.fillStyle = cor;
    c.fillRect(x*0.6,y*0.6,w*0.6,h*0.6);
}
function arco(x,y,r,s,e,corFora,corFill){
    c.beginPath();
    c.fillStyle = corFill;
    c.strokeStyle = corFora;
    c.arc(x*0.6,y*0.6,r*0.6,s,e);
    c.stroke();
    c.fill();
}
function linha(x1,y1,x2,y2,cor){
    c.beginPath();
    c.strokeStyle = cor;
    c.moveTo(x1*0.6,y1*0.6)
    c.lineTo(x2*0.6,y2*0.6);
    c.stroke();
}
function texto(txt,x,y,cor){
    c.font = "20px Arial";
    c.fillStyle = cor;
    c.fillText(txt,x*0.6,y*0.6);
}
retang(0,0,75,75,'blue');
retang(425,0,75,75,'red');
retang(425,425,75,75,'black');
retang(425,425,37.5,37.5,'white');
retang(0,425,75,75,'yellow');
retang(37.5,425,37.5,37.5,'white');
texto("Canvas",190,75,'black');

arco(250,250,100,Math.PI,4*Math.PI/3.2,'green','white');
arco(250,250,100,2*Math.PI - Math.PI/4,2*Math.PI,'green','white');
arco(250,250,80,Math.PI,2*Math.PI,'green','white');
arco(250,200,20,0,2*Math.PI,'blue','cyan');
arco(125,375,20,0,2*Math.PI,'green','yellow');
arco(375,375,20,0,2*Math.PI,'green','yellow')
arco(250,500,100,Math.PI,2*Math.PI - Math.PI/2,'green','white');
arco(250,500,75,2*Math.PI - Math.PI/2,2*Math.PI,'green','white');

linha(0,0,250,250,'blue');
linha(500,0,250,250,'red');
linha(250,250,250,500,'black');
retang(175,250,75,75,'red');
retang(0,212.5,37.5,37.5,'cyan');
retang(0,250,37.5,37.5,'cyan');
retang(462.5,231.25,37.5,37.5,'cyan');
linha(0,250,500,250,'green');
arco(250,500,50,Math.PI,2*Math.PI,'green','cyan');