const WALL = 'WALL';
const FLOOR = 'FLOOR';
const BALL = 'BALL';
const GAMER = 'GAMER';
const GLUE = 'GLUE'

const GAMER_IMG = '<img src="img/gamer.png">';
const BALL_IMG = '<img src="img/ball.png">';
const GLUE_IMG = '<img src="img/glue.png">';

var audioEatBall = new Audio('sound/eat.mp3');
var audioGameOver = new Audio('sound/win.mp3');

var gGamerPos;
var gBoard;
var gCollectedBalls;
var gBallsOnBoard;
var gAddBallsInterval;
var gAddGlueInterval;
var gStartPauseOnGlue;

function init() {
	gCollectedBalls = 0;
	gBallsOnBoard = 0;
	gStartPauseOnGlue = 0;
	gGamerPos = { i: 2, j: 5 };
	gBoard = buildBoard();
	renderBoard(gBoard);

	for (var i = 0; i < 3; i++) {
		addBall();
	}
	gAddBallsInterval = setInterval(addBall, 3000);
	gAddGlueInterval = setInterval(addGlue, 4000);
}

function addBall() {
	var pos = getRandomEmptyPos();
	gBoard[pos.i][pos.j].gameElement = BALL;
	renderCell(pos, BALL_IMG);
	gBallsOnBoard++;
}

function addGlue() {
	var pos = getRandomEmptyPos();
	gBoard[pos.i][pos.j].gameElement = GLUE;
	renderCell(pos, GLUE_IMG);
	setTimeout(removeGlue, 3000);
	function removeGlue() {
		if (gGamerPos.i != pos.i || gGamerPos.j != pos.j) {
			gBoard[pos.i][pos.j].gameElement = FLOOR;
			renderCell(pos, '');
		}
	}
}

function getRandomEmptyPos() {
	if (gBallsOnBoard === 10) gameOver();
	var pos = {
		i: Math.floor(Math.random() * (gBoard.length - 2)) + 1,
		j: Math.floor(Math.random() * (gBoard[0].length - 2)) + 1
	};
	while (gBoard[pos.i][pos.j].gameElement) {
		var pos = {
			i: Math.floor(Math.random() * (gBoard.length - 2)) + 1,
			j: Math.floor(Math.random() * (gBoard[0].length - 2)) + 1
		};
	}
	return pos;
}

function buildBoard() {
	// Create the Matrix
	var board = new Array(10);
	for (var i = 0; i < board.length; i++) {
		board[i] = new Array(12);
	}

	// Put FLOOR everywhere and WALL at edges
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			var cell = { type: FLOOR, gameElement: null };
			// Place Walls at edges
			if ((i === 0 || i === board.length - 1 ||
				j === 0 || j === board[0].length - 1) &&
				(i != 5 && j != 5)) {
				cell.type = WALL;
			}
			board[i][j] = cell;
		}
	}
	// Place the gamer
	board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;

	// Place the Balls
	//board[3][8].gameElement = BALL;
	//board[7][4].gameElement = BALL;

	console.log(board);
	return board;
}

// Render the board to an HTML table
function renderBoard(board) {
	//update DOM
	var elBtn = document.querySelector('.btn');
	elBtn.style.display = 'none';
	var elBoard = document.querySelector('.board');
	var strHTML = '';
	var elCollectedBalls = document.querySelector('.collected-balls');
	elCollectedBalls.innerText = 'Collected Balls: ';

	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n';
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j];

			var cellClass = getClassName({ i: i, j: j })

			if (currCell.type === FLOOR) cellClass += ' floor';
			else if (currCell.type === WALL) cellClass += ' wall';

			strHTML += '\t<td class="cell ' + cellClass + '"  onclick="moveTo(' + i + ',' + j + ')" >\n';

			if (currCell.gameElement === GAMER) {
				strHTML += '\t' + GAMER_IMG + '\n';
			} else if (currCell.gameElement === BALL) {
				strHTML += BALL_IMG;
			}

			strHTML += '\t</td>\n';
		}
		strHTML += '</tr>\n';
	}
	console.log('strHTML is:');
	console.log(strHTML);
	elBoard.innerHTML = strHTML;
}

// Move the player to a specific location
function moveTo(i, j) {

	var targetCell = gBoard[i][j];
	if (targetCell.type === WALL ||
		((gStartPauseOnGlue > 0) && ((new Date() - gStartPauseOnGlue) < 3000)) ||
		gAddBallsInterval === undefined)
		return;

	// Calculate distance to make sure we are moving to a neighbor cell
	var iAbsDiff = Math.abs(i - gGamerPos.i);
	if (iAbsDiff === gBoard.length - 1 && (gGamerPos.i === 0 ||
		gGamerPos.i === gBoard.length - 1)) iAbsDiff = 1;
	var jAbsDiff = Math.abs(j - gGamerPos.j);
	if (jAbsDiff === gBoard[0].length - 1 && (gGamerPos.j === 0 ||
		gGamerPos.j === gBoard[0].length - 1)) jAbsDiff = 1;

	// If the clicked Cell is one of the four allowed
	if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0)) {

		if (targetCell.gameElement === BALL) {
			gCollectedBalls++;
			gBallsOnBoard--;
			//update DOM - collected-balls
			var elCollectedBalls = document.querySelector('.collected-balls');
			elCollectedBalls.innerText = 'Collected Balls: ' + gCollectedBalls;

			audioEatBall.play();
			console.log('Collecting!');
		}
		var targetGameElement = targetCell.gameElement;
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
		renderCell(gGamerPos, '');

		gGamerPos.i = i;
		gGamerPos.j = j;

		gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
		renderCell(gGamerPos, GAMER_IMG);

		if (targetGameElement === GLUE) {
			gStartPauseOnGlue = new Date();
			return;
		}
	} // else console.log('TOO FAR', iAbsDiff, jAbsDiff);
	if (gBallsOnBoard === 0) gameOver();
}

function gameOver() {
	//update DOM
	var elBtn = document.querySelector('.btn');
	elBtn.style.display = '';
	clearInterval(gAddBallsInterval);
	clearInterval(gAddGlueInterval);
	gAddBallsInterval = undefined;
	gAddGlueInterval = undefined;
	var elCollectedBalls = document.querySelector('.collected-balls');
	elCollectedBalls.innerText = 'GAME OVER !!!';
	audioGameOver.play();
}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
	var cellSelector = '.' + getClassName(location)
	var elCell = document.querySelector(cellSelector);
	elCell.innerHTML = value;
}

// Move the player by keyboard arrows
function handleKey(event) {
	var i = gGamerPos.i;
	var j = gGamerPos.j;

	switch (event.key) {
		case 'ArrowLeft':
			moveTo(i, (j === 0) ? (gBoard[0].length - 1) : j - 1);
			break;
		case 'ArrowRight':
			moveTo(i, (j === (gBoard[0].length - 1)) ? 0 : j + 1);
			break;
		case 'ArrowUp':
			moveTo((i === 0) ? (gBoard.length - 1) : i - 1, j);
			break;
		case 'ArrowDown':
			moveTo((i === (gBoard.length - 1)) ? 0 : i + 1, j);
			break;
	}
}

// Returns the class name for a specific cell
function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}

