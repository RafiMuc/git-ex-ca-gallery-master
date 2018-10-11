'use strict'

function resetGame() {
    // right click menu disable
    function RightMouseDown() { return false; }
    document.oncontextmenu = RightMouseDown;
    gMarkedMinesCount = 0;
    gShownCellsCount = 0;
    gStartTime = undefined;
    gState = {
        isGameOn: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    };
    renderSmiley('sunglasses');
}

function getBestScores() {
    var bestScore = localStorage.getItem('beginner');
    if (bestScore === null) {
        bestScore = ' Be the 1st. to play!'
        gBestBeginner = Infinity;
    }
    else gBestBeginner = +bestScore;
    document.getElementById('best-beginner').innerText = 'Best Score: ' + bestScore;

    var bestScore = localStorage.getItem('medium');
    if (bestScore === null) {
        bestScore = ' Be the 1st. to play!'
        gBestMedium = Infinity;
    }
    else gBestMedium = +bestScore;
    document.getElementById('best-medium').innerText = 'Best Score: ' + bestScore;

    var bestScore = localStorage.getItem('expert');
    if (bestScore === null) {
        bestScore = ' Be the 1st. to play!'
        gBestExpert = Infinity;
    }
    else gBestExpert = +bestScore;
    document.getElementById('best-expert').innerText = 'Best Score: ' + bestScore;

}

function storeScore() {
    switch (gLevel.size) {
        case 4: if (gState.secsPassed < gBestBeginner) {
            localStorage.setItem('beginner', gState.secsPassed);
            document.getElementById('best-beginner').innerText =
                'Best Score: ' + gState.secsPassed;
        }
            break;
        case 6: if (gState.secsPassed < gBestMedium) {
            localStorage.setItem('medium', gState.secsPassed);
            document.getElementById('best-medium').innerText =
                'Best Score: ' + gState.secsPassed;
        }
            break;
        case 8: if (gState.secsPassed < gBestExpert) {
            localStorage.setItem('expert', gState.secsPassed);
            document.getElementById('best-expert').innerText =
                'Best Score: ' + gState.secsPassed;
        }
            break;
        default:
            break;
    }
}

// sets the game level
function setLevel(el) {
    if (el.innerText === 'Beginner') {
        gLevel = { size: 4, mines: 2 };
        el.style.background = 'aqua';
        document.getElementById('medium').style.background = 'lightgray'
        document.getElementById('expert').style.background = 'lightgray'
    }
    else if (el.innerText === 'Medium') {
        gLevel = { size: 6, mines: 5 };
        el.style.background = 'aqua';
        document.getElementById('beginner').style.background = 'lightgray'
        document.getElementById('expert').style.background = 'lightgray'
    }
    else {
        if (el.innerText === 'Expert') {
            gLevel = { size: 8, mines: 15 };
            el.style.background = 'aqua';
            document.getElementById('beginner').style.background = 'lightgray'
            document.getElementById('medium').style.background = 'lightgray'
        }
    }
    initGame();
    return;
}

// Builds the board by setting mines at random locations, and then calling the 
// setMinesNegsCount() Then return the created board
function buildBoard() {
    var board = [];
    for (var i = 0; i < gLevel.size; i++) {
        board[i] = [];
        for (var j = 0; j < gLevel.size; j++) {
            board[i][j] = { minesAroundCount: null, isShown: false, isMine: false, isMarked: false };
        }
    }
    return board;
}

// Sets mines-count to neighbours
function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            board[i][j].minesAroundCount = countNeighbors(board, i, j);
        }
    }
}

function countNeighbors(mat, cellI, cellJ) {
    var neighborsSum = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= mat[i].length) continue;
            if (mat[i][j].isMine) neighborsSum++;
        }
    }
    return neighborsSum;
}

// Print the board as a <table> to the page
function renderBoard(board) {
    renderMarkedMinesCounter()
    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            strHTML += `<td id="cell ${i}-${j}" 
            onmousedown="cellClicked(this,${i},${j},event)"></td>`;
        }
        strHTML += '</tr>';
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}

function createMines(board) {
    for (var i = 0; i < gLevel.mines; i++) {
        var cellI = Math.floor(Math.random() * board.length);
        var cellJ = Math.floor(Math.random() * board.length);
        while (gBoard[cellI][cellJ].isMine || board[cellI][cellJ].isShown) {
            var cellI = Math.floor(Math.random() * board.length);
            var cellJ = Math.floor(Math.random() * board.length);
        }
        gBoard[cellI][cellJ].isMine = true;
    }
}

function renderTime() {
    if (gStartTime === undefined) gStartTime = new Date();
    var currTime = new Date();
    var elTime = document.querySelector('.game-time');
    gState.secsPassed = ((currTime - gStartTime) / 1000).toFixed(3);
    elTime.innerText = gState.secsPassed;
}

function renderMarkedMinesCounter() {
    var el = document.querySelector('.unmarked-mines').innerText =
        (gLevel.mines - gMarkedMinesCount);
}

// update DOM - show cell and mines around count
function showCell(board, elCell, i, j) {
    elCell.style.background = '#e6e6e6';
    if (board[i][j].minesAroundCount > 0 && !board[i][j].isMine) {
        elCell.innerText = board[i][j].minesAroundCount;
        setMineNegsCountColor(elCell, i, j);
    }
    if (!board[i][j].isShown) {
        board[i][j].isShown = true;
        gShownCellsCount++
    }
}

// When user clicks an empty place (0 negs), we need to open not only that cell, 
// but also its neighbors. TIP: At this point you might find yourself giving each 
// cell an id (or a class) that looks like that: "cell-3-2"
function expandShown(board, elCell, cellI, cellJ) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gLevel.size) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (j < 0 || j >= gLevel.size ||
                (board[i][j].isMine) || board[i][j].isShown) continue;
            var elCellAround = document.getElementById(`cell ${i}-${j}`);
            showCell(board, elCellAround, i, j);
            if (board[i][j].minesAroundCount === 0) {
                expandShown(board, elCellAround, i, j);
            }
        }
    }
}

function countEmptyNeighbors(mat, cellI, cellJ) {
    var emptyNeighborsSum = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= mat[i].length) continue;
            if (mat[i][j].minesAroundCount === 0) emptyNeighborsSum++;
        }
    }
    return emptyNeighborsSum;
}

function showBoard(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            var elCell = document.getElementById(`cell ${i}-${j}`);
            elCell.style.background = '#e6e6e6';
            board[i][j].isShown = true;
            if (board[i][j].isMarked) elCell.innerText = '';
            if (board[i][j].isMine) {
                elCell.innerText = MINE;
                elCell.style.color = 'black';
            }
            else if (board[i][j].minesAroundCount > 0) {
                elCell.innerText = board[i][j].minesAroundCount;
                setMineNegsCountColor(elCell, i, j);
            }
        }
    }
}

function setMineNegsCountColor(elCell, i, j) {
    if (elCell.innerText != MINE) {
        switch (gBoard[i][j].minesAroundCount) {
            case 1: elCell.style.color = 'blue';
                break;
            case 2: elCell.style.color = 'green';
                break;
            case 3: elCell.style.color = 'red';
                break;
            case 4: elCell.style.color = 'purple';
                break;
            case 5: elCell.style.color = 'brown';
                break;
            default: elCell.style.color = 'black';
                break;
        }
    }
}

function renderSmiley(state) {
    var el = document.getElementById('smiley');
    switch (state) {
        case 'sad': el.src = 'img/sad.png';
            break;
        case 'smile': el.src = 'img/smiling.png';
            break;
        default: el.src = 'img/sunglasses.png';
            break;
    }
}