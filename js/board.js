const boardStatus = [
    'To do',
    'In progress',
    'Await feedback',
    'Done'
]

function renderBoardShortCards() {
    boardStatus.map((status) => resetBoardStatus(status));

    tasks.map((task) => {
        let boardStatusContainer = document.getElementById(selectBoardStatus(task.boardStatus));

        boardStatusContainer.innerHTML += getBoardShortCard(task.category, task.title, task.description)
    });
}


function addSectionsToShortCard() {
    boardStatusContainer.innerHTML += getBoardShortCardProgressBar(task['subtasks'].length)
    boardStatusContainer.innerHTML += getBoardShortCard(task.category, task.title, task.description, task.prioImg)
    boardStatusContainer.innerHTML += getBoardShortCard(task.category, task.title, task.description, task.prioImg)
}


function selectBoardStatus(status) {
    switch (status) {
        case 'To do':
            return 'board-to-do-container';
        case 'In progress':
            return 'board-in-progress-container';
        case 'Await feedback':
            return 'board-await-feedback-container';
        case 'Done':
            return 'board-done-container';
    }
}


function resetBoardStatus(status) {
    switch (status) {
        case 'To do':
            document.getElementById('board-to-do-container').innerHTML = '';
            break;
        case 'In progress':
            document.getElementById('board-in-progress-container').innerHTML = '';
            break;
        case 'Await feedback':
            document.getElementById('board-await-feedback-container').innerHTML = '';
            break;
        case 'Done':
            document.getElementById('board-done-container').innerHTML = '';
            break;
    }
}