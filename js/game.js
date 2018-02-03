var Furry = require("./furry.js");
var Coin = require("./coin.js");

function Game(){
    this.board = document.querySelectorAll("#board div");
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;

    this.index = function(x, y){
        return x + (y * 10);
    };

    this.showFurry = function(){
        this.hideVisibleFurry();
        this.board[this.index(this.furry.x,this.furry.y)].classList.add("furry-" + this.furry.direction);
    };
    this.showCoin = function(){
        this.board[this.index(this.coin.x,this.coin.y)].classList.add("coin");
    };
    this.startGame = function(){
        var self = this;
        this.idSetInterval = setInterval(function(){self.moveFurry();}, 250);
    };
    this.moveFurry = function (){
        if(this.furry.direction === "right") {
            this.furry.x = this.furry.x + 1;
        } else if (this.furry.direction === "left") {
            this.furry.x = this.furry.x - 1;
        } else if (this.furry.direction === "bottom") {
            this.furry.y = this.furry.y + 1;
        } else if (this.furry.direction === "top") {
            this.furry.y = this.furry.y - 1;
        }
        if(this.gameOver() !== true) {
            this.showFurry();
            this.checkCoinCollision();
        }
    };
    this.hideVisibleFurry = function(){
        var previousFurry = document.querySelector("[class^='furry-']");
        if(previousFurry !== null) {
            previousFurry.className = "";
        }
    };
    this.turnFurry = function(event){
        switch (event.key) {
            case "ArrowLeft":
                this.furry.direction = "left";
                break;
            case "ArrowUp":
                this.furry.direction = "top";
                break;
            case "ArrowRight":
                this.furry.direction = "right";
                break;
            case "ArrowDown":
                this.furry.direction = "bottom";
                break;
        }
    };
    this.checkCoinCollision = function (){
        if(this.furry.x === this.coin.x && this.furry.y === this.coin.y){
            this.board[this.index(this.coin.x,this.coin.y)].classList.remove("coin");
            this.score++;
            document.querySelector("#score strong").innerText = this.score;
            this.coin = new Coin();
            this.showCoin();
        }
    };
    this.gameOver = function(){
        if((this.furry.x < 0 || this.furry.x > 9) || (this.furry.y < 0 || this.furry.y > 9)){
            clearInterval(this.idSetInterval);
            this.hideVisibleFurry();
            var showOver = document.getElementById("over");
            showOver.classList.remove("invisible");
            var showScore = document.querySelector("#over span");
            showScore.innerText = this.score;
            return true;
        }
        return false;
    }
}

module.exports = Game;