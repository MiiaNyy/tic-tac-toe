let gameBoard = document.querySelector('.gameboard')
let gameSquare = document.querySelectorAll('.game-square');

let playersTurn = false;

class Player {
    constructor(name, marker) {
        this.name = name;
        this.marker = marker;
    }
}

let player = new Player('human', 'x');
let computer = new Player('computer', 'o');



gameBoard.addEventListener('click', function(e) {
    let element = e.target;
    element.innerHTML = 'x'
    console.log(element.id);
})