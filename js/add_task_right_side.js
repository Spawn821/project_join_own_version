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
    { id: 'add-task-btn-urgent', class: 'add-new-task-priority-color-red'},
    { id: 'add-task-btn-medium', class: 'add-new-task-priority-color-orange'},
    { id: 'add-task-btn-low', class: 'add-new-task-priority-color-green'}
]

let currentPrio = '';

/**
 * This function changes the style from the clicked priority button in add task.
 * @param {string} id is the id from the respective priority button.
 */

function markedPrioAsClicked(prioText) {
    currentPrio = prioText;

    if (currentPrio != '') {
        let prioId = idPrioBtn.find((element) => element['id'].toLocaleLowerCase().includes(currentPrio.toLocaleLowerCase())).id;
        let prioClass = idPrioBtn.find((element) => element['id'].toLocaleLowerCase().includes(currentPrio.toLocaleLowerCase())).class;
        let prioBtn = document.getElementById(currentAddTask).querySelector('#' + prioId);

        removeMarkedPrio(prioId);

        prioBtn.classList.toggle(prioClass);

        !prioBtn.classList.contains(prioClass) ? currentPrio = '' : null;
    }
}


/**
 * This function removed the class to set a pio button marked.
 * @param {string} id is the id from the button.
 * @param {boolean} clear is the boolean value indicating that the clear command from add task or add task overlay has been executed.
 */
function removeMarkedPrio(id, clear = false) {
    idPrioBtn.map((element) => {
        let prioBtn = document.getElementById(currentAddTask).querySelector('#' + element.id);

        if (element.id == 'add-task-btn-medium' && clear) {
            prioBtn.classList.add(element.class);
            return;
        } else if (element.id != id) {
            prioBtn.classList.remove(element.class);
        }
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


/**
 * This function added a category to the list if is not existet and check if the input field is filled.
 */
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


/**
 * This function check if a category is allready exist.
 * @param {string} category is the current category.
 * @returns true or false if existet or not.
 */
function categoryExist(category) {
    return categoriesTask.find((element) => element['category'].toLowerCase() == category.toLowerCase());
}


/**
 * This function added a category to the array.
 * @param {string} newCategory is the name from the new category.
 */
function addCategoryToList(newCategory) {
    categoriesTask.push({ category: newCategory.value, id: categoriesTask.length });
    newCategory.value = '';

    setItem('categoriesTask', JSON.stringify(categoriesTask));
    renderCategoryTask();
}


/**
 * This function delete a categroy from the array.
 * @param {string} category is the name from the category.
 */
function deleteCategoryFromList(category) {
    categoriesTask.splice(categoryIndex(category), 1);

    setItem('categoriesTask', JSON.stringify(categoriesTask));
    renderCategoryTask();
}


/**
 * This function find the index from the current category.
 * @param {string} category is the name from the category.
 * @returns the index from the category.
 */
function categoryIndex(category) {
    return categoriesTask.findIndex((element) => element.category == category);
}


/**
 * This function fill the input field with the selected categroy.
 * @param {string} category is the name from the selected category.
 */
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


/**
 * This function set the input field as focused/active.
 * @param {object} newSubtask is the input field.
 */
function startInputSubtask(newSubtask) {
    newSubtask.focus();
}


/**
 * This function added a new subtask to the list and check if the input field is filled.
 * @param {object} newSubtask is the input field.
 */
function addSubtask(newSubtask) {
    if (newSubtask.value) {
        addSubtaskToArray(newSubtask);
    } else {
        addSubtaskError(newSubtask, 'The field is empty!');
    }
}


/**
 * This function added a new subtask to the array an clear the input field.
 * @param {object} newSubtask is the input field.
 */
function addSubtaskToArray(newSubtask) {
    addedSubtasks.push({ subtask: newSubtask.value, checked: false });

    newSubtask.value = '';

    renderSubtaskTask();
}


/**
 * This function changed the style from the input field if the added category or subtask allready exist or the field is empty.
 * @param {object} newSubtask is the input field.
 * @param {string} message is the message to appear in the input field.
 */
function addSubtaskError(newSubtask, message) {
    newSubtask.style.color = 'red';
    newSubtask.value = message;

    setTimeout(() => {
        newSubtask.value = '';
        newSubtask.style.color = 'black';

        cancelInputSubtask(newSubtask);
    }, 1500)
}


/**
 * This function set the input field to blur/not active.
 * @param {object} newSubtask is the input field.
 */
function cancelInputSubtask(newSubtask) {
    newSubtask.value = '';
    newSubtask.blur();
}


/**
 * This function allows you to edit a sutask.
 * @param {number} i is the index from the subtask.
 */
function editSubtask(i) {
    const changedSubtask = document.getElementById(`add-task-input-edit-subtask${i}`);
    const checked = addedSubtasks[i].checked;

    addedSubtasks.splice(i, 1, { subtask: changedSubtask.value, checked: checked });
    renderSubtaskTask();
}


/**
 * This function removes a subtask from the array.
 * @param {*} i 
 */
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