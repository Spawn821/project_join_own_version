/* === CREATE TASK === */

const prioImgPath = [
    { priority: 'Urgent', img: 'assets/img/icon_urgent_red.png' },
    { priority: 'Medium', img: 'assets/img/icon_medium_orange.png' },
    { priority: 'Low', img: 'assets/img/icon_low_green.png' },
];

const addTaskInputIds = [
    '#add-task-input-title',
    '#add-task-textarea-description',
    '#add-task-input-assigned-to',
    '#add-task-input-date',
    '#add-task-input-category'
];

let setBoardStatus = '';

/**
 * This function decides if a task create or edit.
 * @param {string} action is the action to wich executed.
 * @param {string} boardStatus is the status from the task, 'to do', 'in progress'...
 */
async function createOrEditTask(action, boardStatus) {
    let title = document.getElementById(currentAddTask).querySelector('#add-task-input-title');
    let description = document.getElementById(currentAddTask).querySelector('#add-task-textarea-description');
    let dueDate = document.getElementById(currentAddTask).querySelector('#add-task-input-date');
    let prioImg = findPriorityImg();
    setBoardStatus == '' ? setBoardStatus = boardStatus : null;

    if (action == 'create') {
        createTask(title, description, dueDate, prioImg);
    } else if (action == 'edit') {
        editTask(title, description, dueDate, prioImg);
    }

    await setItem('tasks', JSON.stringify(tasks));
}


/**
 * This function create a new task.
 * @param {string} title is the titel from the task.
 * @param {string} description is the description from the task.
 * @param {string} dueDate is the date by which the task must be completed.
 * @param {string} prioImg is the image path from the prio icon.
 */
function createTask(title, description, dueDate, prioImg) {
    let category = document.getElementById(currentAddTask).querySelector('#add-task-input-category');
    const windowSize = window.matchMedia('(max-width: 1150px)');

    tasks.push(returnTask(title, description, dueDate, prioImg, categoryExist(category.value)));

    windowSize.matches ? clearTask() : openOrCloseAddTaskCard('close', '');
    showNewTaskOnBoard();
}


/**
 * This function edit the current task.
 * @param {string} title is the titel from the task.
 * @param {string} description is the description from the task.
 * @param {string} dueDate is the date by which the task must be completed.
 * @param {string} prioImg is the image path from the prio icon.
 */
function editTask(title, description, dueDate, prioImg) {
    tasks.splice(currentTask, 1, returnTask(title, description, dueDate, prioImg, editCategory));

    closeEditTask();
    startCreateBoardShortCards();
}


/**
 * This function controls everything so that the new task is displayed with a flashing effect on the page board.
 */
function showNewTaskOnBoard() {
    showTemplate('board_html');
    setSidebarNavActive('board');
    currentTask = tasks.length - 1;
    showDroppedShortCard();
}


/**
 * This function find the path from the priority image.
 * @returns the the path from the priority image.
 */
function findPriorityImg() {
    try {
        return prioImgPath.find((element) => element.priority == currentPrio).img;
    } catch {
        return 'assets/img/icon_low_green.png'; //default
    }
}


/**
 * This function clear all input fields and set add task or add task overly to the default setup.
 */
function clearTask() {
    addTaskInputIds.map((id) => {
        let inputField = document.getElementById(currentAddTask).querySelector(id);
        inputField ? inputField.value = '' : null;
    })

    addedUsersToTask = [];
    currentPrio = '';
    setBoardStatus = '';
    addedSubtasks = [];

    removeMarkedPrio('', true);
    renderAddedUserToTask();
    renderSubtaskTask();
}


/**
 * This function returns the mask entry for the array tasks.
 * @param {string} title is the title from the task.
 * @param {string} description is the description from the task.
 * @param {string} dueDate is the date by which the task must be completed.
 * @param {string} prioImg is the image path from the prio icon.
 * @param {string} category is the name from the selected category.
 * @returns the mask entry for the array task.
 */
function returnTask(title, description, dueDate, prioImg, category) {
    return {
        title: title.value,
        description: description.value,
        assignedTo: addedUsersToTask,
        dueDate: dueDate.value,
        prioText: currentPrio,
        prioImg: prioImg,
        category: category,
        subtasks: addedSubtasks,
        boardStatus: setBoardStatus
    };
}

let inputsDisabledCreateTask = [
    '#add-task-input-title',
    '#add-task-textarea-description',
    '#add-task-input-date',
    '#add-task-input-category'
]

/**
 * This function check all conditions to enable the button create task.
 */
function checkDisabledCreateTask() {
    let i = 0;

    inputsDisabledCreateTask.map((input) => {
        const inputField = document.getElementById(currentAddTask).querySelector(input);
        let createTaskButton = document.getElementById(currentAddTask).querySelector('#add-task-button-create');

        if (inputField.value) i++;

        i == inputsDisabledCreateTask.length ? createTaskButton.disabled = false : createTaskButton.disabled = true;
    });
}