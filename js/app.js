var Game = require("./game.js");

var game = new Game();
game.showFurry();
game.showCoin();
game.startGame();

document.addEventListener('keydown', function(event){
    game.turnFurry(event);
});

var playAgain = document.querySelector("#over button");
playAgain.addEventListener("click", function(){
    window.location.reload();
});
