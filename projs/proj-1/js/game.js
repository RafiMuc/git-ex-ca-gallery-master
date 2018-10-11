'use strict'
var gBoard; // object matrix {minesAroundCount, isShown, isMine, isMarked}
var gLevel; // object {SIZE, MINES}: Beginner 4*4; 2 mines, Medium 6*6; 5 mines, Expert 8*8; 15 mines.
var gState; // current state object {isGameOn, shownCount, markedCount, secsPassed}
var gGameTimer;
var gStartTime;
var gMarkedMinesCount;
var gShownCellsCount;
var gBestBeginner;
var gBestMedium;
var gBestExpert;

const MINE = '☢';
const FLAG = '⚐';

// This is called when page loads
function initGame() {
    if (gLevel === undefined) gLevel = { size: 4, mines: 2 };
    resetGame();
    getBestScores();
    gBoard = buildBoard();
    renderBoard(gBoard);
}

// Called when a cell (td) is clicked
function cellClicked(elCell, cellI, cellJ, ev) {
    if (!gState.isGameOn) {
        // disable mines & show the clicked cell and its' surrounding cells
        for (var i = cellI - 1; i <= cellI + 1; i++) {
            if (i < 0 || i >= gLevel.size) continue;
            for (var j = cellJ - 1; j <= cellJ + 1; j++) {
                if (j < 0 || j >= gLevel.size) continue;
                gBoard[i][j].isShown = true;
            }
        }
        createMines(gBoard);
        setMinesNegsCount(gBoard);
        // changing isShown property back to false 
        for (var i = cellI - 1; i <= cellI + 1; i++) {
            if (i < 0 || i >= gLevel.size) continue;
            for (var j = cellJ - 1; j <= cellJ + 1; j++) {
                if (j < 0 || j >= gLevel.size) continue;
                gBoard[i][j].isShown = false;
            }
        }
        expandShown(gBoard, elCell, cellI, cellJ);
        gState.isGameOn = true;
        gGameTimer = setInterval(renderTime, 100)
        return;
    }
    if (ev.button === 2 && !gBoard[cellI][cellJ].isShown) {
        if (cellMarked(elCell)) {
            gBoard[cellI][cellJ].isMarked = true;
            checkGameOver();
        }
        else {
            gBoard[cellI][cellJ].isMarked = false;
        }
        return;
    }
    if (gBoard[cellI][cellJ].isMarked) return;
    if (gBoard[cellI][cellJ].isMine) {
        renderSmiley('sad');
        gameOver();
        elCell.style.background = 'red';
        return;
    }
    if (gBoard[cellI][cellJ].minesAroundCount != 0) {
        showCell(gBoard, elCell, cellI, cellJ);
        renderSmiley('smile');
        checkGameOver();
    }
    else {
        expandShown(gBoard, elCell, cellI, cellJ);
        checkGameOver();
    }
}

// Called on right click to mark a cell as suspected to have a mine
function cellMarked(elCell) {
    if (elCell.innerText != FLAG) {
        elCell.innerText = FLAG;
        elCell.classList.add('flag');
        gMarkedMinesCount++;
        renderMarkedMinesCounter();
        return true;
    }
    else {
        elCell.innerText = '';
        gMarkedMinesCount--
        renderMarkedMinesCounter();
        return false;
    }
}

// Game ends when all mines are marked and all the other cells are shown
function checkGameOver() {
    if ((gMarkedMinesCount != gLevel.mines) ||
        ((gMarkedMinesCount + gShownCellsCount) != (gBoard.length * gBoard.length))) {
        return;
    }
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            if (gBoard[i][j].isMine && !gBoard[i][j].isMarked) return;
        }
    }
    renderSmiley('smile');
    storeScore();
    gameOver();
}

function gameOver() {
    clearInterval(gGameTimer);
    showBoard(gBoard);
}

