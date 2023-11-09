/* === CALENDAR === */

/**
 * This functions to set today's date for disable past calendar days.
 * @param {string} id is the id form the element.
*/
function setDateOfTodayForDatepicker(id) {
    let today = new Date().toISOString().split('T')[0];
    document.getElementById(id).setAttribute('min', today);
}


/* === PRIO === */

let idPrioBtn = [
    { id: 'add-task-btn-urgent', class: 'add-new-task-priority-color-red' },
    { id: 'add-task-btn-medium', class: 'add-new-task-priority-color-orange' },
    { id: 'add-task-btn-low', class: 'add-new-task-priority-color-green' }
]

let currentPrio = '';

/**
 * This function changes the style from the clicked priority button in add task.
 * @param {string} id is the id from the respective priority button.
 */

function markedPrioAsClicked(id) {
    removeMarkedPrio(id);

    let prioBtn = document.getElementById(currentAddTask).querySelector('#' + id);
    currentPrio = prioBtn.children[0].innerHTML;

    switch (id) {
        case 'add-task-btn-urgent':
            prioBtn.classList.toggle('add-new-task-priority-color-red');
            break;
        case 'add-task-btn-medium':
            prioBtn.classList.toggle('add-new-task-priority-color-orange');
            break;
        case 'add-task-btn-low':
            prioBtn.classList.toggle('add-new-task-priority-color-green');
            break;
    }
}


function removeMarkedPrio(id) {
    idPrioBtn.map((element) => {
        let prioBtn = document.getElementById(currentAddTask).querySelector('#' + element.id);

        element.id != id ? prioBtn.classList.remove(element.class) : null;
    });
}


/* === CATEGORY === */

/**
 * This function rendert all categories in 'add task' dropdown 'category'.
 */
function renderCategoryTask() {
    let categorieContainer = document.getElementById(currentAddTask).querySelector('#add-task-category-list');
    categorieContainer.innerHTML = '';

    categoriesTask.map((category) => {
        categorieContainer.innerHTML += getCategoryEntryHTML(category.category);
    });
}


function addCategory() {
    let newCategory = document.getElementById(currentAddTask).querySelector('#add-task-input-category');

    if (categoryExist(newCategory.value)) {
        addSubtaskError(newCategory, 'Is already exist!');
    } else if (newCategory.value) {
        addCategoryToList(newCategory);
    } else {
        addSubtaskError(newCategory, 'The field is empty!');
    }
}


function categoryExist(category) {
    return categoriesTask.find((element) => element['category'].toLowerCase() == category.toLowerCase());
}


function addCategoryToList(newCategory) {
    categoriesTask.push({ category: newCategory.value, id: categoriesTask.length });
    newCategory.value = '';

    setItem('categoriesTask', JSON.stringify(categoriesTask));
    renderCategoryTask();
}


function deleteCategoryFromList(category) {
    categoriesTask.splice(categoryIndex(category), 1);

    renderCategoryTask();
}


function categoryIndex(category) {
    return categoriesTask.findIndex((element) => element.category == category);
}


function selectCategory(category) {
    let input = document.getElementById(currentAddTask).querySelector('#add-task-input-category');

    input.value = category;
    dropDownAddTask('category', 'close');
}


/**
 * This function excludes a child container from the parent container's onclick method. 
 */
function isolateFromOderEvents(event) {
    event.stopPropagation();
}


/* === SUBTASK === */

let addedSubtasks = [];

/**
 * This function rendert all subtasks in 'add task' dropdown 'category'.
 */
function renderSubtaskTask() {
    let subtaskContainer = document.getElementById(currentAddTask).querySelector('#add-task-subtask-list');
    subtaskContainer.innerHTML = '';
    let i = 0;

    addedSubtasks.map((subtask) => {
        subtaskContainer.innerHTML += getAddedSubtaskHTML(subtask.subtask, i);

        i++;
    })
}


/**
 * This function change the images to start input or cancel this.
 */
function showOrHideSubtaskInputImg(action) {
    let addImg = document.getElementById(currentAddTask).querySelector('#add-task-subtask-add');
    let cancelOrDoneImg = document.getElementById(currentAddTask).querySelector('#add-task-add-new-subtask');

    switch (action) {
        case 'start input':
            cancelOrDoneImg.classList.remove('d-none'); addImg.classList.add('d-none');
            break;
        case 'add subtask':
            cancelOrDoneImg.classList.add('d-none'); addImg.classList.remove('d-none');
            break;
        case 'cancel input':
            cancelOrDoneImg.classList.add('d-none'); addImg.classList.remove('d-none');
            break;
    }
}


