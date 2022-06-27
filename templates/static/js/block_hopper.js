//anchura de canvas
var canvasWidth=580;
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



function startGame(){
    /**
   * Funcion que inicializa el juego
   */
    gameCanvas.start();

    //se crea un nuevo jugador
    player= new createPlayer(20,20,8);
    //se asignar le valor del nuevo bloque
    block= new createBlock();

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
   * @returns Devuelve un nuevo jugador
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
        ctx.fillStyle="white";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    this.makeFall=function(){
        /**
         * Funcion que permite dar movimiento al jugador
         */
        if(!isJumping){
        this.y+=fallSpeed;
        fallSpeed+=0.1;

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
            jumpSpeed+=0.1;
        }
    }




}

function updateCanvas(){
    /**
     * Funcion que actualiza el jugador, lo vuelve a dibujar y lo hace caer
     */
    ctx= gameCanvas.context;
    ctx.clearRect(0,0, canvasWidth, canvasHeight);
    player.makeFall();
    player.draw();
    player.jump();
}

function resetJump(){
    /**
     * Funcion que coloca la velocidad de salto en cero, indica que el jugador no está saltando
     */
    jumpSpeed=0;
    isJumping=false;

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
