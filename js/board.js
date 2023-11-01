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
            const categoryBackgroundColor = returnContactColor(task.category.id);

            boardStatusContainer.innerHTML += getBoardShortCardHTML(i, task.category.category,
                categoryBackgroundColor, task.title, task.description, task['subtasks'].length, task.prioImg);

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


/**
 * This function open the detail card.
 */
function openDetailCard(i) {
    let detailCard = document.getElementById('board-detail-card');

    detailCard.classList.remove('d-none')

    fillDetailCard(i);
}


function closeDetailCard(i) {
    let detailCard = document.getElementById('board-detail-card');

    detailCard.classList.add('d-none')
}


/**
 * This function starts to fill the detail card with all task details.
 * @param {integer} i is the index from the task form array tasks.
 */
function fillDetailCard(i) {
    showDetailCardRows();

    for (section in tasks[i]) {
        let element = document.getElementById(returnDetailCardSectionId(section));

        if (element) {
            element.innerHTML = '';

            structureBySection(section, i, element)
        }
    }
}

let detailCardRowIds = [
    'board-detail-card-description',
    'board-detail-card-priority-row',
    'board-detail-card-assigned-to-row',
    'board-detail-card-subtasks-row'
]

/**
 * This function remove the class 'd-none' from all row elements in the detail card.
 */
function showDetailCardRows() {
    detailCardRowIds.map((id) => {
        document.getElementById(id).classList.remove('d-none');
    });
}


/**
 * This fuction fill individual elements with the content from the task or add the class 'd-none' for
 * elments with no entries.
 * @param {string} section is the entrie from the task.
 * @param {integer} i is the index from the task from array tasks.
 * @param {object} element is the html element from the detail card.
 */
function structureBySection(section, i, element) {
    if (tasks[i][section] == "" || tasks[i][section] == []) {
        hideDetailCardRow(section);
    } else {
        fillDetailCardSection(section, i, element);
    }
}


/**
 * This function add the class 'd-none' for elements with no entries.
 * @param {string} section is the entrie from the task.
 */
function hideDetailCardRow(section) {
    let row = document.getElementById(detailCardRowIds.find((element) => element.includes(section.substring(1, 4))));
    row.classList.add('d-none');
}


/**
 * This fuction fill individual elements with the content from the task.
 * @param {string} section is the entrie from the task.
 * @param {integer} i is the index from the task from array tasks.
 * @param {object} element is the html element from the detail card.
 */
function fillDetailCardSection(section, i, element) {
    if (section == 'category') {
        element.innerHTML = tasks[i][section].category;
        element.style = `background-color: ${returnContactColor(tasks[i][section].id)}`;
    } else if (section == 'assignedTo') {
        fillDetailCardAssignedTo(tasks[i].assignedTo, element);
    } else if (section == 'prioImg') {
        element.src = tasks[i][section];
    } else if (section == 'subtasks') {
        fillDetailCardSubtasks(tasks[i].subtasks, element);
    } else {
        element.innerHTML = tasks[i][section];
    }
}


/**
 * This fuctioin redert the section assiged to on the detail card.
 * @param {array} assignedTo is the list with the contacts for the task.
 * @param {object} element is the html element from the detail card.
 */
function fillDetailCardAssignedTo(assignedTo, element) {
    assignedTo.map((contact) => {
        const initals = getInitials(contact.name);
        const name = contact.name;
        const backgroundColor = returnContactColor(contact.id);

        element.innerHTML += getBoardDetialCardContactsHTML(initals, name, backgroundColor);
    });
}


/**
 * This fuctioin redert the section subtasks on the detail card.
 * @param {array} subtasks is the list with the subtasks for the task.
 * @param {object} element is the html element from the detail card.
 */
function fillDetailCardSubtasks(subtasks, element) {
    subtasks.map((subtask) => {
        element.innerHTML += getBoardDetialCardSubtasksHTML(subtask);
    });
}


function returnDetailCardSectionId(section) {
    switch (section) {
        case 'category':
            return 'board-detail-card-category';
        case 'title':
            return 'board-detail-card-title';
        case 'description':
            return 'board-detail-card-description';
        case 'dueDate':
            return 'board-detail-card-due-date';
        case 'prioText':
            return 'board-detail-card-priority-text';
        case 'prioImg':
            return 'board-detail-card-priority-img';
        case 'assignedTo':
            return 'board-detail-card-assigned-to';
        case 'subtasks':
            return 'board-detail-card-subtasks';
    }
}


function openOrCloseAddTaskCard(action) {
    let addTaskCardBackground = document.getElementById('add_task_card_background_html');
    let addTaskCardClose = document.getElementById('add-task-card-close-icon');
    let addTask = document.getElementById('add_task_html');

    if (action == 'open') {
        openAddTaskCard(addTaskCardBackground, addTaskCardClose, addTask);
    } else {
        closeAddTaskCard(addTaskCardBackground, addTaskCardClose, addTask);
    }

}


function openAddTaskCard(addTaskCardBackground, addTaskCardClose, addTask) {
    addTaskCardBackground.classList.remove('d-none');
    addTaskCardClose.classList.remove('d-none');
    addTask.classList.remove('d-none');
    addTask.classList.remove('overflow-y-scroll');
    addTask.classList.add('add-task-card');
    addTask.classList.remove('add-task-card-slide-out');
    addTask.classList.add('add-task-card-slide-in');
}


function closeAddTaskCard(addTaskCardBackground, addTaskCardClose, addTask) {
    if (!addTaskCardClose.classList.contains('d-none')) {
        addTask.classList.remove('add-task-card-slide-in');
        addTask.classList.add('add-task-card-slide-out');

        setTimeout(() => {
            addTaskCardBackground.classList.add('d-none');
            addTaskCardClose.classList.add('d-none');
            addTask.classList.add('d-none');
            addTask.classList.add('overflow-y-scroll');
            addTask.classList.remove('add-task-card');
        }, 700);
    } else {
        addTaskCardBackground.classList.add('d-none');
    }
}