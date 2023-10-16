let tasks = [];

async function initAddTask() {
    /*     await loadUsers(); */
}


/* === DROPDOWNS === */

/**
 * This function show or hide elements, based on the given array list.
 * @param {[string|array]} id is a list from id's.
*/
function showOrHideDropDownAddTask(id) {
    id.map((element) => {
        let dropdownElement = document.getElementById(element);
        let categoryInput = document.getElementById('add-task-input-category');

        if (element == 'add-task-wrapper-contact' || element == 'add-task-wrapper-category') {
            dropdownElement.classList.toggle('b-bottom-left-radius');
            dropdownElement.classList.toggle('b-bottom-right-radius');
            categoryInput.toggleAttribute('readonly');
        } else {
            dropdownElement.classList.toggle('d-none');
        }
    });
}


/* === ASSIGNED TO === */

/**
 * This function rendert the contact list in 'add task' dropdown 'assigend to'.
*/
function renderAddTaskContactList() {
    let search = document.getElementById('add-task-input-assigned-to').value;
    let contact = document.getElementById('add-task-contact-list');
    contact.innerHTML = '';
    let i = 0;

    users.map((element) => {
        const name = element.name;
        const initials = getInitials(name);

        if (name.toLowerCase().includes(search.toLowerCase())) {
            contact.innerHTML += getAddTaskContactCardHTML(name, initials, i);
        }

        i++;
    });

    markedUserAsClicked();
}

let addedUsersToTask = [];


function markedUserAsClicked() {
    addedUsersToTask.map((user) => {
        const checkbox = document.getElementById(`add-task-checkbox-${user.id}`);

        alreadyMarkedUsersAsClicked(user.id, 'add');
        checkbox.checked = true;
    })
}


/**
 * This fuction shows all data from the clicked contact in a separate window.
 * @param {integer} i is the index from arry users.
*/
function addedUserToTask(i) {
    const checkbox = document.getElementById(`add-task-checkbox-${i}`);

    if (checkbox.checked) {
        addedUsersToTask.push({ name: users[i]['name'], id: i }); //if task createt arry reset to default.
    } else {
        addedUsersToTask.splice(removeUserFromTask(i), 1);
        alreadyMarkedUsersAsClicked(i, 'remove');
    }

    renderAddedUserToTask();
}


/**
 * This function rendert the area under 'assigned to' with added user to task.
 */
function renderAddedUserToTask() {
    let container = document.getElementById('add-task-contact-added-users');
    container.innerHTML = '';

    addedUsersToTask.map((user) => {
        const initals = getInitials(user.name);
        const color = returnContactColor(user.id);

        container.innerHTML += getAddedContactsToTaskHTML(initals, color);

        alreadyMarkedUsersAsClicked(user.id, 'add');
    });
}


/**
 * This fucntion marked already clicked users.
 * @param {index} i is the index from array users.
 * @param {string} action is the action to remove or add the click style.
 */
function alreadyMarkedUsersAsClicked(i, action) {
    const contact = document.getElementById(`add-task-contact-${i}`);

    if (action == 'add') {
        contact.classList.add('contact-card-click');
    } else {
        contact.classList.remove('contact-card-click');
    }
}


function removeUserFromTask(i) {
    const index = addedUsersToTask.findIndex((user) => user.id == i);

    return index;
}


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
    } else if (categoryInput.value == '' && downArrow.classList.contains('d-none') && upArrow.classList.contains('d-none'))
        return 'input empty, dropdown open';
    else if (categoryInput.value) {
        return 'write'
    }
}


function addCategoryToList() {
    let newCategory = document.getElementById('add-task-input-category');

    categoriesTask.push(newCategory.value);
    newCategory.value = '';

    renderCategoryTask();
    showOrHideCategoryAddImg();
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

function createTask(action) {
    const title = document.getElementById('add-task-input-title');
    const description = document.getElementById('add-task-textarea-description');
    const dueDate = document.getElementById('add-task-input-date');
    const category = document.getElementById('add-task-input-category');

    switch (action) {
        case 'create':
            tasks.push(returnTask(title, description, dueDate, category));
            clearTask(title, description, dueDate, category);
            break;
        case 'clear':
            clearTask(title, description, dueDate, category);
            break;
    }
}

function clearTask(title, description, dueDate, category) {
    title.value = '';
    description.value = '';
    addedUsersToTask = [];
    dueDate.value = '';
    category.value = '';
    addedSubtasks = []

    removeMarkedPrio();
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