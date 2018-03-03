/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Game = __webpack_require__(1);

var game = new Game();

var startSection = document.querySelector(".startSection");
var startGame = document.querySelector("#start");

startGame.addEventListener("click", function(){
    startSection.classList.add("invisible");
    game.showFurry();
    game.showCoin();
    game.startGame();
});

document.addEventListener('keydown', function(event){
    game.turnFurry(event);
});

var playAgain = document.querySelector("#over button");
playAgain.addEventListener("click", function(){
    document.querySelector("#over").classList.add("invisible");
    game.clearBoard();
    game = new Game();
    game.showFurry();
    game.showCoin();
    game.startGame();

});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var Furry = __webpack_require__(2);
var Coin = __webpack_require__(3);

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
            do{
                this.coin = new Coin();
            }
            while(this.furry.x === this.coin.x && this.furry.y === this.coin.y);
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
            var playAgain = document.querySelector("#over button");
            playAgain.focus();
            return true;
        }
        return false;
    };
    this.clearBoard = function(){
        for(var i = 0; i < this.board.length; i++){
            this.board[i].className = "";
        }
    }
}

module.exports = Game;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

function Furry(){
    this.x = 0;
    this.y = 0;
    this.direction = "bottom";
}

module.exports = Furry;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

function Coin(){
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
}
module.exports = Coin;

/***/ })
/******/ ]);