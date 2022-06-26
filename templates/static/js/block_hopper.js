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


function startGame(){
    /**
   * Funcion que inicializa el juego
   */
    gameCanvas.start();

    //se crea un nuevo jugador
    player= new createPlayer(20,20,8);

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
        this.y+=fallSpeed;
        fallSpeed+=0.1;
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
}
