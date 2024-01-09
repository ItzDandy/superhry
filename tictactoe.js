const boardSize = 3;
let board = [];
let currentPlayer = 'X';
let gameOver = false;

const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');

initializeBoard();
renderBoard();

function initializeBoard() {
    for (let i = 0; i < boardSize; i++) {
        board[i] = [];
        for (let j = 0; j < boardSize; j++) {
            board[i][j] = '';
        }
    }
}

function renderBoard() {
    boardElement.innerHTML = '';
    for (let i = 0; i < boardSize; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < boardSize; j++) {
            const cell = document.createElement('td');
            cell.textContent = board[i][j];
            cell.addEventListener('click', () => onCellClick(i, j));
            row.appendChild(cell);
        }
        boardElement.appendChild(row);
    }
}

function onCellClick(row, col) {
    if (!gameOver && board[row][col] === '') {
        board[row][col] = currentPlayer;
        renderBoard();
        if (checkWin(row, col)) {
            gameOver = true;
            messageElement.textContent = `${currentPlayer} wins!`;
        } else if (isBoardFull()) {
            gameOver = true;
            messageElement.textContent = 'It\'s a tie!';
        } else {
            switchPlayer();
            if (currentPlayer === 'O') {
                computerMove();
            }
        }
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function computerMove() {
    const emptyCells = [];
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            if (board[i][j] === '') {
                emptyCells.push({ row: i, col: j });
            }
        }
    }

    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const { row, col } = emptyCells[randomIndex];
        board[row][col] = currentPlayer;
        renderBoard();

        if (checkWin(row, col)) {
            gameOver = true;
            messageElement.textContent = `${currentPlayer} wins!`;
        } else if (isBoardFull()) {
            gameOver = true;
            messageElement.textContent = 'It\'s a tie!';
        } else {
            switchPlayer();
        }
    }
}

function checkWin(row, col) {
    return checkRow(row) || checkCol(col) || checkDiagonals(row, col);
}

function checkRow(row) {
    return board[row].every(cell => cell === currentPlayer);
}

function checkCol(col) {
    return board.every(row => row[col] === currentPlayer);
}

function checkDiagonals(row, col) {
    if (row === col || row + col === boardSize - 1) {
        return checkMainDiagonal() || checkAntiDiagonal();
    }
    return false;
}

function checkMainDiagonal() {
    return board.every((row, index) => row[index] === currentPlayer);
}

function checkAntiDiagonal() {
    return board.every((row, index) => row[boardSize - 1 - index] === currentPlayer);
}

function isBoardFull() {
    return board.every(row => row.every(cell => cell !== ''));
}

function restartGame() {
    initializeBoard();
    renderBoard();
    messageElement.textContent = '';
    gameOver = false;
}