/**
 * This function executed the action in the input field in subtasks.
 * @param {string} action is the action which to be executed.
 */
function actionInputSubtask(action) {
    let newSubtask = document.getElementById(currentAddTask).querySelector('#add-task-input-subtask');

    switch (action) {
        case 'start input':
            startInputSubtask(newSubtask);
            break;
        case 'add subtask':
            addSubtask(newSubtask);
            break;
        case 'cancel input':
            cancelInputSubtask(newSubtask);
            break;
    }

    showOrHideSubtaskInputImg(action);
}


function startInputSubtask(newSubtask) {
    newSubtask.focus();
}


function addSubtask(newSubtask) {
    if (newSubtask.value) {
        addSubtaskToArray(newSubtask);
    } else {
        addSubtaskError(newSubtask, 'The field is empty!');
    }
}

function addSubtaskToArray(newSubtask) {
    addedSubtasks.push({subtask: newSubtask.value, checked: false});

    newSubtask.value = '';

    renderSubtaskTask();
}

function addSubtaskError(newSubtask, message) {
    newSubtask.style.color = 'red';
    newSubtask.value = message;

    setTimeout(() => {
        newSubtask.value = '';
        newSubtask.style.color = 'black';

        cancelInputSubtask(newSubtask);
    }, 1500)
}


function cancelInputSubtask(newSubtask) {
    newSubtask.value = '';
    newSubtask.blur();
}


function editSubtask(i) {
    const changedSubtask = document.getElementById(`add-task-input-edit-subtask${i}`);
    const checked = addedSubtasks[i].checked;

    addedSubtasks.splice(i, 1, {subtask: changedSubtask.value, checked: checked});
    renderSubtaskTask();
}


function deleteSubtask(i) {
    addedSubtasks.splice(i, 1);

    renderSubtaskTask();
}


/**
 * This function switch the list entry to an input filed to edit this entry.
 * @param {integer} i is the index from array addedSubtasks.
 */
function changeSubtaskFromShownToEdit(i) {
    let input = document.getElementById(`add-task-input-edit-subtask${i}`)
    let editTask = document.getElementById(`add-task-edit-task(${i})`)
    let shownTask = document.getElementById(`add-task-shown-task(${i})`)

    editTask.classList.remove('d-none');
    shownTask.classList.add('d-none');

    input.value = addedSubtasks[i].subtask;
    input.focus();
}



/* === CREATE TASK === */

const prioImgPath = [
    { priority: 'Urgent', img: '/assets/img/icon_urgent_red.png' },
    { priority: 'Medium', img: '/assets/img/icon_medium_orange.png' },
    { priority: 'Low', img: '/assets/img/icon_low_green.png' },
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
 * This function create a new task instace in array tasks.
 * @param {string} action is the action to wich executed.
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


function createTask(title, description, dueDate, prioImg) {
    let category = document.getElementById(currentAddTask).querySelector('#add-task-input-category');
    tasks.push(returnTask(title, description, dueDate, prioImg, categoryExist(category.value)));
    openOrCloseAddTaskCard('close');
    showNewTaskOnBoard();
}


function editTask(title, description, dueDate, prioImg) {
    tasks.splice(currentTask, 1, returnTask(title, description, dueDate, prioImg, editCategory));
    closeEditTask();
    renderBoardShortCards();
}


function showNewTaskOnBoard() {
    showTemplate('board_html');
    setSidebarNavActive('board');
    currentTask = tasks.length - 1;
    showDroppedShortCard();
}


function findPriorityImg() {
    try {
        return prioImgPath.find((element) => element.priority == currentPrio).img;
    } catch {
        return '/assets/img/icon_low_green.png'; //default
    }
}


function clearTask() {
    addTaskInputIds.map((id) => {
        let inputField = document.getElementById(currentAddTask).querySelector(id);
        inputField ? inputField.value = '' : null;
    })

    addedUsersToTask = [];
    currentPrio = '';
    setBoardStatus = '';
    addedSubtasks = [];

    removeMarkedPrio();
    renderAddedUserToTask();
    renderSubtaskTask();
}


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