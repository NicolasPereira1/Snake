let canvas = document.getElementById("canvas");
let contexte = canvas.getContext("2d");
let gameover = false;
let appuye = false;
let pause = false;
const longueur = 20;
let taille = 0;
let position = [[241,241],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur],[-longueur,-longueur]];
let xSpeed = 0;
let ySpeed = 0;
let xFood;
let yFood;

function setup(){
	//Background
	contexte.fillStyle = "#444";
	contexte.fillRect(0,0,500,500);

	//Snake
	let i;
	contexte.fillStyle = "#fff";
	for(i=0; i<taille; i++){
		contexte.fillRect(position[i][0],position[i][1],longueur-1,longueur-1);
	}

	//Food
	contexte.fillStyle = "#f00";
	contexte.fillRect(xFood,yFood,longueur-1,longueur-1);

	//Grid
	for(i = 1; i < 501; i = i + longueur){
		contexte.moveTo(i,0);
		contexte.lineTo(i,500);
	}
	for(i = 1; i < 501; i = i + longueur){
		contexte.moveTo(0,i);
		contexte.lineTo(500,i);
	}

	contexte.stroke();
}

function update(){
	if(mordu())gameover = true;
	if(position[0][0] + xSpeed*longueur > 0
	&& position[0][0] + xSpeed*longueur < 500
	&& !gameover){
		let i;
		for(i=taille-1; i>0; i--){
			position[i][0] = position[i-1][0];
		}
		position[0][0] = position[0][0] + xSpeed*longueur;
	} else gameover = true;
	if(position[0][1] + ySpeed*longueur > 0
	&& position[0][1] + ySpeed*longueur < 500
	&& !gameover){
		for(i=taille-1; i>0; i--){
			position[i][1] = position[i-1][1];
		}
		position[0][1] = position[0][1] + ySpeed*longueur;
	} else gameover = true;
	if(position[0][0] === xFood && position[0][1] === yFood)addFood();
	setup();
	if(gameover)alert("Game Over \nVotre score est : " + (taille-1));
}

function mordu () {
	let i;
	for(i=0;i<taille;i++){
		let j;
		for(j=i+1;j<taille;j++){
			if(position[i][0] === position[j][0] && position[i][1] === position[j][1]) return 1;
		}
	}
	return 0;
}

function refresh(){
	location.reload();
}

function paused() {
	if(!pause){
		document.getElementById("pause").innerHTML = "Reprendre";
		pause = true;
	}else{
	 	document.getElementById("pause").innerHTML = "Pause";
		pause = false;
	}
}

function addFood(){
	xFood = 1 + parseInt(Math.random()*25)*20;
	yFood = 1 + parseInt(Math.random()*25)*20;
	taille = taille + 1;
	document.getElementById("score").innerHTML = "Votre score est : " + (taille-1);
}

function dir(xd, yd){
	xSpeed = xd;
	ySpeed = yd;
}

//KeyCodes
window.addEventListener( "keydown", doKeyDown, true);
function doKeyDown(e){
	if(!appuye){
		switch(e.keyCode) {
			case 38:
			case 90:
				if(xSpeed !=  0 || ySpeed !=  1)dir(0,-1);
			break;
			case 39:
			case 68:
				if(xSpeed != -1 || ySpeed !=  0)dir(1,0);
			break;
			case 40:
			case 83:
				if(xSpeed !=  0 || ySpeed != -1)dir(0,1);
			break;
			case 37:
			case 81:
				if(xSpeed !=  1 || ySpeed !=  0)dir(-1,0);
			break;
			case 32:
				paused();
			break;
			default:
		}
		appuye = true;
	}
}


//Lunch
addFood();
setInterval(function(){
	if(!gameover && !pause) update();
	appuye = false;
},150);
