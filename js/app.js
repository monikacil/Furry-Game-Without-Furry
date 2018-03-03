var Game = require("./game.js");

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
