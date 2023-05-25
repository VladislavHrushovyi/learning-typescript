const cells = Array.from(document.querySelectorAll(".cell"));
const playerDisplay = document.querySelector(".player");
const resetButton = document.getElementById("reset");
const winnerInfo = document.querySelector(".winner-info");
let gameData = ["", "", "", "", "", "", "", "", ""];
let player = "X";
let isGameActive = true;
const PLAYERX_WON = 'PLAYERX_WON';
const PLAYERO_WON = 'PLAYERO_WON';
const TIE = 'TIE';
const isValidAction = (cell) => {
    if (cell.innerHTML !== "") {
        return false;
    }
    return true;
};
const updateGameData = (index) => {
    gameData[index] = player;
};
const changePlayer = () => {
    player = player === "X" ? "O" : "X";
    playerDisplay.innerHTML = `Player <span class="player${player}">${player}</span>  turn`;
};
const showWinner = (type) => {
    switch (type) {
        case PLAYERX_WON:
            winnerInfo.innerHTML = `Winner <span class="player${player}">X</span>`;
            break;
        case PLAYERO_WON:
            winnerInfo.innerHTML = `Winner <span class="player${player}">O</span>`;
            break;
        case TIE:
            winnerInfo.innerHTML = "TIE";
    }
    winnerInfo.classList.remove("hidden");
};
const handleResultValidation = () => {
    let roundWon = false;
    for (let i = 0; i < winnerConditions.length; i++) {
        const item = winnerConditions[i];
        const a = gameData[item[0]];
        const b = gameData[item[1]];
        const c = gameData[item[2]];
        if (a === "" || b === "" || c === "") {
            continue;
        }
        if (a === b && a === c) {
            roundWon = true;
            cells[item[0]].classList.add("win-direction");
            cells[item[1]].classList.add("win-direction");
            cells[item[2]].classList.add("win-direction");
        }
    }
    if (roundWon) {
        showWinner(player === "X" ? PLAYERX_WON : PLAYERO_WON);
        isGameActive = false;
        return;
    }
    if (gameData.filter(item => item === "").length === 0) {
        showWinner(TIE);
    }
};
const clickCellHandler = (cell, index) => {
    if (isValidAction(cell) && isGameActive) {
        cell.classList.add(`player${player}`);
        cell.innerHTML = player;
        updateGameData(index);
        handleResultValidation();
        changePlayer();
    }
};
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => clickCellHandler(cell, index));
});
const resetBoard = () => {
    gameData = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    winnerInfo.classList.add("hidden");
    cells.forEach((cell) => cell.classList.remove("win-direction", "playerX", "playerO"));
    if (player === "O") {
        changePlayer();
    }
    cells.forEach(cell => {
        cell.innerHTML = "";
    });
};
resetButton.addEventListener('click', resetBoard);
/*
    0 1 2
    3 4 5
    6 7 8

*/
const winnerConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
