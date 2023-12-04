/**
 * This function open the detail card.
 */
function openDetailCard(i) {
    currentTask = i;
    let transparentBackground = document.getElementById('join-transparent-background');
    let detailCard = document.getElementById('board_detail_card_task_html');

    transparentBackground.classList.remove('d-none');
    detailCard.classList.remove('d-none');

    fillDetailCard(i);
    overlayWindowPosition('open', detailCard);
    addOrRemoveScrollbarDetailCard();

    currentOverlay = detailCard;
}


function closeDetailCard() {
    let transparentBackground = document.getElementById('join-transparent-background');
    let detailCard = document.getElementById('board_detail_card_task_html');

    overlayWindowPosition('close', detailCard);

    setTimeout(() => {
        transparentBackground.classList.add('d-none');
        detailCard.classList.add('d-none');
        taskEdit ? showDroppedShortCard() : null;
        taskEdit = false;
    }, 240);
}


function addOrRemoveScrollbarDetailCard() {
    const detailCardHeight = document.getElementById('board-detail-card-panel').offsetHeight;
    const windowHeight = document.documentElement.clientHeight;
    let table = document.getElementById('board-detail-card-table');

    if (detailCardHeight >= windowHeight - 64 - 32) {
        table.classList.add('overflow-y-scroll');
    } else {
        table.classList.remove('overflow-y-scroll');
    }
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
    try {
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
    } catch {
        return;
    }
}


/**
 * This function redert the section assiged to on the detail card.
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
 * This function redert the section subtasks on the detail card.
 * @param {array} subtasks is the list with the subtasks for the task.
 * @param {object} element is the html element from the detail card.
 */
function fillDetailCardSubtasks(subtasks, element) {
    let i = 0;

    subtasks.map((subtask) => {
        element.innerHTML += getBoardDetialCardSubtasksHTML(i, subtask.subtask);

        let checkbox = document.getElementById(`detailCardSubtask-${i}`);
        subtask.checked == true ? checkbox.setAttribute('checked', '') : null;

        i++;
    });
}


function isSubtaskChecked(i) {
    let subtask = document.getElementById(`detailCardSubtask-${i}`);

    if (subtask.checked) {
        tasks[currentTask]['subtasks'][i]['checked'] = true;
    } else {
        tasks[currentTask]['subtasks'][i]['checked'] = false;
    }

    setItem('tasks', JSON.stringify(tasks));
    renderBoardShortCards();
    taskEdit = true;
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


function deleteTask() {
    tasks.splice(currentTask, 1);

    setItem('tasks', JSON.stringify(tasks));
    closeDetailCard();
    renderBoardShortCards();
}


/**
 * This fuction opens the edit task overlay.
 */
function openEditTask() {
    let detailCard = document.getElementById('board_detail_card_task_html');
    let addTaskMobileOverlay = document.getElementById('add_task_mobile_overlay_html');

    detailCard.classList.add('d-none');
    addTaskMobileOverlay.classList.remove('d-none');

    currentOverlay = addTaskMobileOverlay;
    currentAddTask = 'add_task_mobile_overlay_html';

    overlayWindowPosition('open', addTaskMobileOverlay);
    fillEditTask();
}


let editCategory;

/**
 * This function fill the task sections with the current task data.
 */
function fillEditTask() {
    let title = document.getElementById(currentAddTask).querySelector('#add-task-input-title');
    let description = document.getElementById(currentAddTask).querySelector('#add-task-textarea-description');
    let dueDate = document.getElementById(currentAddTask).querySelector('#add-task-input-date');

    fillInputFieldsAndVariables(title, description, dueDate);
    renderAddedUserToTask();
    markedPrioAsClicked(currentPrio);
    renderSubtaskTask();
}


function fillInputFieldsAndVariables(title, description, dueDate) {
    title.value = tasks[currentTask]['title'];
    description.value = tasks[currentTask]['description'];
    addedUsersToTask = tasks[currentTask]['assignedTo'];
    dueDate.value = tasks[currentTask]['dueDate'];
    currentPrio = tasks[currentTask]['prioText'];
    editCategory = tasks[currentTask]['category'];
    addedSubtasks = tasks[currentTask]['subtasks'];
}

let taskEdit = false;

function closeEditTask() {
    clearTask();

    let addTaskMobileOverlay = document.getElementById('add_task_mobile_overlay_html');
    addTaskMobileOverlay.classList.add('d-none');

    openDetailCard(currentTask);
}


function changeTask() {
    let boardStatus = tasks[currentTask]['boardStatus'];

    createOrEditTask('edit', boardStatus);

    taskEdit = true;
}