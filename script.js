let playerCountBtns = document.querySelectorAll('.player-count-btn');

//Players character and mark containers when two players
let player1CharContainer = document.querySelector('#player1');
let player1MarkContainer = document.querySelector('#player1-mark');

let player2CharContainer = document.querySelector('#player2');
let player2MarkContainer = document.querySelector('#player2-mark');

//Players characters and mark buttons when single player plays
let charactersForSinglePlayer = document.querySelectorAll('.single-player-characters');
let markBtnsForSinglePlayer = document.querySelectorAll('.single-player-mark');

let messageContainer = document.querySelector('.message-container');
let message = document.querySelector('.message');

let gameBoardContainer = document.querySelector('.gameboard');
let gameboardCell = document.querySelectorAll('.game-cell');

let startGameBtn = document.querySelector('.start-game-btn');
let newRoundBtn = document.querySelector('#new-round');
let resetToStartBtn = document.querySelector('#reset');

let playerOne;
let playerTwo;

let playerOneName;
let playerOneMark;

let playerTwoName;
let playerTwoMark;

let playerOneTurn = true;
let roundWon = false;
let gameActive = false;

let twoPlayersPlay = false;

let playerTwoCharacterSelected = false;
let playerTwoMarkSelected = false;

let playerOneCharacterSelected = false;
let playerOneMarkSelected = false;

let gameBoardObj = {
    board: [
        ['a1', 'a2', 'a3'],
        ['b1', 'b2', 'b3'],
        ['c1', 'c2', 'c3']
    ],
    winningConditions: [
        ['a1', 'a2', 'a3'],
        ['b1', 'b2', 'b3'],
        ['c1', 'c2', 'c3'],
        ['a1', 'b1', 'c1'],
        ['a2', 'b2', 'c2'],
        ['a3', 'b3', 'c3'],
        ['a1', 'b2', 'c3'],
        ['a3', 'b2', 'c1'],
    ]
};


class Player {
    constructor(name, marker) {
        this.name = name;
        this.marker = marker;
    }
}


function eventListeners() {
    //selects how many players there are, single or two
    playerCountBtns.forEach(function (button) {
        button.addEventListener('click', function (e) {
            //This changes the view from starting screen to character selectiong, depending how many players there are
            changeStartingScreenView(e);
            if (twoPlayersPlay) {
                twoPlayersPlayEventListeners();
            } else {
                onePlayerPlayEventListeners()
            }
        })
    })

    //Open gameboard to view and if there is single player make player objects 
    startGameBtn.addEventListener('click', function () {
        openGameBoardInView();
        makePlayerObjects('playerOne');
        startingMessage()
    })

    //Reset game to the starting screen
    resetToStartBtn.addEventListener('click', function () {
        window.location.reload();
    })

    newRoundBtn.addEventListener('click', function () {
        newRound();
    })

    //Keeps track of which players turn it is
    gameBoardContainer.addEventListener('click', function (e) {
        if (gameActive) {
            currentPlayersTurn(e);
        }
    })

    //When selecting characters and markers, make selected element larger and everything else smaller
    toggleElementSize('character-player-1', '#ffafcc');
    toggleElementSize('mark-player-1', '#e4c1f9');

    toggleElementSize('character-player-2', '#ffafcc');
    toggleElementSize('mark-player-2', '#e4c1f9');
}

function twoPlayersPlayEventListeners() {
    //selects playerOnes character and makes playerOne object
    player1CharContainer.addEventListener('click', function (e) {
        selectCharacter(e, 'playerOne');
        if (playerOneMarkSelected) {
            makePlayerObjects('playerOne');
        }
    })

    //selects playerOne mark 
    player1MarkContainer.addEventListener('click', function (e) {
        selectMarker(e, 'playerOne');
        if (playerOneCharacterSelected) {
            makePlayerObjects('playerOne');
        }
    })

    //selects playerTwo character and makes playerTwo object
    player2CharContainer.addEventListener('click', function (e) {
        selectCharacter(e, 'playerTwo');
        if (playerTwoMarkSelected) {
            makePlayerObjects('playerTwo');
        }
    })

    //Selects playerTwo mark
    player2MarkContainer.addEventListener('click', function (e) {
        selectMarker(e, 'playerTwo');
        if (playerTwoCharacterSelected) {
            makePlayerObjects('playerTwo');
        }
    })
}

