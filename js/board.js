const boardStatus = [
    'To do',
    'In progress',
    'Await feedback',
    'Done'
];


/* === BOARD SHORT CARDS === */

function startCreateBoardShortCards() {
    boardStatus.map((status) => resetBoardStatus(status));

    let search = document.getElementById('board-search').value;
    let i = 0;

    renderBoardShortCards(search, i);
}


/**
 * This function rendert the status columns in board with the respective task from array tasks.
 * @param {string} search is the value from the search bar.
 * @param {number} i is the index from array task. 
 */
function renderBoardShortCards(search, i) {
    tasks.map((task) => {
        let boardStatusContainer = document.getElementById(selectBoardStatus(task.boardStatus));

        if (task.title.toLowerCase().includes(search.toLowerCase())) {
            const categoryBackgroundColor = returnContactColor(task.category.id);

            boardStatusContainer.innerHTML += getBoardShortCardHTML(i, task.category.category,
                categoryBackgroundColor, task.title, task.description, task['subtasks'].length, task.prioImg);

            addContactsToBoardShortCard(i, task.assignedTo);
            updateProgressbarSubtasks(i, task);
            removeElementsFromShortCard(i, task);

            i++;
        }
    });
}


function updateProgressbarSubtasks(i, task) {
    let progressBarIs = document.getElementById(`board-short-card-progress-bar-is_${i}`);
    let checkedSubtasks = document.getElementById(`board-short-card-checked-subtasks_${i}`);
    let isChecked = 0;
    let progress = 0;

    task.subtasks.map((subtask) => {
        subtask.checked == true ? isChecked++ : null;
    });

    progress = 128 / task['subtasks'].length * isChecked;
    progressBarIs.style = `width: ${progress}px`;
    checkedSubtasks.innerHTML = isChecked;
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
    let assignedToPrioText = '';

    for (key in task) {
        if (task[key] == '' || task[key] == []) {

            try {
                document.getElementById(selectBoardShortCardElement(key) + `_${i}`).classList.add('d-none');
            } catch {
                assignedToPrioText += key;

                if (assignedToPrioText == 'assignedToprioText') {
                    document.getElementById(selectBoardShortCardElement(assignedToPrioText) + `_${i}`).classList.add('d-none');
                }

                continue;
            }
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
        case 'assignedToprioText':
            return 'board-short-card-assigned-to-priority';
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

    startCreateBoardShortCards();
    showDroppedShortCard();
}


async function showDroppedShortCard() {
    scrollToDroppedShortCard();

    let shortCard = document.getElementById(`board-short-card-panel_${currentTask}`);

    for (let i = 1; i < 7; i++) {
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



/* === BOARD ADD TASK OVERLAY === */

/**
 * This function show the 'add task' webside as overlay or turn back as webside.
 * @param {string} action is the action open (show) or close (turn back).
 */
function openOrCloseAddTaskCard(action, boardStatus) {
    let transparentBackground = document.getElementById('join-transparent-background');
    let addTaskOverlay = document.getElementById('add_task_overlay_html');
    const windowSize = window.matchMedia('(max-width: 1150px)');
    setBoardStatus = boardStatus;

    if (!windowSize.matches) {
        if (action == 'open') {
            openAddTaskCard(transparentBackground, addTaskOverlay);
        } else {
            closeAddTaskCard(transparentBackground, addTaskOverlay);
        }
    } else {
        showTemplate('add_task_html');
    }
}


function openAddTaskCard(transparentBackground, addTaskOverlay) {
    transparentBackground.classList.remove('d-none');
    addTaskOverlay.classList.remove('d-none');

    currentOverlay = addTaskOverlay;
    currentAddTask = 'add_task_overlay_html';

    overlayWindowPosition('open', addTaskOverlay);
}


function closeAddTaskCard(transparentBackground, addTaskOverlay) {
    clearTask();
    overlayWindowPosition('close', addTaskOverlay);

    setTimeout(() => {
        transparentBackground.classList.add('d-none');
        addTaskOverlay.classList.add('d-none');
    }, 240);

    setBoardStatus = '';
}