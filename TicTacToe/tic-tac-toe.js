let isXTurn = true;

function bindClickListener() {
    const container = document.getElementsByClassName("container")[0];
    container.addEventListener('click', handleFieldClick);
}

function unbindClickListener() {
    const container = document.getElementsByClassName("container")[0];
    container.removeEventListener('click', handleFieldClick);
}

function bindRestartClickListener() {
    const button = document.getElementsByClassName("button")[0];
    button.addEventListener('click', restart);
}

function handleFieldClick(event) {
    if (!isFieldFree(event)) {
        return;
    }
    placeMark(event);
    isXTurn = switchTurn();

    const playerTurn = getPlayerTurn();
    showNotification(playerTurn);

    const matchField = getCheckedPositions();
    if (hasCurrentPlayerWon(matchField)) {
        const winnerName = getWinnerName();
        showNotification(winnerName);
        addWinCursor();
        unbindClickListener();
    } else if (hasAllPositionDraw(matchField)) {
        showNotification("Draw!");
    }
}

function getCheckedPositions() {
    const matchField = [];
    for (let i = 0; i <= 8; i++) {
        matchField[i] = document.getElementsByClassName("cell")[i].className;
    }
    return matchField;
}

// Those functions check the winning positions in our game 
function hasCurrentPlayerWon(matchField) {
    return hasHorizontalWin(matchField) || hasVerticalWin(matchField) || hasDiagonalWin(matchField);
}

function hasHorizontalWin(matchField) {
    return hasPositionWon(matchField, 0, 1, 2) || hasPositionWon(matchField, 3, 4, 5) || hasPositionWon(matchField, 6, 7, 8);
}

function hasVerticalWin(matchField) {
    return hasPositionWon(matchField, 0, 3, 6) || hasPositionWon(matchField, 1, 4, 7) || hasPositionWon(matchField, 2, 5, 8);
}

function hasDiagonalWin(matchField) {
    return hasPositionWon(matchField, 0, 4, 8) || hasPositionWon(matchField, 2, 4, 6);
}

function hasPositionWon(matchField, cell1, cell2, cell3) {
    const isWin = isPositionChecked(matchField, cell1) && matchField[cell1] == matchField[cell2] && matchField[cell2] == matchField[cell3];
    if (isWin) {
        const winFields = [cell1, cell2, cell3];
        changeColorOfWinFields(winFields);
    }
    return isWin;
}

function isPositionChecked(matchField, index) {
    return matchField[index] != "cell";
}

// Those fuctions check the draw positions in our game
function hasAllPositionDraw(matchField) {
    return hasHorizontalDraw(matchField) && hasVerticalDraw(matchField) && hasDiagonalDraw(matchField);
}

function hasHorizontalDraw(matchField) {
    return hasPositionDraw(matchField, 0, 1, 2) && hasPositionDraw(matchField, 3, 4, 5) && hasPositionDraw(matchField, 6, 7, 8);
}

function hasVerticalDraw(matchField) {
    return hasPositionDraw(matchField, 0, 3, 6) && hasPositionDraw(matchField, 1, 4, 7) && hasPositionDraw(matchField, 2, 5, 8);
}

function hasDiagonalDraw(matchField) {
    return hasPositionDraw(matchField, 0, 4, 8) && hasPositionDraw(matchField, 2, 4, 6);
}

function hasPositionDraw(matchField, cell1, cell2, cell3) {
    return areAllPositionsChecked(matchField, cell1, cell2, cell3) && (matchField[cell1] != matchField[cell2] || matchField[cell2] != matchField[cell3]);
}

function areAllPositionsChecked(matchField, cell1, cell2, cell3) {
    return isPositionChecked(matchField, cell1) && isPositionChecked(matchField, cell2) && isPositionChecked(matchField, cell3);
}

function isFieldFree(event) {
    return event.target.className == "cell";
}

function placeMark(event) {
    if (isXTurn) {
        event.target.classList.add("cell--x");
    } else {
        event.target.classList.add("cell--o");
    }
}

function switchTurn() {
    return !isXTurn;
}

function showNotification(currentSituation) {
    document.getElementsByClassName("notification")[0].innerHTML = currentSituation;
}

function getPlayerTurn() {
    if (isXTurn) {
        return "Its X turn";
    } else {
        return "Its O turn";
    }
}

function getWinnerName() {
    if (isXTurn) {
        return "O Wins";
    } else {
        return "X Wins";
    }
}

function changeColorOfWinFields(winFields) {
    const cells = document.getElementsByClassName("cell");
    for (let i = 0; i <= 8; i++) {
        if (winFields.includes(i)) {
            cells[i].classList.add("cell--white");
        }
    }
}

function addWinCursor() {
    const container = document.getElementsByClassName("container")[0];
    container.classList.add("container--win");
}

function removeWinCursor() {
    const container = document.getElementsByClassName("container")[0];
    container.classList.remove("container--win");
}

function restart() {
    const cells = document.getElementsByClassName("cell");
    for (let i = 0; i <= 8; i++) {
        if (cells[i].classList.contains('cell--x') || cells[i].classList.contains('cell--o')) {
            cells[i].classList.remove('cell--x');
            cells[i].classList.remove('cell--o');
            cells[i].classList.remove('cell--white');
        }
    }
    removeWinCursor();
    isXTurn = true;
    bindClickListener();
    showNotification("Its X turn");
}

bindRestartClickListener();
bindClickListener();
