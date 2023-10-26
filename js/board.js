const boardStatus = [
    'To do',
    'In progress',
    'Await feedback',
    'Done'
]

function renderBoardShortCards() {
    boardStatus.map((status) => resetBoardStatus(status));

    let i = 0;

    tasks.map((task) => {
        let boardStatusContainer = document.getElementById(selectBoardStatus(task.boardStatus));

        boardStatusContainer.innerHTML += getBoardShortCardHTML(i, task.category, task.title, task.description,
            task['subtasks'].length, task.prioImg);

        addContactsToBoardShortCard(i, task.assignedTo)

        removeElementsFromShortCard(i, task);

        i++;
    });
}


function addContactsToBoardShortCard(i, assignedTo) {
    let shortCardContacts = document.getElementById(`board-short-card-contacts_${i}`);

    assignedTo.map((contact) => {
        const initials = getInitials(contact.name);
        const backgroundColor = returnContactColor(contact.id);

        shortCardContacts.innerHTML += getBoardShortCardContactsHTML(initials, backgroundColor);
    });
}


let boardShortCardIdList = [
    'board-short-card-description',
    'board-short-card-subtasks',
    'board-short-card-contacts',
    'board-short-card-priority'
]

function removeElementsFromShortCard(i, task) {
    for (key in task) {
        if (task[key] == '' || task[key] == []) {
            document.getElementById(selectBoardShortCardElement(key) + `_${i}`).classList.add('d-none');
        }
    }
}


function selectBoardShortCardElement(section) {
    switch (section) {
        case 'description':
            return 'board-short-card-description';
        case 'subtasks':
            return 'board-short-card-subtasks';
        case 'assignedTo':
            return 'board-short-card-contacts';
        case 'prioText':
            return 'board-short-card-priority';
    }
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


function allowDrop(event) {
    event.preventDefault();
}


let currentTask = 0;

function boardDrag(i) {
    currentTask = i;
    console.log(i);
}


function boardDrop(status) {
    tasks[currentTask].boardStatus = status;
    renderBoardShortCards();
}