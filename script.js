let gameBoardContainer = document.querySelector('.gameboard')
let gameCell = document.querySelectorAll('.game-cell');

let startNewGameBtn = document.querySelector('.new-game-btn');

let messageContainer = document.querySelector('.message-container');
let message = document.querySelector('.message');

let playersTurn = true;
let roundWon = false;

let gameActive = true;

class Player {
    constructor(name, marker) {
        this.name = name;
        this.marker = marker;
    }
}

let player = new Player('human', 'x');
let computer = new Player('computer', 'o');

let gameBoardObject = {
    board: [
        ['a1', 'a2', 'a3'],
        ['b1', 'b2', 'b3'],
        ['c1', 'c2', 'c3']
    ],
}

let winningConditions = [
    ['a1', 'a2', 'a3'],
    ['b1', 'b2', 'b3'],
    ['c1', 'c2', 'c3'],
    ['a1', 'b1', 'c1'],
    ['a2', 'b2', 'c2'],
    ['a3', 'b3', 'c3'],
    ['a1', 'b2', 'c3'],
    ['a3', 'b2', 'c1'],
];




function reset() {
    playersTurn = true;
    roundWon = false;
    gameActive = true;

    startNewGameBtn.style.display = 'none';

    winningConditions = [
        ['a1', 'a2', 'a3'],
        ['b1', 'b2', 'b3'],
        ['c1', 'c2', 'c3'],
        ['a1', 'b1', 'c1'],
        ['a2', 'b2', 'c2'],
        ['a3', 'b3', 'c3'],
        ['a1', 'b2', 'c3'],
        ['a3', 'b2', 'c1'],
    ];

    gameBoardObject.board = [
        ['a1', 'a2', 'a3'],
        ['b1', 'b2', 'b3'],
        ['c1', 'c2', 'c3']
    ];

    gameCell.forEach(function (cell) {
        cell.innerText = ''
    })

    message.innerText = 'Human starts the game';


    //Logs in the console arrays
    //Remove before publish
    for (let i = 0; i < gameBoardObject.board.length; i++) {
        console.log(gameBoardObject.board[i]);
    }
    for (let i = 0; i < winningConditions.length; i++) {
        console.log(winningConditions[i]);
    }

}


function currentPlayerTurnMessage(playerName) {
    message.innerText = "It's " + playerName + "s turn";
}

function winningMessage(name) {

    if (name == 'human') {
        message.innerHTML = 'Congratulations! <br> ' + name + " wins!";
    } else {
        message.innerHTML = name + " wins!";
    }
}

function computerSelects() {
    let num = Math.floor(Math.random() * 9);
    let cellId = '';
    switch (num) {
        case 0:
            cellId = 'a1';
            break;
        case 1:
            cellId = 'a2';
            break;
        case 2:
            cellId = 'a3';
            break;
        case 3:
            cellId = 'b1';
            break;
        case 4:
            cellId = 'b2';
            break;
        case 5:
            cellId = 'b3';
            break;
        case 6:
            cellId = 'c1';
            break;
        case 7:
            cellId = 'c2';
            break;
        case 8:
            cellId = 'c3';
            break;
    }

    let element = document.getElementById(cellId);
    handleComputersChoice(element, cellId);

    for (let i = 0; i < gameBoardObject.board.length; i++) {
        console.log(gameBoardObject.board[i]);
    }
}

function handleComputersChoice(element, id) {

    if (element.innerHTML == '') {
        console.log(id + ' element is empty');
        element.innerHTML = 'o';
        updateGameBoardCondition(gameBoardObject.board, id, 'o');
        updateGameBoardCondition(winningConditions, id, 'o');

        let hasWon = checkPlayStatus('computer');

        if (!hasWon) {
            currentPlayerTurnMessage('human');
            switchPlayersTurn();
        } else {
            return
        }
    } else {
        console.log(id + ' was not empty, trying again');
        computerSelects();
    }
}

function humansTurn(e) {
    let element = e.target;
    
    //If the element is empty, display on that element currentPlayers marker and change players turn
    if (element.innerText == '') {
        console.log('elements inner text is empty');
        element.innerText = player.marker;
        handlePlayersChoice(element);
        let hasWon = checkPlayStatus('human');
        if (!hasWon) {
            
            switchPlayersTurn();
            return true
        }
    } else if (element.innerText != '') {
        console.log('element was not empty, trying again');
        //makes sure that nothing further happens until, humans turn is over
        return false
    }
}

function currentPlayersTurn(e) {
    if (playersTurn) {
        let turnIsOver = humansTurn(e);

        //checks that game is active, and humans turn is over
        if (gameActive && turnIsOver) {
            currentPlayerTurnMessage('computer');
            setTimeout(function () {
                computerSelects();
            }, 1500);
        }
    }
}

function switchPlayersTurn() {
    if (playersTurn) {
        playersTurn = false;
    } else {
        playersTurn = true;
    }
}

function checkPlayStatus(player) {
    for (let i = 0; i < winningConditions.length; i++) {
        let row = winningConditions[i];
        let a = row[0];
        let b = row[1];
        let c = row[2];

        if (a == b && b == c) {
            roundWon = true;
            gameActive = false;            
            winningMessage(player);
            startNewGameBtn.style.display = 'block';
            return true;
        }
    }

    return false;
}

function handlePlayersChoice(e) {
    let elementId = e.id
    console.log(elementId);
    let gameboard = gameBoardObject.board;

        //Go through arrays and compare elements id to it. 
    //Change arrays elements, so that right player marker is in the array in the right place
    // gameboard object and the bameboard in th escreen now looks the same. 

    updateGameBoardCondition(gameboard, elementId, 'x');
    updateGameBoardCondition(winningConditions, elementId, 'x');

    console.clear();
    for (let i = 0; i < gameboard.length; i++) {
        console.log(gameboard[i]);
    }
}


function updateGameBoardCondition(arr, elementId, marker) {
    for (let i = 0; i < arr.length; i++) {
        let row = arr[i];

        for (let j = 0; j < row.length; j++) {
            if (elementId == row[j]) {
                row[j] = marker;
            }
        }
    }
}


gameBoardContainer.addEventListener('click', function (e) { 
    if (gameActive) {
        currentPlayersTurn(e);        
    }
})

startNewGameBtn.addEventListener('click', function () {
    reset();
})