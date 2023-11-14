  
var canvas = document.getElementById('codes');
var ctx = canvas.getContext('2d');

var w = canvas.width = document.body.offsetWidth;
var h = canvas.height = document.body.offsetHeight;


ctx.fillStyle = '#000';
ctx.fillRect(0, 0, w, h);

var cols = Math.floor(w / 20) + 1;
var ypos = Array(cols).fill(0);

function matrix () {

    ctx.fillStyle = '#0001';
    ctx.fillRect(0, 0, w, h);
  
 
    ctx.fillStyle = '#0f0';
    ctx.font = '15pt monospace';

    ypos.forEach((y, ind) => {
      // gerador de coisas aleatorias
      var text = String.fromCharCode(Math.random() * 128);
  
     
      var x = ind * 20;
      
      ctx.fillText(text, x, y);
  
      
      if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
     
      else ypos[ind] = y + 20;
    });
  }
  

  setInterval(matrix, 50);