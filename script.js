let gameBoardContainer = document.querySelector('.gameboard')
let gameCell = document.querySelectorAll('.game-cell');

let newGameBtn = document.querySelector('.new-game-btn');
let startGameBtn = document.querySelector('.start-game-btn');

let messageContainer = document.querySelector('.message-container');
let message = document.querySelector('.message');

let characters = document.querySelectorAll('.character');
let markerBtns = document.querySelectorAll('.mark');

let characterSelected = false;
let markerSelected = false;

let playersTurn = true;
let roundWon = false;

let gameActive = true;

let playersName = '';
let playersMark = '';
let computersMark = '';

class Player {
    constructor(name, marker) {
        this.name = name;
        this.marker = marker;
    }
}

let player;
let computer;

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

function makePlayerObjects() {
    if (playersMark == 'x') {
        computersMark = 'o';
    } else {
        computersMark = 'x';
    }

    player = new Player(playersName, playersMark);
    computer = new Player('the bad guy', computersMark);

    console.log('players name is ' + player.name + ' and their mark is ' + player.marker);
    console.log('computers name is ' + computer.name + ' and his mark is ' + computer.marker);
}

function selectCharacter(e) {
    let playersIcon = document.querySelector('#players-icon');
    let characterId = e.target.id;
    let character = '';

    switch (characterId) {
        case 'Beau':
            character = 'bear';
            break;
        case 'Dean':
            character = 'dinosaur';
            break;
        case 'Nelly':
            character = 'ninja';
            break;
        case 'Priscilla':
            character = 'plant-pot';
            break;

    }
    playersIcon.innerHTML = '<img src="/pics/' + character + '.png" id="' + characterId + '"><p>' + characterId + '</p>';

    characterSelected = true;
    playersName = characterId;

}

function selectMarker(e) {
    let markerId = e.target.id;
    markerSelected = true;
    playersMark = markerId;
}

function toggleElementSizeWhenClicked(className) {
    //Get all the matched Elements
    let elements = document.querySelectorAll("." + className);
    //Use an variable to rememeber previous clicked element
    let prevIndex = -1; // 
    // Loop over the list
    elements.forEach(function (item, index) {
        (function (i) { //  A closure is created
            item.addEventListener('click', function () {
                // if any previous element was clicked then transform of that element is none
                if (prevIndex !== -1) {
                    elements[prevIndex].style.transform = "none";
                    elements[prevIndex].style.backgroundColor = 'rgb(127, 157, 255)';
                }
                // change transform of current element
                item.style.transform = "scale(1.3)";
                item.style.backgroundColor = "#a099f8";
                // update prevIndex
                prevIndex = i;
            })
        }(index))

    })
}

function reset() {
    playersTurn = true;
    roundWon = false;
    gameActive = true;

    newGameBtn.style.display = 'none';

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

    message.innerText = player.name + ' starts the game';


    //Logs in the console arrays
    //Remove before publish
    for (let i = 0; i < gameBoardObject.board.length; i++) {
        console.log(gameBoardObject.board[i]);
    }
    for (let i = 0; i < winningConditions.length; i++) {
        console.log(winningConditions[i]);
    }

}

function startingMessage() {
    message.innerHTML = 'Welcome ' + player.name + '!';
    setTimeout(function () {
        message.innerHTML = "<p style='font-size: 15px;'>" + player.name + ", you can start the game. <br> Just click the game board and try to beat the bad guy</p>";
    }, 2000);
}

function currentPlayerTurnMessage(playerName) {
    message.innerText = "It's " + playerName + "s turn";
}

function winningMessage(playersName) {

    if (playersName) {
        message.innerHTML = 'Congratulations! <br> ' + playersName + " wins!";
    } else {
        message.innerHTML = '<p id="smaller-txt">' + player.name + ' loses. </p>' + computer.name + ' wins!';
    }
}

function gameEndedInATieMessage() {
    message.innerHTML = "<p id='smaller-txt'>It's a tie.</p> Game over!"
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
        element.innerHTML = computer.marker;
        updateGameBoardCondition(gameBoardObject.board, id, computer.marker);
        updateGameBoardCondition(winningConditions, id, computer.marker);

        let hasWon = checkPlayStatus();

        if (!hasWon) {
            currentPlayerTurnMessage(player.name);
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
        let hasWon = checkPlayStatus(player.name);
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
            currentPlayerTurnMessage(computer.name);
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
            newGameBtn.style.display = 'block';
            return true;
        }
    }

    let gameIsADraw = checkIfGameIsDraw();

    if (gameIsADraw) {
        newGameBtn.style.display = 'block';
        gameEndedInATieMessage();
        roundWon = true;
        gameActive = false;
    }
    return false;
}

function onlyMarkers(item) {
    return item === 'x' || item === 'o';
}

function checkIfGameIsDraw() {
    let gameboard = gameBoardObject.board;
    let gameIsATie = false;

    let row1 = gameboard[0].every(onlyMarkers);
    let row2 = gameboard[1].every(onlyMarkers);
    let row3 = gameboard[2].every(onlyMarkers);

    if (row1 && row2 && row3 && !roundWon) {
        gameIsATie = true;
    }

    console.log(gameIsATie);
    for (let i = 0; i < gameboard.length; i++) {
        console.log(gameboard[i]);
    }
    return gameIsATie;

}

function handlePlayersChoice(e) {
    let elementId = e.id
    console.log(elementId);
    let gameboard = gameBoardObject.board;

    //Go through arrays and compare elements id to it. 
    //Change arrays elements, so that right player marker is in the array in the right place
    // gameboard object and the bameboard in th escreen now looks the same. 

    updateGameBoardCondition(gameboard, elementId, player.marker);
    updateGameBoardCondition(winningConditions, elementId, player.marker);

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

function startGame() {
    if (characterSelected && markerSelected) {
        document.querySelector('.game-container').style.display = 'block';
        document.querySelector('.starting-screen').style.display = 'none';
    }

}

function changeStartButtonColor(element) {
    if (element) {
        startGameBtn.style.backgroundColor = '#fd9999';
        startGameBtn.style.color = 'black';
    }
}

function addStartButtonHover() {
    if(characterSelected && markerSelected) {
        startGameBtn.addEventListener('mouseenter', function() {
            startGameBtn.style.backgroundColor = 'red';
        })
        
        startGameBtn.addEventListener('mouseleave', function() {
            startGameBtn.style.backgroundColor = '#fd9999';
        })
    }
}


toggleElementSizeWhenClicked('character');
toggleElementSizeWhenClicked('mark');





gameBoardContainer.addEventListener('click', function (e) {
    if (gameActive) {
        currentPlayersTurn(e);
    }
})

newGameBtn.addEventListener('click', function () {
    reset();

})

startGameBtn.addEventListener('click', function () {
    startGame();
    makePlayerObjects();
    startingMessage()
    console.log(playersName + ' ' + playersMark);
})




characters.forEach(function (character) {
    character.addEventListener('click', function (e) {
        selectCharacter(e);
        changeStartButtonColor(markerSelected);
        addStartButtonHover();
    })
})

markerBtns.forEach(function (mark) {
    mark.addEventListener('click', function (e) {
        selectMarker(e);
        changeStartButtonColor(characterSelected);
        addStartButtonHover();
    })
})