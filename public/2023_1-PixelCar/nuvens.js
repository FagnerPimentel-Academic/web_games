let cloud1 = document.getElementById("cloud1");
let cloud2 = document.getElementById("cloud2");
let cloud3 = document.getElementById("cloud3");
let cloud4 = document.getElementById("cloud4");

let position1 = window.innerWidth + 100;
let position2 = window.innerWidth - 300;
let position3 = window.innerWidth - 1000;
let position4 = window.innerWidth + 600; 

var speed = 1;
var limit = 0;

setInterval(()=> {
  position1 -= speed;
  position2 -= speed;
  position3 -= speed;
  position4 -= speed;
  
  if (position1 < limit) {
    position1 = window.innerWidth;
  }
  if (position2 < limit) {
    position2 = window.innerWidth;
  }
  if (position3 < limit) {
    position3 = window.innerWidth;
  }
  if (position4 < limit) {
    position4 = window.innerWidth;
  }
  
  cloud1.style.right = position1 + 'px';
  cloud2.style.right = position2 + 'px';
  cloud3.style.right = position3 + 'px';
  cloud4.style.right = position4 + 'px';
}, 60);