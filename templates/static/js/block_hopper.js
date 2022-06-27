//anchura de canvas
var canvasWidth=700;
//altura de canvas
var canvasHeight=470;

//variable jugador
var player;

//variable de posición en eje "y"
var playerYPosition=170;

//velocidad de caida
var fallSpeed=0;

//intervalo del canvas
var interval = setInterval(updateCanvas, 15);

//variable booleana para conocer si el jugador esta saltando o no
var isJumping=false;

//velocidad de salto inicial
var jumpSpeed=0;

//variable de bloque
var block;

//puntaje que inicia en cero
var score=0;

//variable que guarda el puntaje
var scoreLabel;



function startGame(){
    /**
   * Funcion que inicializa el juego
   */
    gameCanvas.start();

    //se crea un nuevo jugador
    player= new createPlayer(20,20,8);
    //se asigna el valor del nuevo bloque
    block= new createBlock();
    //se asigna el puntaje de la funcion que crea un puntaje
    scoreLabel = new createScoreLabel(8, 15);


}

var gameCanvas={
    //se crea el elemento canvas
    canvas: document.createElement("canvas"),
    start: function(){
        /**
         * Se establece la anchura y altura declarada anteriormente
        */
        this.canvas.width=canvasWidth;
        this.canvas.height= canvasHeight;
        this.context= this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }

}

function createPlayer(width, height, x){
    /**
   * Funcion que crea la figura o canvas
   * @param {int} width anchura
   * @param {int} height altura
   * @param {int} x posicion c
   */
    this.width=width;
    this.height=height;
    this.x=x;
    this.y=playerYPosition;

    //definicion del color, y parametros del jugador

    this.draw= function(){
         /**
         * Funcion que crea dibuja el jugador
         */
        ctx=gameCanvas.context;
        ctx.fillStyle="yellow";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    this.makeFall=function(){
        /**
         * Funcion que permite dar movimiento al jugador
         */
        if(!isJumping){
            this.y+=fallSpeed;
            fallSpeed+=0.2;

            //llamada a la funcion de parar
            this.stopPlayer();
        }
        
    }

    this.stopPlayer= function(){
        /**
         * Funcion que permite parar o detener el jugador
         */
        var ground=canvasHeight-this.height;
        if(this.y>ground){
            this.y=ground;

        }
    }

    this.jump=function(){
        /**
         * Funcion que permite saltar con velocidad 0.1
         */
        if (isJumping){
            this.y-= jumpSpeed;
            jumpSpeed+=0.2;
        }
    }
}

function createBlock(){
    /**
     * función que permite crear el bloque
     */
    var width= randomNumber(5,30);
    var height=randomNumber(5,120);
    var speed=randomNumber(1,4);

    this.x=canvasWidth;
    this.y=canvasHeight-height;

    this.draw= function(){
        /**
        * Funcion que dibuja el bloque
        */
       ctx=gameCanvas.context;
       ctx.fillStyle="white";
       ctx.fillRect(this.x, this.y, width, height);
   }

   this.attackPlayer=function(){
        /**
        * Funcion de ataque de jugador
        */
        this.x-=speed;
        this.returnToAttackPosition();
   }
   this.returnToAttackPosition=function(){
        /**
        * Funcion de retorna a la posición de ataque
        */
        if(this.x<0){
            width= randomNumber(5,30);
            height=randomNumber(5,120);
            speed=randomNumber(1,4);
            this.x=canvasWidth;
            this.y=canvasHeight-height;
            //el puntaje aumenta
            score++;

        }
   }
}

function detectCollision(){

    /**
     * Función que detecta si hay una colisón con el bloque
     */
    var playerLeft = player.x;
    var playerRight = player.x + player.width;
    var blockLeft = block.x;
    var blockRight = block.x + block.width;

    var playerBottom = player.y + player.height;
    var blockTop = block.y;
    //si se cumple las condicines el juego se detiene
    if(playerRight> blockLeft && playerLeft<blockLeft && playerBottom>blockTop){
        gameCanvas.stop();


    }

}

function createScoreLabel(x,y){
    /**
     * Función que crea el puntaje
     */
    this.score = 0;
    this.x = x;
    this.y = y;
    this.draw = function(){
        /**
         * función que dibuja el puntaje
         */
        ctx = gameCanvas.context;
        ctx.font = "20px Times New Roman";
        ctx.fillStyle = "white";
        ctx.fillText(this.text, this.x,this.y);
    }
}

function updateCanvas(){
    /**
     * Funcion que actualiza el jugador, lo vuelve a dibujar y lo hace caer
     */
    
    //Verifica si hay una colisión
    detectCollision();
    
    ctx= gameCanvas.context;
    ctx.clearRect(0,0, canvasWidth, canvasHeight);
    player.makeFall();
    player.draw();
    player.jump();

    block.draw();
    block.attackPlayer();

    scoreLabel.text= "Puntaje: "+score;
    scoreLabel.draw();
}

function resetJump(){
    /**
     * Funcion que coloca la velocidad de salto en cero, indica que el jugador no está saltando
     */
    jumpSpeed=0;
    isJumping=false;

}

function  randomNumber(max, min){
    /**
     * funcion que genera un numero al azar
     */
    return Math.floor(Math.random()*(max-min+1)+min);
}

document.body.onkeyup=function(e){
    //funcion que asigna la tecla de espacio con la funcion de salto
    if(e.keyCode==32){
        isJumping=true;
        setTimeout(function(){
            resetJump();
        },1000)
    }
}
