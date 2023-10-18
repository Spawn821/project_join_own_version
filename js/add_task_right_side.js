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

    let prioBtn = document.getElementById(id);
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
        let prioBtn = document.getElementById(element.id);

        element.id != id ? prioBtn.classList.remove(element.class) : null;
    });
}


/* === CATEGORY === */

let categoriesTask = [
    'Technical Task',
    'User Story'
]

/**
 * This function rendert all categories in 'add task' dropdown 'category'.
 */
function renderCategoryTask() {
    let categorieContainer = document.getElementById('add-task-category-list');
    categorieContainer.innerHTML = '';
    let i = 0;

    categoriesTask.map((category) => {
        categorieContainer.innerHTML += getCategoryEntryHTML(category, i);

        i++
    });
}


/**
 * This funciton show or hide the images by keyup event in the html file.
 */
function showOrHideCategoryAddImg() {
    let addImg = document.getElementById('add-task-category-add');
    let downArrow = document.getElementById('add-task-category-arrow-open');
    let upArrow = document.getElementById('add-task-category-arrow-close');

    switch (returnStatusCategoryInput(downArrow, upArrow)) {
        case 'input empty, dropdown close':
            addImg.classList.add('d-none'); downArrow.classList.remove('d-none');
            break;
        case 'input empty, dropdown open':
            addImg.classList.add('d-none'); upArrow.classList.remove('d-none');
            break;
        case 'write':
            addImg.classList.remove('d-none'); downArrow.classList.add('d-none'); upArrow.classList.add('d-none');
            break;
    }
}


/**
 * This function retrun the status form the input and show or hide the imgaes.
 * @param {object} downArrow is the down arrow image in categories.
 * @param {object} upArrow is the upl arrow image in categories.
 * @returns {string} the status withe a string.
 */
function returnStatusCategoryInput(downArrow, upArrow) {
    let categoryInput = document.getElementById('add-task-input-category');

    if (categoryInput.value == '' && upArrow.classList.contains('d-none') && !downArrow.classList.contains('d-none')) {
        return 'input empty, dropdown close';
    } else if (categoryInput.value == '' && downArrow.classList.contains('d-none') && upArrow.classList.contains('d-none')) {
        return 'input empty, dropdown open';
    } else if (categoryInput.value) {
        return 'write'
    }
}


function addCategoryToList() {
    let newCategory = document.getElementById('add-task-input-category');

    categoriesTask.push(newCategory.value);
    newCategory.value = '';

    renderCategoryTask();
/*     showOrHideCategoryAddImg(); */
}


function deleteCategoryFromList(i) {
    categoriesTask.splice(i, 1);

    renderCategoryTask();
}


function selectCategory(i) {
    let input = document.getElementById('add-task-input-category');

    input.value = categoriesTask[i];
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
    let subtaskContainer = document.getElementById('add-task-subtask-list');
    subtaskContainer.innerHTML = '';
    let i = 0;

    addedSubtasks.map((subtask) => {
        subtaskContainer.innerHTML += getAddedSubtaskHTML(subtask, i);

        i++;
    })
}


/**
 * This function change the images to start input or cancel this.
 */
function showOrHideSubtaskInputImg() {
    let addImg = document.getElementById('add-task-subtask-add');
    let cancelOrDoneImg = document.getElementById('add-task-add-new-subtask');

    cancelOrDoneImg.classList.toggle('d-none');
    addImg.classList.toggle('d-none');
}


/**
 * This function executed the action in the input field in subtasks.
 * @param {string} action is the action which to be executed.
 */
function actionInputSubtask(action) {
    let newSubtask = document.getElementById('add-task-input-subtask');

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

    showOrHideSubtaskInputImg();
}


function startInputSubtask(newSubtask) {
    newSubtask.removeAttribute('readonly');
    newSubtask.focus();
}


function addSubtask(newSubtask) {
    if (newSubtask.value) {
        addSubtaskToArray(newSubtask);
    } else {
        addSubtaskError(newSubtask);
    }
}

function addSubtaskToArray(newSubtask) {
    addedSubtasks.push(newSubtask.value);

    newSubtask.value = '';
    newSubtask.setAttribute('readonly', '');

    renderSubtaskTask();
}

function addSubtaskError(newSubtask) {
    newSubtask.style.color = 'red';
    newSubtask.value = 'The field is empty!'

    setTimeout(() => {
        newSubtask.value = '';
        newSubtask.style.color = 'black';

        cancelInputSubtask(newSubtask);
    }, 1500)
}


function cancelInputSubtask(newSubtask) {
    newSubtask.value = '';
    newSubtask.setAttribute('readonly', '');
}


function editSubtask(i) {
    let changedSubtask = document.getElementById(`add-task-input-edit-subtask${i}`);

    addedSubtasks.splice(i, 1, changedSubtask.value);
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

    input.value = addedSubtasks[i];
    input.focus();
}



/* === CREATE TASK === */

/**
 * This function create a new task instace in array tasks.
 * @param {string} action is the action to wich executed.
 */
async function createTask(action) {
    const title = document.getElementById('add-task-input-title');
    const description = document.getElementById('add-task-textarea-description');
    const dueDate = document.getElementById('add-task-input-date');
    const category = document.getElementById('add-task-input-category');

    if (action == 'create') {
        tasks.push(returnTask(title, description, dueDate, category));
        clearTask(title, description, dueDate, category);
        informationSlidebox('Task added to board');
    } else {
        clearTask(title, description, dueDate, category);
    }

    await setItem('tasks', JSON.stringify(tasks));
}


function clearTask(title, description, dueDate, category) {
    title.value = '';
    description.value = '';
    addedUsersToTask = [];
    dueDate.value = '';
    category.value = '';
    addedSubtasks = []

    removeMarkedPrio();
    renderAddedUserToTask();
    renderSubtaskTask();
}


function returnTask(title, description, dueDate, category) {
    return {
        title: title.value,
        description: description.value,
        assignedTo: addedUsersToTask,
        dueDate: dueDate.value,
        category: category.value,
        prio: currentPrio,
        category: category.value,
        subtasks: addedSubtasks
    };
}