function onePlayerPlayEventListeners() {
    charactersForSinglePlayer.forEach(function (character) {
        character.addEventListener('click', function (e) {
            selectCharacter(e, 'playerOne');
        })
    })

    markBtnsForSinglePlayer.forEach(function (mark) {
        mark.addEventListener('click', function (e) {
            selectMarker(e, 'playerOne');
        })
    })
}


function makePlayerObjects(playerNumber) {
    //if there is single player
    if (playerNumber == 'playerOne' && !twoPlayersPlay) {
        makeObjForSinglePlayer();
    }
    //Two players play
    if (twoPlayersPlay) {
        makeObjForTwoPlayers(playerNumber)
    }
}

function makeObjForSinglePlayer() {
    playerTwoName = 'the bad guy';

    if (playerOneMark == 'x') {
        playerTwoMark = 'o';
    } else {
        playerTwoMark = 'x'
    }

    playerOne = new Player(playerOneName, playerOneMark);
    playerTwo = new Player(playerTwoName, playerTwoMark);
}

function makeObjForTwoPlayers(playerNumber) {
    if (playerNumber == 'playerOne') {
        playerOne = new Player(playerOneName, playerOneMark);
    } else if (playerNumber == 'playerTwo') {
        playerTwo = new Player(playerTwoName, playerTwoMark);
    }
}


function selectCharacter(e, playerNumber) {
    let characterId = e.target.id;
    let character = '';

    //checks what user clicked
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
        case 'Sabrina':
            character = 'sparkly';
            break;
        case 'Bean':
            character = 'bad-guy'
            break;
    }
    charactersSelected(playerNumber, characterId);
    displayPlayersIcon(playerNumber, character, characterId);
    changeStartButtonColor();
}

function charactersSelected(playerNumber, characterId) {
    if (playerNumber == 'playerOne') {
        playerOneCharacterSelected = true;
        playerOneName = characterId;
    } else if (playerNumber == 'playerTwo') {
        playerTwoCharacterSelected = true;
        playerTwoName = characterId;
    }
}

function selectMarker(e, playerNumber) {
    let markerId = e.target.id;

    if (playerNumber == 'playerOne') {
        playerOneMark = markerId;
        playerOneMarkSelected = true;
    } else {
        playerTwoMark = markerId
        playerTwoMarkSelected = true;
    }
    changeStartButtonColor();
}

function selectPlayersIcon(playerNumber) {
    if (playerNumber == 'playerOne') {
        return document.querySelector('#players-icon');
    } else {
        return document.querySelector('#player2-icon');
    }
}

//if viewport is wider than 450px, icon containers and image can be bigger, otherwise make them smaller
function changeIconSizeWhenSmallerScreen(icon) {
    let intViewportWidth = window.innerWidth;
    let imageSize;

    if (intViewportWidth > 450) {
        console.log(intViewportWidth);
        icon.style.width = '110px';
        icon.style.height = '110px';
        imageSize = 75;
    } else {
        console.log(intViewportWidth);
        icon.style.width = '90px';
        icon.style.height = '90px';
        imageSize = 60;
    }
    return imageSize;
}

function displayPlayersIcon(playerNumber, character, characterId) {
    let playersIcon = selectPlayersIcon(playerNumber);
    
    if (twoPlayersPlay) {
        let imageSize = changeIconSizeWhenSmallerScreen(playersIcon);
        if (playerNumber == 'playerOne') {
            playersIcon.innerHTML = '<span>Player 1</span>';
        } else {
            playersIcon.innerHTML = '<span>Player 2</span>';
        }
        playersIcon.innerHTML += '<img style="height:' + imageSize + 'px; width:' + imageSize + 'px; " src="pics/' + character + '.png" id="' + characterId + '"><p>' + characterId + ' the ' + character + '</p>';
        //there is only single player
    } else {
        playersIcon.innerHTML = '<img src="pics/' + character + '.png" id="' + characterId + '"><p>' + characterId + ' the ' + character + '</p>';
    }
}

