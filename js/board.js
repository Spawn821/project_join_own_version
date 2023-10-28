const boardStatus = [
    'To do',
    'In progress',
    'Await feedback',
    'Done'
]


/**
 * This function rendert the status columns in board with the respective task from array tasks.
 */
function renderBoardShortCards() {
    boardStatus.map((status) => resetBoardStatus(status));

    let search = document.getElementById('board-search').value;
    let i = 0;

    tasks.map((task) => {
        let boardStatusContainer = document.getElementById(selectBoardStatus(task.boardStatus));

        if (task.title.toLowerCase().includes(search.toLowerCase())) {
            boardStatusContainer.innerHTML += getBoardShortCardHTML(i, task.category, task.title, task.description,
                task['subtasks'].length, task.prioImg);

            addContactsToBoardShortCard(i, task.assignedTo)

            removeElementsFromShortCard(i, task);

            i++;
        }
    });
}


/**
 * This fuction rendert the contact area in the respective short card.
 * @param {integer} i is the index from task from array tasks. 
 * @param {array} assignedTo is the list with contacts added to the respective task.
 */
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


/**
 * This function fades out all elments which are not documented in the task.
 * @param {integer} i is the index from task from array tasks.
 * @param {object} task is the task from array tasks.
 */
function removeElementsFromShortCard(i, task) {
    for (key in task) {
        if (task[key] == '' || task[key] == []) {
            document.getElementById(selectBoardShortCardElement(key) + `_${i}`).classList.add('d-none');
        }
    }
}


/**
 * This fuction returns the respective id from the fades out element.
 * @param {string} section is the key from object task.
 * @returns id.
 */
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


/**
 * This fuction returns the status from the current task to added in reseptive column.
 * @param {string} status is the status from board column.
 * @returns status.
 */
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

/**
 * This fuction determined the current index from the dragged short card in board.
 * @param {integer} i is the index from array tasks.
 */
function boardDrag(i) {
    currentTask = i;
}


/**
 * This fuction dropped the dragged short card in the respective column.
 * @param {string} status is the status from board column.
 */
function boardDrop(status) {
    tasks[currentTask].boardStatus = status;

    setItem('tasks', JSON.stringify(tasks))

    renderBoardShortCards();
    showDroppedShortCard();
}


async function showDroppedShortCard() {
    scrollToDroppedShortCard();

    let shortCard = document.getElementById(`board-short-card-panel_${currentTask}`);

    for (let i = 1; i < 5; i++) {
        console.log(currentTask);
        setTimeout(function () {
            shortCard.classList.toggle('board-short-card-mark-dropped');
        }, 350 * i);
    }
}


function scrollToDroppedShortCard() {
    let scrollPositionElement = document.getElementById(`board-short-card-panel_${currentTask}`);
    scrollPositionElement.scrollIntoView({
        block: "end",
        behavior: "smooth"
    });
}