let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let bounds = canvas.getBoundingClientRect();
mouseY = 0
mouseX = 0

let bola = {
	x: 150,
	y: 150,
	w: 35,
	h: 35,
	img: new Image(),
	draw: function(){
		this.img.src = "../img/bola.png"
		ctx.drawImage(this.img, this.x,this.y,this.w,this.h)
	}
	
}
function update(){
	ctx.clearRect(0,0,300,300)
	bola.x = mouseX - bola.w/2
	bola.y = mouseY - bola.h/2
	bola.x = Math.max(0,Math.min(canvas.width - bola.w, bola.x))
	bola.y = Math.max(0,Math.min(canvas.height - bola.h, bola.y))
	
	bola.draw()
	requestAnimationFrame(update)
}
update()
document.addEventListener("mousemove", function(){
	mouseX = event.clientX - bounds.left
	mouseY = event.clientY - bounds.top
})