function currentPlayersTurn(e) {
    if (twoPlayersPlay && playerOneTurn) {
        playersTurn(e, 'playerOne');
        if (gameActive) {
            currentPlayerTurnMessage(playerTwo.name);
        }
    } else if (twoPlayersPlay && !playerOneTurn) {
        playersTurn(e, 'playerTwo');
        if (gameActive) {
            currentPlayerTurnMessage(playerOne.name);
        }
    }
    if (!twoPlayersPlay && playerOneTurn) {
        currentPlayerIsComputer(e);
    }
}


function playersTurn(e, playerNumber) {
    let element = e.target;
    let playerTurn = determineWhosTurn(playerNumber);

    //If the element is empty, display on that element currentPlayers marker and change players turn
    if (element.innerText == '') {
        element.innerText = playerTurn.marker;
        handlePlayersChoice(element, playerNumber);
        let hasWon = checkPlayStatus(playerTurn.name);
        if (!hasWon) {
            switchPlayersTurn();
            return true
        }
    } else if (element.innerText != '') {
        //makes sure that nothing further happens until, players turn is over
        return false
    }
}

function determineWhosTurn(playerNumber) {
    if (playerNumber == 'playerOne') {
        return playerOne;
    } else {
        return playerTwo;
    }
}

function handlePlayersChoice(e, playerNumber) {
    let elementId = e.id
    let playerTurn = determineWhosTurn(playerNumber);
    let gameboard = gameBoardObj.board;

    //Go through arrays and compare elements id to it. 
    //Change arrays elements, so that right player marker is in the array in the right place
    // gameboard object and the bameboard in the screen now looks the same. 

    updateGameBoardCondition(gameboard, elementId, playerTurn.marker);
    updateGameBoardCondition(gameBoardObj.winningConditions, elementId, playerTurn.marker);
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
}

function handleComputersChoice(element, id) {
    if (element.innerHTML == '') {
        element.innerHTML = playerTwo.marker;
        updateGameBoardCondition(gameBoardObj.board, id, playerTwo.marker);
        updateGameBoardCondition(gameBoardObj.winningConditions, id, playerTwo.marker);

        let hasWon = checkPlayStatus();
        if (!hasWon) {
            currentPlayerTurnMessage(playerOne.name);
            switchPlayersTurn();
        }
    } else {
        console.log(id + ' was not empty, trying again');
        computerSelects();
    }
}

