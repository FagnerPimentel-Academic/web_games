(function(){
	var cnv = document.querySelector('canvas');
	var ctx = cnv.getContext('2d');

	//Imagens Utilizadas
	var background = new Image();
	background.src = "img/etapa01.png";
	
	var menina = new Image();
	menina.src = "img/boneca.png";

	var monstro = new Image();
	monstro.src = "img/bandido.png";

	var amiga = new Image();
	amiga.src = "img/boneca2.png";

	var faculdade = new Image();
	faculdade.src = "img/universidade.png";

	var calcada1 = new Image();
	calcada1.src = "img/calcada1.png";

	var calcada2 = new Image();
	calcada2.src = "img/calcada2.png";

	var calcada3 = new Image();
	calcada3.src = "img/calcada3.png";

	var calcada4 = new Image();
	calcada4.src = "img/calcada4.png";

	var calcada5 = new Image();
	calcada5.src = "img/calcada5.png";

	var calcada6 = new Image();
	calcada6.src = "img/calcada6.png";

	var calcada7 = new Image();
	calcada7.src = "img/calcada7.png";

	var calcada8 = new Image();
	calcada8.src = "img/calcada8.png";

	var calcada9 = new Image();
	calcada9.src = "img/calcada9.png";

	var calcada10 = new Image();
	calcada10.src = "img/calcada10.png";

	var calcada11 = new Image();
	calcada11.src = "img/calcada11.png";

	var calcada12 = new Image();
	calcada12.src = "img/calcada12.png";

	var calcada1_2etapa = new Image();
	calcada1_2etapa.src = "img/calcada1_etapa2.png";

	var calcada2_2etapa = new Image();
	calcada2_2etapa.src = "img/calcada2_etapa2.png";

	var calcada3_2etapa = new Image();
	calcada3_2etapa.src = "img/calcada3_etapa2.png";

	var calcada4_2etapa = new Image();
	calcada4_2etapa.src = "img/calcada4_etapa2.png";

	var calcada5_2etapa = new Image();
	calcada5_2etapa.src = "img/calcada5_etapa2.png";

	var calcada6_2etapa = new Image();
	calcada6_2etapa.src = "img/calcada6_etapa2.png";

	var calcada7_2etapa = new Image();
	calcada7_2etapa.src = "img/calcada7_etapa2.png";

	var calcada8_2etapa = new Image();
	calcada8_2etapa.src = "img/calcada8_etapa2.png";

	var calcada9_2etapa = new Image();
	calcada9_2etapa.src = "img/calcada9_etapa2.png";

	var calcada10_2etapa = new Image();
	calcada10_2etapa.src = "img/calcada10_etapa2.png";



	var calcada1_4etapa = new Image();
	calcada1_4etapa.src = "img/calcada1_etapa4.png";

	var calcada2_4etapa = new Image();
	calcada2_4etapa.src = "img/calcada2_etapa4.png";

	var calcada3_4etapa = new Image();
	calcada3_4etapa.src = "img/calcada3_etapa4.png";

	var calcada4_4etapa = new Image();
	calcada4_4etapa.src = "img/calcada4_etapa4.png";

	var calcada5_4etapa = new Image();
	calcada5_4etapa.src = "img/calcada5_etapa4.png";

	var calcada6_4etapa = new Image();
	calcada6_4etapa.src = "img/calcada6_etapa4.png";

	var calcada7_4etapa = new Image();
	calcada7_4etapa.src = "img/calcada7_etapa4.png";

	var calcada8_4etapa = new Image();
	calcada8_4etapa.src = "img/calcada8_etapa4.png";

	var calcada9_4etapa = new Image();
	calcada9_4etapa.src = "img/calcada9_etapa4.png";

	var calcada10_4etapa = new Image();
	calcada10_4etapa.src = "img/calcada10_etapa4.png";

	var calcada11_4etapa = new Image();
	calcada11_4etapa.src = "img/calcada11_etapa4.png";

	var calcada12_4etapa = new Image();
	calcada12_4etapa.src = "img/calcada12_etapa4.png";

	var calcada13_4etapa = new Image();
	calcada13_4etapa.src = "img/calcada13_etapa4.png";

	var calcada14_4etapa = new Image();
	calcada14_4etapa.src = "img/calcada14_etapa4.png";

	var calcada15_4etapa = new Image();
	calcada15_4etapa.src = "img/calcada15_etapa4.png";

	var calcada16_4etapa = new Image();
	calcada16_4etapa.src = "img/calcada16_etapa4.png";

	var calcada17_4etapa = new Image();
	calcada17_4etapa.src = "img/calcada17_etapa4.png";

	var calcada18_4etapa = new Image();
	calcada18_4etapa.src = "img/calcada18_etapa4.png";

	var calcada19_4etapa = new Image();
	calcada19_4etapa.src = "img/calcada19_etapa4.png";

	var calcada20_4etapa = new Image();
	calcada20_4etapa.src = "img/calcada20_etapa4.png";

	var calcada21_4etapa = new Image();
	calcada21_4etapa.src = "img/calcada21_etapa4.png";

	var calcada22_4etapa = new Image();
	calcada22_4etapa.src = "img/calcada22_etapa4.png";

	var calcada23_4etapa = new Image();
	calcada23_4etapa.src = "img/calcada23_etapa4.png";

	var calcada24_4etapa = new Image();
	calcada24_4etapa.src = "img/calcada24_etapa4.png";

	var calcada25_4etapa = new Image();
	calcada25_4etapa.src = "img/calcada25_etapa4.png";

	var calcada26_4etapa = new Image();
	calcada26_4etapa.src = "img/calcada26_etapa4.png";

	var calcada27_4etapa = new Image();
	calcada27_4etapa.src = "img/calcada27_etapa4.png";

	var calcada28_4etapa = new Image();
	calcada28_4etapa.src = "img/calcada28_etapa4.png";

	var calcada29_4etapa = new Image();
	calcada29_4etapa.src = "img/calcada29_etapa4.png";

	var calcada30_4etapa = new Image();
	calcada30_4etapa.src = "img/calcada30_etapa4.png";

	var calcada31_4etapa = new Image();
	calcada31_4etapa.src = "img/calcada31_etapa4.png";

	var calcada32_4etapa = new Image();
	calcada32_4etapa.src = "img/calcada32_etapa4.png";




	var cenario3_1 = new Image();
	cenario3_1.src = "img/cenario3_part1.png";

	var item = new Image();
	item.src = "img/lanterna.png";

	var spray = new Image();
	spray.src = "img/spray_pimenta.png";

	var taser = new Image();
	taser.src = "img/taser.png";

	var coracao = new Image();
	coracao.src = "img/coracao.png";

	var metroo = new Image();
	metroo.src = "img/metro.png";

	var metro_trem = new Image();
	metro_trem.src = "img/trem.png";

	var passagem_metro = new Image();
	passagem_metro.src = "img/ticket.png";

	var img_caminhao = new Image();
	img_caminhao.src = "img/caminhao.png";

	var onibus_partida = new Image();
	onibus_partida.src = "img/mini_onibus.png";
	
	var porta_metro = new Image();
	porta_metro.src = "img/porta_metro.png";

	var img_carro = new Image();
	img_carro.src = "img/carro.png";

	var ponto_onibus = new Image();
	ponto_onibus.src = "img/ponto.png";

	//Objetos
	var sprites = [];
	var inimigos = [];
	var cenario = [];
	
	//Fundo do Jogo
	var gameWorld = {
		img: background,
		x: 0,
		y: 0,
		width: 1123,
		height: 793,
		visible: true
	};
	sprites.push(gameWorld);

	var calcada1_fase1 = {
		img: calcada1,
		x: 840,
		y: 570,
		width: 285,
		height: 400,
		visible: true,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada1_fase1);
	cenario.push(calcada1_fase1);

	var calcada2_fase1 = {
		img: calcada2,
		x: 660,
		y: 670,
		width: 197,
		height: 200,
		visible: true,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada2_fase1);
	cenario.push(calcada2_fase1);

	var calcada3_fase1 = {
		img: calcada3,
		x: 355,
		y: 675,
		width: 217,
		height: 200,
		visible: true,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada3_fase1);
	cenario.push(calcada3_fase1);

	var calcada4_fase1 = {
		img: calcada4,
		x: 0,
		y: 373,
		width: 263,
		height: 600,
		visible: true,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada4_fase1);
	cenario.push(calcada4_fase1);

	var calcada5_fase1 = {
		img: calcada5,
		x: 344,
		y: 372,
		width: 223,
		height: 230,
		visible: true,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada5_fase1);
	cenario.push(calcada5_fase1);

	var calcada6_fase1 = {
		img: calcada6,
		x: 649,
		y: 368,
		width: 398,
		height: 130,
		visible: true,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada6_fase1);
	cenario.push(calcada6_fase1);

	var calcada7_fase1 = {
		img: calcada7,
		x: 649,
		y: 495,
		width: 125,
		height: 100,
		visible: true,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada7_fase1);
	cenario.push(calcada7_fase1);

	var calcada8_fase1 = {
		img: calcada8,
		x: 772,
		y: 0,
		width: 264,
		height: 290,
		visible: true,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada8_fase1);
	cenario.push(calcada8_fase1);

	var calcada9_fase1 = {
		img: calcada9,
		x: 653,
		y: 173,
		width: 136,
		height: 115,
		visible: true,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada9_fase1);
	cenario.push(calcada9_fase1);

	var calcada10_fase1 = {
		img: calcada10,
		x: 355,
		y: 0,
		width: 335,
		height: 80,
		visible: true,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada10_fase1);
	cenario.push(calcada10_fase1);

	var calcada11_fase1 = {
		img: calcada11,
		x: 354,
		y: 63,
		width: 213,
		height: 220,
		visible: true,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada11_fase1);
	cenario.push(calcada11_fase1);

	var calcada12_fase1 = {
		img: calcada12,
		x: 1,
		y: 0,
		width: 260,
		height: 285,
		visible: true,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada12_fase1);
	cenario.push(calcada12_fase1);

	var calcada1_fase2 = {
		img: calcada1_2etapa,
		x: 2,
		y: 254,
		width: 215,
		height: 195,
		visible: false,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada1_fase2);
	cenario.push(calcada1_fase2);

	var calcada2_fase2 = {
		img: calcada2_2etapa,
		x: 0,
		y: 530,
		width: 219,
		height: 160,
		visible: false,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada2_fase2);
	cenario.push(calcada2_fase2);

	var calcada3_fase2 = {
		img: calcada3_2etapa,
		x: 290,
		y: 532,
		width: 162,
		height: 400,
		visible: false,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada3_fase2);
	cenario.push(calcada3_fase2);

	var calcada4_fase2 = {
		img: calcada4_2etapa,
		x: 290,
		y: 262,
		width: 214,
		height: 180,
		visible: false,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada4_fase2);
	cenario.push(calcada4_fase2);

	var calcada5_fase2 = {
		img: calcada5_2etapa,
		x: 293,
		y: 0,
		width: 196,
		height: 180,
		visible: false,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada5_fase2);
	cenario.push(calcada5_fase2);

	var calcada6_fase2 = {
		img: calcada6_2etapa,
		x: 577,
		y: 0,
		width: 233,
		height: 180,
		visible: false,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada6_fase2);
	cenario.push(calcada6_fase2);

	var calcada7_fase2 = {
		img: calcada7_2etapa,
		x: 581,
		y: 265,
		width: 231,
		height: 180,
		visible: false,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada7_fase2);
	cenario.push(calcada7_fase2);

	var calcada8_fase2 = {
		img: calcada8_2etapa,
		x: 531,
		y: 535,
		width: 277,
		height: 100,
		visible: false,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada8_fase2);
	cenario.push(calcada8_fase2);

	var calcada9_fase2 = {
		img: calcada9_2etapa,
		x: 523,
		y: 705,
		width: 283,
		height: 100,
		visible: false,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada9_fase2);
	cenario.push(calcada9_fase2);

	var calcada10_fase2 = {
		img: calcada10_2etapa,
		x: 900,
		y: 0,
		width: 225,
		height: 1000,
		visible: false,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada10_fase2);
	cenario.push(calcada10_fase2);



	var calcada1_fase4 = {
		img: calcada1_4etapa,
		x: 1022,
		y: 538,
		width: 99,
		height: 300,
		visible: false,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada1_fase4);
	cenario.push(calcada1_fase4);

	var calcada2_fase4 = {
		img: calcada2_4etapa,
		x: 910,
		y: 538,
		width: 60,
		height: 300,
		visible: false,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada2_fase4);
	cenario.push(calcada2_fase4);

	var calcada3_fase4 = {
		img: calcada3_4etapa,
		x: 722,
		y: 680,
		width: 201,
		height: 200,
		visible: false,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada3_fase4);
	cenario.push(calcada3_fase4);

	var calcada4_fase4 = {
		img: calcada4_4etapa,
		x: 611,
		y: 565,
		width: 245,
		height: 50,
		visible: false,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada4_fase4);
	cenario.push(calcada4_fase4);

	var calcada5_fase4 = {
		img: calcada5_4etapa,
		x: 609,
		y: 625,
		width: 57,
		height: 100,
		visible: false,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada5_fase4);
	cenario.push(calcada5_fase4);

	var calcada6_fase4 = {
		img: calcada6_4etapa,
		x: 857,
		y: 334,
		width: 211,
		height: 150,
		visible: false,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada6_fase4);
	cenario.push(calcada6_fase4);

	var calcada7_fase4 = {
		img: calcada7_4etapa,
		x: 668,
		y: 334,
		width: 187,
		height: 80,
		visible: false,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada7_fase4);
	cenario.push(calcada7_fase4);

	var calcada8_fase4 = {
		img: calcada8_4etapa,
		x: 408,
		y: 408,
		width: 251,
		height: 100,
		visible: false,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada8_fase4);
	cenario.push(calcada8_fase4);

	var calcada9_fase4 = {
		img: calcada9_4etapa,
		x: 730,
		y: 408,
		width: 17,
		height: 150,
		visible: false,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada9_fase4);
	cenario.push(calcada9_fase4);

	var calcada10_fase4 = {
		img: calcada10_4etapa,
		x: 1000,
		y: 151,
		width: 80,
		height: 150,
		visible: false,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada10_fase4);
	cenario.push(calcada10_fase4);

	var calcada11_fase4 = {
		img: calcada11_4etapa,
		x: 964,
		y: 0,
		width: 159,
		height: 150,
		visible: false,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada11_fase4);
	cenario.push(calcada11_fase4);

	var calcada12_fase4 = {
		img: calcada12_4etapa,
		x: 666,
		y: 0,
		width: 322,
		height: 100,
		visible: false,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada12_fase4);
	cenario.push(calcada12_fase4);

	var calcada13_fase4 = {
		img: calcada13_4etapa,
		x: 361,
		y: 150,
		width: 304,
		height: 140,
		visible: false,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada13_fase4);
	cenario.push(calcada13_fase4);

	var calcada14_fase4 = {
		img: calcada14_4etapa,
		x: 476,
		y: 55,
		width: 133,
		height: 100,
		visible: false,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada14_fase4);
	cenario.push(calcada14_fase4);

	var calcada15_fase4 = {
		img: calcada15_4etapa,
		x: 414,
		y: 282,
		width: 251,
		height: 50,
		visible: false,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada15_fase4);
	cenario.push(calcada15_fase4);

	var calcada16_fase4 = {
		img: calcada16_4etapa,
		x: 362,
		y: 570,
		width: 191,
		height: 70,
		visible: false,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada16_fase4);
	cenario.push(calcada16_fase4);

	var calcada17_fase4 = {
		img: calcada17_4etapa,
		x: 492,
		y: 641,
		width: 61,
		height: 150,
		visible: false,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada17_fase4);
	cenario.push(calcada17_fase4);

	var calcada18_fase4 = {
		img: calcada18_4etapa,
		x: 165,
		y: 611,
		width: 198,
		height: 40,
		visible: false,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada18_fase4);
	cenario.push(calcada18_fase4);

	var calcada19_fase4 = {
		img: calcada19_4etapa,
		x: 265,
		y: 706,
		width: 173,
		height: 100,
		visible: false,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada19_fase4);
	cenario.push(calcada19_fase4);

	var calcada20_fase4 = {
		img: calcada20_4etapa,
		x: 76,
		y: 713,
		width: 118,
		height: 100,
		visible: false,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada20_fase4);
	cenario.push(calcada20_fase4);

	var calcada21_fase4 = {
		img: calcada21_4etapa,
		x: 168,
		y: 435,
		width: 127,
		height: 170,
		visible: false,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada21_fase4);
	cenario.push(calcada21_fase4);

	var calcada22_fase4 = {
		img: calcada22_4etapa,
		x: 261,
		y: 355,
		width: 98,
		height: 150,
		visible: false,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada22_fase4);
	cenario.push(calcada22_fase4);

	var calcada23_fase4 = {
		img: calcada23_4etapa,
		x: 261,
		y: 275,
		width: 47,
		height: 100,
		visible: false,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada23_fase4);
	cenario.push(calcada23_fase4);

	var calcada24_fase4 = {
		img: calcada24_4etapa,
		x: 0,
		y: 435,
		width: 96,
		height: 210,
		visible: false,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada24_fase4);
	cenario.push(calcada24_fase4);

	var calcada25_fase4 = {
		img: calcada25_4etapa,
		x: 0,
		y: 355,
		width: 209,
		height: 22,
		visible: false,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada25_fase4);
	cenario.push(calcada25_fase4);

	var calcada26_fase4 = {
		img: calcada26_4etapa,
		x: 190,
		y: 148,
		width: 16,
		height: 227,
		visible: false,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada26_fase4);
	cenario.push(calcada26_fase4);

	var calcada27_fase4 = {
		img: calcada27_4etapa,
		x: 190,
		y: 148,
		width: 111,
		height: 20,
		visible: false,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada27_fase4);
	cenario.push(calcada27_fase4);

	var calcada28_fase4 = {
		img: calcada28_4etapa,
		x: 282,
		y: 71,
		width: 18,
		height: 102,
		visible: false,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada28_fase4);
	cenario.push(calcada28_fase4);

	var calcada29_fase4 = {
		img: calcada29_4etapa,
		x: 282,
		y: 71,
		width: 140,
		height: 18,
		visible: false,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada29_fase4);
	cenario.push(calcada29_fase4);

	var calcada30_fase4 = {
		img: calcada30_4etapa,
		x: 103,
		y: 232,
		width: 79,
		height: 100,
		visible: false,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada30_fase4);
	cenario.push(calcada30_fase4);

	var calcada31_fase4 = {
		img: calcada31_4etapa,
		x: 1,
		y: 39,
		width: 105,
		height: 250,
		visible: false,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(calcada31_fase4);
	cenario.push(calcada31_fase4);











	var cenario3_pt1 = {
		img: cenario3_1,
		x: 0,
		y: 0,
		width: 345,
		height: 135,
		visible: false,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	//sprites.push(cenario3_pt1);
	//cenario.push(cenario3_pt1);

	//Personagem
	var char = {
		img: menina,
		x: 50,
		y: 300,
		width: 50,
		height: 50,
		visible: true,
		pontos: 0,
		vida: 3,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	}
	sprites.push(char);

	//Inimigo
	var inimigo = {
		img: monstro,
		x: 610,
		y: 260,
		width: 60,
		height: 100,
		visible: true,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	};
	sprites.push(inimigo);
	inimigos.push(inimigo);

	//Segundo Inimigo
	var inimigo2 = {
		img: monstro,
		x: 410,
		y: 600,
		width: 60,
		height: 100,
		visible: true,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	};
	sprites.push(inimigo2);
	inimigos.push(inimigo2);

	//Terceiro Inimigo
	var inimigo3 = {
		img: monstro,
		x: 750,
		y: 580,
		width: 60,
		height: 100,
		visible: true,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	};
	sprites.push(inimigo3);
	inimigos.push(inimigo3);

	//Quarto Inimigo
	var inimigo4 = {
		img: monstro,
		x: 980,
		y: 260,
		width: 60,
		height: 100,
		visible: true,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	};
	sprites.push(inimigo4);
	inimigos.push(inimigo4);

	//Amiga
	var friend = {
		img: amiga,
		x: 900,
		y: 600,
		width: 50,
		height: 50,
		pontos: 0,
		vida: 3,
		visible: false,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	};
	sprites.push(friend);

	//Lanterna
	var lanterna = {
		img: item,
		x: 610,
		y: 700,
		width: 50,
		height: 50,
		visible: true,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	};
	sprites.push(lanterna);

	//Spray de Pimenta
	var lanterna2 = {
		img: spray,
		x: 300,
		y: 50,
		width: 50,
		height: 50,
		visible: true,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	};
	sprites.push(lanterna2);

	//Taser
	var lanterna3 = {
		img: taser,
		x: 700,
		y: 50,
		width: 50,
		height: 50,
		visible: true,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	};
	sprites.push(lanterna3);

	//Lanterna
	var lanterna4 = {
		img: item,
		x: 100,
		y: 50,
		width: 50,
		height: 50,
		visible: false,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	};
	sprites.push(lanterna4);

	//Spray de Pimenta
	var lanterna5 = {
		img: spray,
		x: 200,
		y: 50,
		width: 50,
		height: 50,
		visible: false,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	};
	sprites.push(lanterna5);

	//Metro
	var metro = {
		img: metroo,
		x: 1340,
		y: 140,
		width: 360,
		height: 280,
		visible: true,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	};
	sprites.push(metro);

	//Ponto de Onibus
	var ponto_bus = {
		img: ponto_onibus,
		x: 1060,
		y: 547,
		width: 47,
		height: 44,
		visible: true,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	};
	sprites.push(ponto_bus);

	//Porta do Metro
	var metro_porta = {
		img: porta_metro,
		x: 885,
		y: 480,
		width: 16,
		height: 32,
		visible: false,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	};
	sprites.push(metro_porta);

	//Vida Extra
	var vida_extra = {
		img: coracao,
		x: 1050,
		y: 10,
		width: 50,
		height: 50,
		visible: true,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	};
	sprites.push(vida_extra);

	//Trem
	var trem = {
		img: metro_trem,
		x: 1005,
		y: 0,
		width: 100,
		height: 500,
		visible: false,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	};
	sprites.push(trem);

	//Mini Onibus (Partida)
	var mini_onibus = {
		img: onibus_partida,
		x: 1080,
		y: 620,
		width: 32,
		height: 115,
		visible: true,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	};
	sprites.push(mini_onibus);

	//Passagem
	var passagem = {
		img: passagem_metro,
		x: 1280,
		y: 900,
		width: 35,
		height: 20,
		visible: true,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	};
	sprites.push(passagem);

	//Caminhao
	var caminhao = {
		img: img_caminhao,
		x: 300,
		y: 0,
		width: 50,
		height: 200,
		visible: true,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	};
	sprites.push(caminhao);
	cenario.push(caminhao);

	//Carro
	var carro = {
		img: img_carro,
		x: 570,
		y: 50,
		width: 40,
		height: 90,
		visible: true,
		halfWidth: function(){
			return this.width/2;
		},
		halfHeight: function(){
			return this.height/2;
		},
		centerX: function(){
			return this.x + this.halfWidth();
		},
		centerY: function(){
			return this.y + this.halfHeight();
		}
	};
	sprites.push(carro);
	cenario.push(carro);

	//Câmera
	var cam = {
		x: 0,
		y: 0,
		width: cnv.width,
		height: cnv.height,
		leftEdge: function(){
			return this.x + (this.width * 0.25);
		},
		rightEdge: function(){
			return this.x + (this.width * 0.75);
		},
		topEdge: function(){
			return this.y + (this.height * 0.25);
		},
		bottomEdge: function(){
			return this.y + (this.height * 0.75);
		}
	};
	
	//Centralizar a Camera
	cam.x = (gameWorld.width - cam.width)/2;
	cam.y = (gameWorld.height - cam.height)/2;
	

	//Mover o personagem
	var mvLeft = mvRight = mvUp = mvDown = false;
	//Evento para saber quando a tecla é pressionada
	window.addEventListener('keydown',function(e){
		var key = e.keyCode;			
		switch(key){
			case 37:
				mvLeft = true;
				break;
			case 39:
				mvRight = true;
				break;
			case 38:
				mvUp = true;
				break;
			case 40:
				mvDown = true;
				break;
		}
	},false);
		
	//Evento para saber quando se solta a tecla
	window.addEventListener('keyup',function(e){
		var key = e.keyCode;
		switch(key){
			case 37:
				mvLeft = false;
				break;
			case 39:
				mvRight = false;
				break;
			case 38:
				mvUp = false;
				break;
			case 40:
				mvDown = false;
				break;
		}
	},false);


	//Mover a amiga
	var moveAmgLeft = moveAmgRight = moveAmgUp = moveAmgDown = false;
	//Evento para saber quando a tecla é pressionada
	window.addEventListener('keydown',function(e){
		var key = e.keyCode;		
		switch(key){
			case 65:
				moveAmgLeft = true;
				break;
			case 68:
				moveAmgRight = true;
				break;
			case 87:
				moveAmgUp = true;
				break;
			case 83:
				moveAmgDown = true;
				break;
		}
	},false);
		
	//Evento para saber quando se solta a tecla
	window.addEventListener('keyup',function(e){
		var key = e.keyCode;
		switch(key){
			case 65:
				moveAmgLeft = false;
				break;
			case 68:
				moveAmgRight = false;
				break;
			case 87:
				moveAmgUp = false;
				break;
			case 83:
				moveAmgDown = false;
				break;
		}
	},false);
	
	// Funcao para que tudo seja atualizado sempre
	function loop(){
		window.requestAnimationFrame(loop,cnv);
		update();
		render();
	}
	
	//Atualizacoes quando alguma condicao muda
	function update(){
		//Verifica se a personagem tem vidas para que ela possa andar
		if (char.vida > 0 && friend.vida > 0)
		{
			if(mvLeft && !mvRight){
				char.x -= 2;
			}
			if(mvRight && !mvLeft){
				char.x += 2;
			}
			if(mvUp && !mvDown){
				char.y -= 2;
			}
			if(mvDown && !mvUp){
				char.y += 2;
			}	
		}
		
		//Verifica se a amiga tem vidas para que ela possa andar
		if (friend.vida > 0 && char.vida > 0)
		{
			if(moveAmgLeft && !moveAmgRight){
				friend.x -= 2;
			}
			if(moveAmgRight && !moveAmgLeft){
				friend.x += 2;
			}
			if(moveAmgUp && !moveAmgDown){
				friend.y -= 2;
			}
			if(moveAmgDown && !moveAmgUp){
				friend.y += 2;
			}	
		}
		
		//limite do char
		if(char.x < 0){
			char.x = 0;
		}
		if(char.x + char.width > gameWorld.width){
			char.x = gameWorld.width - char.width;
		}
		if(char.y < 0){
			char.y = 0;
		}
		if(char.y + char.height > gameWorld.height){
			char.y = gameWorld.height - char.height;
		}

		//limite da amiga
		if(friend.x < 0){
			friend.x = 0;
		}
		if(friend.x + friend.width > gameWorld.width){
			friend.x = gameWorld.width - friend.width;
		}
		if(friend.y < 0){
			friend.y = 0;
		}
		if(friend.y + friend.height > gameWorld.height){
			friend.y = gameWorld.height - friend.height;
		}
		
		//atualizar a posição da câmera em função do char
		if(char.x < cam.leftEdge()){
			cam.x = char.x - (cam.width * 0.25);
		}
		if(char.x + char.width > cam.rightEdge()){
			cam.x = char.x + char.width - (cam.width * 0.75);
		}
		if(char.y < cam.topEdge()){
			cam.y = char.y - (cam.height * 0.25);
		}
		if(char.y + char.height > cam.bottomEdge()){
			cam.y = char.y + char.height - (cam.height * 0.75);
		}
		
		//limite da câmera
		if(cam.x < 0){
			cam.x = 0;
		}
		if(cam.x + cam.width > gameWorld.width){
			cam.x = gameWorld.width - cam.width;
		}
		if(cam.y < 0){
			cam.y = 0;
		}
		if(cam.y + cam.height > gameWorld.height){
			cam.y = gameWorld.height - cam.height;
		}



		//Aumenta os pontos se pegar a lanterna
		if (lanterna.visible && Math.abs(char.centerX() - lanterna.centerX()) < char.halfWidth() + lanterna.halfWidth() && Math.abs(char.centerY() - lanterna.centerY()) < char.halfHeight() + lanterna.halfHeight())
		{
			char.pontos = char.pontos + 1;
			lanterna.visible = false;
			inimigo.y = 380;
		}

		//Aumenta os pontos se pegar a lanterna
		if (lanterna2.visible && Math.abs(char.centerX() - lanterna2.centerX()) < char.halfWidth() + lanterna2.halfWidth() && Math.abs(char.centerY() - lanterna2.centerY()) < char.halfHeight() + lanterna2.halfHeight())
		{
			char.pontos = char.pontos + 1;
			lanterna2.visible = false;
			inimigo2.y = 400;
		}

		//Aumenta os pontos se pegar a lanterna
		if (lanterna3.visible && Math.abs(char.centerX() - lanterna3.centerX()) < char.halfWidth() + lanterna3.halfWidth() && Math.abs(char.centerY() - lanterna3.centerY()) < char.halfHeight() + lanterna3.halfHeight())
		{
			char.pontos = char.pontos + 1;
			lanterna3.visible = false;
			inimigo4.x = 970;
			inimigo4.y = 150;
		}

		//Aumenta os pontos se pegar a lanterna
		if (lanterna4.visible && Math.abs(char.centerX() - lanterna4.centerX()) < char.halfWidth() + lanterna4.halfWidth() && Math.abs(char.centerY() - lanterna4.centerY()) < char.halfHeight() + lanterna4.halfHeight())
		{
			char.pontos = char.pontos + 1;
			lanterna4.visible = false;
			inimigo2.x = 410;
			inimigo2.y = 280;
		}

		//Aumenta os pontos se pegar a lanterna
		if (lanterna5.visible && Math.abs(char.centerX() - lanterna5.centerX()) < char.halfWidth() + lanterna5.halfWidth() && Math.abs(char.centerY() - lanterna5.centerY()) < char.halfHeight() + lanterna5.halfHeight())
		{
			char.pontos = char.pontos + 1;
			lanterna5.visible = false;
			inimigo.x = 600;
			inimigo.y = 460;
		}

		

		//Aumenta a vida
		if (vida_extra.visible && Math.abs(char.centerX() - vida_extra.centerX()) < char.halfWidth() + vida_extra.halfWidth() && Math.abs(char.centerY() - vida_extra.centerY()) < char.halfHeight() + vida_extra.halfHeight())
		{
			char.vida = char.vida + 1;
			vida_extra.visible = false;
		}

		//Pega o bilhete/passagem do metro
		if (passagem.visible && Math.abs(char.centerX() - passagem.centerX()) < char.halfWidth() + passagem.halfWidth() && Math.abs(char.centerY() - passagem.centerY()) < char.halfHeight() + passagem.halfHeight())
		{
			passagem.visible = false;
		}
		
		
		//Colisoes
		//Loop for para todos os elementos dentro da lista de inimigos, fazendo com que ao tocar no inimigo se perde vidas
		for (var i in inimigos)
		{
			var inmg = inimigos[i];
			if (inmg.visible)
			{
				//Chama funcao dentro do arquivo "collide.js"
				blockRect(char,inmg);
				blockRect(friend,inmg);
			}
		}

		//Loop for para todos os elementos dentro da lista do cenario, no qual bloqueia a passagem do personagem
		for (var i in cenario)
		{
			var cena = cenario[i];
			if (cena.visible)
			{
				//Chama funcao dentro do arquivo "collide.js"
				bloqueio(char, cena);
				bloqueio(friend, cena);
			}
		}


		//Chamar a fase 2 se o personagem chegar no final do canvas na primeira fase
		// "Math.abs" traz o valor absoluto de um número, ou seja, um valor sempre positivo
		
		if (ponto_bus.visible && Math.abs(char.centerX() - ponto_bus.centerX()) < char.halfWidth() + ponto_bus.halfWidth() && Math.abs(char.centerY() - ponto_bus.centerY()) < char.halfHeight() + ponto_bus.halfHeight())
		{	
			char.x = ponto_bus.x;
			char.y = ponto_bus.y;
			char.visible = false;

			//Funcao para o trem se mover a cada 1 segundo
			setTimeout(function()
			{	
				mini_onibus.y += 1; 
			}, 500);

			if (mini_onibus.y > 800)
			{
				document.getElementById("fase").innerHTML = fase_2();
			}
		}


		if (metro_porta.visible && Math.abs(char.centerX() - metro_porta.centerX()) < char.halfWidth() + metro_porta.halfWidth() && Math.abs(char.centerY() - metro_porta.centerY()) < char.halfHeight() + metro_porta.halfHeight())
			{	
				char.x = metro_porta.x;
				char.y = metro_porta.y;
				char.visible = false;

				//Funcao para o trem se mover a cada 1 segundo
				setTimeout(function()
				{	
					trem.y += 3; 
				}, 500);

				if (trem.y > 700)
				{
					document.getElementById("fase").innerHTML = fase_final();
				}
			}

		//Faz o caminhao/carro andarem "um passo" a cada segundo 
		setTimeout(function()
		{	
			caminhao.y += 1; 
			carro.y += 2; 

			//Verifica se o caminhao já sumiu da tela, se for verdade o caminhao reaparece no começo da tela
			if (caminhao.y > 1080)
			{
				caminhao.y = 0; 
			}

			//Verifica se o carro já sumiu da tela, se for verdade o carro reaparece no começo da tela
			if (carro.y > 1080)
			{
				carro.y = 50; 
			}

		}, 1000);

	}

	//Fase 2
	function fase_2()
	{
		background.src = "img/etapa02.png";
		char.visible = true;
		mini_onibus.x = 160;
		mini_onibus.y = 0;
		char.x = 50;
		char.y = 150;
		carro.x = 250;
		carro.y = 0;
		trem.visible = true;
		caminhao.x = 830;
		caminhao.y = 0;

		inimigo.x = 500;
		inimigo.y = 460;

		inimigo2.x = 410;
		inimigo2.y = 180;

		inimigo3.x = 750;
		inimigo3.y = 180;

		lanterna4.visible = true;
		lanterna4.x = 50;
		lanterna4.y = 480;

		lanterna5.visible = true;
		lanterna5.x = 510;
		lanterna5.y = 180;

		lanterna.visible = false;
		lanterna2.visible = false;
		lanterna3.visible = false;

		vida_extra.visible = true;
		vida_extra.x = 50;
		vida_extra.y = 720;

		metro_porta.visible = true;

		calcada1_fase2.visible = true;
		calcada2_fase2.visible = true;
		calcada3_fase2.visible = true;
		calcada4_fase2.visible = true;
		calcada5_fase2.visible = true;
		calcada6_fase2.visible = true;
		calcada7_fase2.visible = true;
		calcada8_fase2.visible = true;
		calcada9_fase2.visible = true;
		calcada10_fase2.visible = true;

		calcada1_fase1.visible = false;
		calcada2_fase1.visible = false;
		calcada3_fase1.visible = false;
		calcada4_fase1.visible = false;
		calcada5_fase1.visible = false;
		calcada6_fase1.visible = false;
		calcada7_fase1.visible = false;
		calcada8_fase1.visible = false;
		calcada9_fase1.visible = false;
		calcada10_fase1.visible = false;
		calcada11_fase1.visible = false;
		calcada12_fase1.visible = false;
		ponto_bus.visible = false;
		cenario3_pt1.visible = true;
		metro.visible = false;
		inimigo4.visible = false;
	}

	//Fase Final
	function fase_final()
	{
		background.src = "img/etapa_final.png";
		char.visible = true;
		friend.visible = true;
		trem.visible = true;
		trem.x = 1050;
		trem.y = -50;
		char.x = 1000;
		char.y = 600;

		calcada1_fase4.visible = true;
		calcada2_fase4.visible = true;
		calcada3_fase4.visible = true;
		calcada4_fase4.visible = true;
		calcada5_fase4.visible = true;
		calcada6_fase4.visible = true;
		calcada7_fase4.visible = true;
		calcada8_fase4.visible = true;
		calcada9_fase4.visible = true;
		calcada10_fase4.visible = true;
		calcada11_fase4.visible = true;
		calcada12_fase4.visible = true;
		calcada13_fase4.visible = true;
		calcada14_fase4.visible = true;
		calcada15_fase4.visible = true;
		calcada16_fase4.visible = true;
		calcada17_fase4.visible = true;
		calcada18_fase4.visible = true;
		calcada19_fase4.visible = true;
		calcada20_fase4.visible = true;
		calcada21_fase4.visible = true;
		calcada22_fase4.visible = true;
		calcada23_fase4.visible = true;
		calcada24_fase4.visible = true;
		calcada25_fase4.visible = true;
		calcada26_fase4.visible = true;
		calcada27_fase4.visible = true;
		calcada28_fase4.visible = true;
		calcada29_fase4.visible = true;
		calcada30_fase4.visible = true;
		calcada31_fase4.visible = true;


		calcada1_fase2.visible = false;
		calcada2_fase2.visible = false;
		calcada3_fase2.visible = false;
		calcada4_fase2.visible = false;
		calcada5_fase2.visible = false;
		calcada6_fase2.visible = false;
		calcada7_fase2.visible = false;
		calcada8_fase2.visible = false;
		calcada9_fase2.visible = false;
		calcada10_fase2.visible = false;

		calcada1_fase1.visible = false;
		calcada2_fase1.visible = false;
		calcada3_fase1.visible = false;
		calcada4_fase1.visible = false;
		calcada5_fase1.visible = false;
		calcada6_fase1.visible = false;
		calcada7_fase1.visible = false;
		calcada8_fase1.visible = false;
		calcada9_fase1.visible = false;
		calcada10_fase1.visible = false;
		calcada11_fase1.visible = false;
		calcada12_fase1.visible = false;
		ponto_bus.visible = false;
		cenario3_pt1.visible = false;
		metro.visible = false;
		lanterna.visible = false;
		lanterna2.visible = false;
		lanterna3.visible = false;
		lanterna4.visible = false;
		lanterna5.visible = false;
		inimigo.visible = false;
		inimigo2.visible = false;
		inimigo3.visible = false;
		inimigo4.visible = false;
		mini_onibus.visible = false;
		metro_porta.visible = false;
		carro.visible = false;
		caminhao.visible = false;
		vida_extra.visible = false;
	}
	
	function render(){
		ctx.save();
		ctx.translate(-cam.x,-cam.y);
		//Loop para que todos os itens na lista "sprites" aparecam na tela se estiverem com o atributo de visivel como verdadeiro
		for(var i in sprites){
			var spr = sprites[i];
			if (spr.visible)
			{
				ctx.drawImage(spr.img,0,0,spr.width,spr.height,spr.x,spr.y,spr.width,spr.height);
			}
		}

		let score = "Itens: " + char.pontos;
		let vidas_personagem = "Vidas: " + char.vida;
		let score_amiga = "Itens: " + friend.pontos;
		let vidas_amiga = "Vidas: " + friend.vida;

		ctx.restore();
		ctx.font = "bold 25px Arial";
		ctx.fillStyle = "blue";
		ctx.fillText(score,50,30);

		ctx.font = "bold 25px Arial";
		ctx.fillStyle = "blue";
		ctx.fillText(vidas_personagem,200,30);

		if (friend.visible)
		{
			ctx.font = "bold 25px Arial";
			ctx.fillStyle = "red";
			ctx.fillText(score_amiga,50,60);

			ctx.font = "bold 25px Arial";
			ctx.fillStyle = "red";
			ctx.fillText(vidas_amiga,200,60);
		}

		if (char.vida == 0 || friend.vida == 0)
		{
			ctx.font = "bold 150px Arial";
			ctx.fillStyle = "red";
			ctx.fillText("GAME OVER",50,250);
		}

		if (char.x <= 200 && char.y >= 650 && friend.x <= 200 && friend.y >= 650)
		{
			ctx.font = "bold 100px Arial";
			ctx.fillStyle = "purple";
			ctx.fillText("PARABÉNS!",150,200);

			ctx.font = "bold 50px Arial";
			ctx.fillStyle = "purple";
			ctx.fillText("VOCÊ CHEGOU NA FACULDADE",50,250);
			ctx.fillText("EM SEGURANÇA",150,300);
		}

	}
	
	loop();
}());