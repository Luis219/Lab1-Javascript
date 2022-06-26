//anchura de canvas
var canvasWidth=580;
//altura de canvas
var canvasHeight=470;

function startGame(){
    /**
   * Funcion que inicializa el juego
   */
    gameCanvas.start();
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