function currentPlayerIsComputer(e) {
    let turnIsOver = playersTurn(e, 'playerOne');
    //checks that game is active, and humans turn is over
    if (gameActive && turnIsOver) {
        currentPlayerTurnMessage(playerTwo.name);
        setTimeout(function () {
            computerSelects();
        }, 1500);
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

function checkPlayStatus(player) {
    let winningCondition = gameBoardObj.winningConditions;

    for (let i = 0; i < winningCondition.length; i++) {
        let row = winningCondition[i];
        let a = row[0];
        let b = row[1];
        let c = row[2];

        if (a == b && b == c) {
            handlePlayerWin(player);
            return true;
        }
    }
    checkIfGameIsDrawn();
    return false;
}

function handlePlayerWin(player) {
    roundWon = true;
    gameActive = false;
    winningMessage(player);
    newRoundBtn.style.display = 'inline-block';
    resetToStartBtn.style.display = 'inline-block';
}

function checkIfGameIsDrawn() {
    let gameIsADraw = isGameDraw();

    if (gameIsADraw) {
        newRoundBtn.style.display = 'inline-block';
        resetToStartBtn.style.display = 'inline-block';
        gameEndedInATieMessage();
        roundWon = true;
        gameActive = false;
    }
}

function switchPlayersTurn() {
    if (playerOneTurn) {
        playerOneTurn = false;
    } else {
        playerOneTurn = true;
    }
}



function onlyMarkers(item) {
    return item === 'x' || item === 'o' || item === 'c' || item === 'v';
}

function isGameDraw() {
    let gameboard = gameBoardObj.board;
    let gameIsATie = false;

    let row1 = gameboard[0].every(onlyMarkers);
    let row2 = gameboard[1].every(onlyMarkers);
    let row3 = gameboard[2].every(onlyMarkers);

    if (row1 && row2 && row3 && !roundWon) {
        gameIsATie = true;
    }
    return gameIsATie;
}


function newRound() {
    playerOneTurn = true;
    roundWon = false;
    gameActive = true;

    newRoundBtn.style.display = 'none';
    resetToStartBtn.style.display = 'none';

    gameBoardObj = {
        board: [
            ['a1', 'a2', 'a3'],
            ['b1', 'b2', 'b3'],
            ['c1', 'c2', 'c3']
        ],
        winningConditions: [
            ['a1', 'a2', 'a3'],
            ['b1', 'b2', 'b3'],
            ['c1', 'c2', 'c3'],
            ['a1', 'b1', 'c1'],
            ['a2', 'b2', 'c2'],
            ['a3', 'b3', 'c3'],
            ['a1', 'b2', 'c3'],
            ['a3', 'b2', 'c1'],
        ]
    };
    //Empty the gameboard
    gameboardCell.forEach(function (cell) {
        cell.innerText = ''
    })
    message.innerText = playerOne.name + ' starts the game';
}


function startingMessage() {
    if (twoPlayersPlay) {
        message.innerHTML = 'Welcome <br> ' + playerOne.name + ' and ' + playerTwo.name + '!';
    } else {
        message.innerHTML = 'Welcome <br>' + playerOne.name + '!';
    }
    setTimeout(function () {
        gameActive = true;
        message.innerHTML = "<p style='font-size: 23px; margin-top: 5px; padding-top: 0px'>" + playerOne.name + ", you start the game. <br> Try to beat " + playerTwo.name + "</p>";
    }, 1700);
}

function currentPlayerTurnMessage(playerName) {
    message.innerHTML = 'It\'s ' + playerName + 's turn';
}

function winningMessage(playerOneName) {
    if (!twoPlayersPlay) {
        if (playerOneName) {
            message.innerHTML = 'Congratulations! <br> ' + playerOneName + " wins!";
        } else {
            message.innerHTML = '<p id="smaller-txt">' + playerOne.name + ' loses. </p>' + playerTwo.name + ' wins!';
        }
    } else {
        message.innerHTML = 'Congratulations! <br> ' + playerOneName + " wins!";
    }
}

function gameEndedInATieMessage() {
    message.innerHTML = "<p id='smaller-txt'>It's a tie.</p> Game over!"
}


//When choosing characters, the clicked character gets bigger and everybody else remains smaller
function toggleElementSize(className, color) {
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
                    elements[prevIndex].style.backgroundColor = color;
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

function openGameBoardInView() {
    if (playerOneCharacterSelected && playerOneMarkSelected) {
        document.querySelector('.game-container').style.display = 'block';
        document.querySelector('.single-player-container').style.display = 'none';
        startGameBtn.style.display = 'none';
        if (twoPlayersPlay) {
            document.querySelector('.two-players-container').style.display = 'none';
        }
    }
}

function changeStartButtonColor() {
    if (playerOneCharacterSelected && playerOneMarkSelected && playerTwoCharacterSelected && playerTwoMarkSelected) {
        startGameBtn.style.backgroundColor = '#84dcc6';
        startGameBtn.style.color = 'black';
        addStartButtonHover();
    }
}

function addStartButtonHover() {
    startGameBtn.addEventListener('mouseenter', function () {
        startGameBtn.style.backgroundColor = '#a7e9d8';
        startGameBtn.style.transform = 'scale(1.1)';
    })

    startGameBtn.addEventListener('mouseleave', function () {
        startGameBtn.style.backgroundColor = '#84dcc6';
        startGameBtn.style.transform = 'none';
    })
}

function changeStartingScreenView(e) {
    startGameBtn.style.display = 'block';
    if (e.target.id != 'one') {
        twoPlayersPlay = true;
        console.log('two players');
        document.querySelector('.starting-screen').style.display = 'none';
        document.querySelector('.two-players-container').style.display = 'block';
    } else {
        playerTwoCharacterSelected = true;
        playerTwoMarkSelected = true;
        document.querySelector('.starting-screen').style.display = 'none';
        document.querySelector('.two-players-container').style.display = 'none';
        document.querySelector('.single-player-container').style.display = 'block';
    }
}

eventListeners();