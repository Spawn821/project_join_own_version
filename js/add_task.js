let tasks = [];
let boardStatus = 'to do';

async function initAddTask() {
    await includeHTML();
    await loadUsers();
    await fillAssignedTo();
    await loadTasks();
    userInitials();
}

// #region Coloring Buttons Urgent, Medium, Low / Set status of Prio for transfer to Board

/**
 * By clicking a Prio button color change to red, orange or green
 */
function colorRed() {
    let btn = document.getElementById('btn_urgent');
    if (btn.classList.length > 1) {
        whiteBackgroundRedArrow(btn);
        setPrioStatusAsString('');
    }
    else {
        btn.classList.add('button-red');
        pushToFront('arrowWhiteUrgent');
        pushToBackground('arrowRedUrgent');
        setPrioStatusAsString('urgent');
    }
    whiteBackgroundOrangeArrow(document.getElementById('btn_medium'));
    whiteBackgroundGreenArrow(document.getElementById('btn_low'));
}

function colorOrange() {
    let btn = document.getElementById('btn_medium');
    if (btn.classList.length > 1) {
        whiteBackgroundOrangeArrow(btn);
        setPrioStatusAsString('');
    }
    else {
        btn.classList.add('button-orange');
        pushToFront('arrowWhiteMedium');
        pushToBackground('arrowOrangeMedium');
        setPrioStatusAsString('medium');
    }
    whiteBackgroundRedArrow(document.getElementById('btn_urgent'));
    whiteBackgroundGreenArrow(document.getElementById('btn_low'));
}

function colorGreen() {
    let btn = document.getElementById('btn_low');
    if (btn.classList.length > 1) {
        whiteBackgroundGreenArrow(btn);
        setPrioStatusAsString('');
    }
    else {
        btn.classList.add('button-green');
        pushToFront('arrowWhiteLow');
        pushToBackground('arrowGreenLow');
        setPrioStatusAsString('low');
    }
    whiteBackgroundRedArrow(document.getElementById('btn_urgent'));
    whiteBackgroundOrangeArrow(document.getElementById('btn_medium'));
}

/**
 * By clicking a prio button twice it changed to white (neutral)
 * 
 * @param {object} btn - one of the Prio buttons
 */
function whiteBackgroundRedArrow(btn) {
    btn.classList.remove('button-red');
    document.getElementById('arrowWhiteUrgent').classList.remove('z-index-1');
    document.getElementById('arrowRedUrgent').classList.remove('z-index-n1');
}

function whiteBackgroundOrangeArrow(btn) {
    btn.classList.remove('button-orange');
    document.getElementById('arrowWhiteMedium').classList.remove('z-index-1');
    document.getElementById('arrowOrangeMedium').classList.remove('z-index-n1');
}

function whiteBackgroundGreenArrow(btn) {
    btn.classList.remove('button-green');
    document.getElementById('arrowWhiteLow').classList.remove('z-index-1');
    document.getElementById('arrowGreenLow').classList.remove('z-index-n1');
}

function pushToFront(obj) {
    document.getElementById(obj).classList.add('z-index-1');
}

function pushToBackground(obj) {
    document.getElementById(obj).classList.add('z-index-n1');
}

function setPrioStatusAsString(status) {
    document.getElementById('prioStatusAsString').innerHTML = status;
}

/**
 * by reloading page change all prio buttons to neutral
 */
function clearPrioButtons() {
    btnUrgent = document.getElementById('btn_urgent')
    btnMedium = document.getElementById('btn_medium')
    btnLow = document.getElementById('btn_low')

    if (btnUrgent.classList.length > 1) {
        whiteBackgroundRedArrow(btnUrgent);
        setPrioStatusAsString('');
    }
    if (btnMedium.classList.length > 1) {
        whiteBackgroundOrangeArrow(btnMedium);
        setPrioStatusAsString('');
    }
    if (btnLow.classList.length > 1) {
        whiteBackgroundGreenArrow(btnLow);
        setPrioStatusAsString('');
    }
}

// #endregion region Coloring Buttons Urgent Medium Low

// #region Data from Add Task to Backend

/**
 * clicking Create task saves task data in array and reset current page
 * 
 * @param {*} validatedPage - superior page of calling function
 */
async function register_task(validatedPage) {
    tasks.push({
        title: cleanInputString(title.value),
        description: cleanInputString(description.value),
        selectAssignedTo: contactsInTask,
        date: date.value,
        prio: document.getElementById('prioStatusAsString').innerText,
        category: selectedCategory.innerText,
        subtasks: subtasks,
        column: boardStatus,
        subtaskstate: subtaskstate()
    });
    await setItem('tasks', JSON.stringify(tasks));
    resetForm2(validatedPage);
}

/**
 * set subtaskstate for all tasks to false
 */
function subtaskstate() {
    let subtaskstate = [];
    for (let i = 0; i < subtasks.length; i++) {
        subtaskstate[i] = 'false';
    }
    return subtaskstate;
}

/**
 * To avoid error by enter bad title
 * 
 * @param {string} input - content of field for input
 * @returns {string} - corrected input data
 */
function cleanInputString(input) {
    const pattern = /[<>&"'/\\]/g;
    const sanitizedInput = input.replace(pattern, '');
    const trimmedInput = sanitizedInput.trim();
    return trimmedInput;
}

/**
 * clear all temporary arrays of add task and reload page
 * 
 * @param {*} validatedPage - superior page of calling function
 */
function resetForm2(validatedPage) {
    title.value = '';
    description.value = '';
    contactsInTask = [];
    selectAssignedTo.innerHTML = '';
    date.value = '';
    subtasks = [];
    document.getElementById('selectedSubtasks').innerHTML = '';
    document.getElementById('selected-contacts-circles-below').innerHTML = '';
    reloadPage(validatedPage);
    addNewTaskShowSlideBox('Task created');
}

// #endregion Data from Add Task to Backend

// #region select contact logic
let categoryClosed = false;

/**
 * function for hiding containers
 * 
 * @param {string} classname - contains id of container
 */
function add_d_none(classname) {
    if (!document.getElementById(classname).classList.contains('d-none')) {
        document.getElementById(classname).classList.add('d-none');
    }
}

/**
 * function for hiding containers
 * 
 * @param {string} classname - contains id of container
 */
function remove_d_none(classname) {
    if (document.getElementById(classname).classList.contains('d-none')) {
        document.getElementById(classname).classList.remove('d-none');
    }
}

/**
 * push dropdown of contacts to background (close Dropdown)
 * 
 * @param {string} field - contains id of container
 */
function selectContactFieldInBackground(field) {
    add_d_none('selectContactField');
    if (document.getElementById(field).classList.contains('d-none')) {
        remove_d_none(field);
        remove_d_none('uparrow');
    }
}

function closeContactList() {
    if (!document.getElementById('contentSearchContact').classList.contains('d-none')) {
        add_d_none('contentSearchContact');
        remove_d_none('selectContactField');
        add_d_none('uparrow');
        remove_d_none('downarrow');
    }
}


function showContentCategory() {
    if (document.getElementById('contentCategory').classList.contains('d-none') && (categoryClosed == false)) {
        remove_d_none('contentCategory');
    }
    if (categoryClosed == false) {
        remove_d_none('uparrow_cat');
        add_d_none('downarrow_cat');
    }
    categoryClosed = false;
}

function closeContentCategory() {
    add_d_none('uparrow_cat');
    add_d_none('contentCategory');
    remove_d_none('downarrow_cat');
    categoryClosed = true;
}

function selectCategory(i) {
    let selectedCategory = document.getElementById('selectedCategory');
    selectedCategory.innerHTML = document.getElementById('category' + i).innerHTML;
}



function borderLightblue(id) {
    if (document.getElementById(id).classList.contains('borderLightblue')) {
        document.getElementById(id).remove('borderLightblue');
    }
    else {
        document.getElementById(classname).add('borderLightblue');
    }
}
// #endregiion select contact logic

// #region add Subtask

/**
 * Add a subtask. Optional field. Plus button only working when filled field.
 */

let subtaskNumber = 0;

function addSubtask() {
    if (document.getElementById('subtaskInputfield').value) {
        subtaskInputfield = document.getElementById('subtaskInputfield').value;
        selectedSubtasks = document.getElementById('selectedSubtasks');
        selectedSubtasks.innerHTML += /*html*/`        
            <div class="oneSelectedSubtask" onmouseover="showEdit('pencil-bin${subtaskNumber}');" onmouseout="closeEdit('pencil-bin${subtaskNumber}')" id="oneSubtask${subtaskNumber}">                
                <div style="display: flex; width: 100%">
                    •<div id="rawData${subtaskNumber}">
                        ${subtaskInputfield}
                    </div>
                    <input class="inputChangeSubtask d-none" id="rawDataChange${subtaskNumber}" type="text" value="${subtaskInputfield}">
                </div>                              
                <div class="pencil-bin d-none" id="pencil-bin${subtaskNumber}">
                    <img src="assets/img/Subtasks_pencil.svg" id="pencil${subtaskNumber}"
                        onclick="editSubtask(${subtaskNumber});">
                    <div class="pencil-bin-separator"></div>
                    <img src="assets/img/Subtasks_bin.svg" onclick=deleteSubtask(${subtaskNumber})>
                    <img src="assets/img/check_black.svg" class="d-none" id="submit${subtaskNumber}" 
                        onclick="saveSubtaskChanges('rawDataChange${subtaskNumber}', 'rawData${subtaskNumber}', '${subtaskNumber}'); 
                        add_d_none('rawDataChange${subtaskNumber}'); remove_d_none('rawData${subtaskNumber}'); 
                        remove_d_none('pencil${subtaskNumber}'); add_d_none('submit${subtaskNumber}')">                                        
                </div>    
            </div>  
    `
        document.getElementById('subtaskInputfield').value = '';
        subtaskNumber++;
        fillSubtaskArray();
    }
}

function editSubtask(subtaskNumber) {
    remove_d_none('rawDataChange' + subtaskNumber);
    add_d_none('rawData' + subtaskNumber);
    add_d_none('pencil' + subtaskNumber);
    remove_d_none('submit' + subtaskNumber);
}

/**
 * User can change a written subtask. To confrim changes he can click on hook to save the changes
 * 
 * @param {string} changedValue - include the changes
 * @param {string} goal - includes previous text of subtask
 * @param {string} subtaskNumber - sveral subtasks are possible, hence a subtask number
 */
function saveSubtaskChanges(changedValue, goal, subtaskNumber) {
    document.getElementById(goal).value = document.getElementById(changedValue).value;
    fillSubtaskArrayAsValue(subtaskNumber);
    document.getElementById(`rawData${subtaskNumber}`).innerHTML = /*html*/`
        ${document.getElementById(changedValue).value}
    `

}

function fillSubtaskArray() {
    subtasks = [];
    for (let i = 0; i < 100; i++) {
        let element = document.getElementById('rawData' + i)

        if (element) {
            subtasks.push(element.innerText);
        }

    }
}

function fillSubtaskArrayAsValue(subtaskNumber) {
    // subtasks = [];
    // for (let i = 0; i < 100; i++) {
    let element = document.getElementById('rawData' + subtaskNumber)

    if (element) {
        subtasks[subtaskNumber] = element.value;  // hier als value
    }

    // }
}

function showEdit(x) {
    let classList = document.getElementById(x).classList;
    classList.remove('d-none');
    // remove_d_none('pencil-bin'+i);
}

function closeEdit(x) {
    let classList = document.getElementById(x).classList;
    classList.add('d-none');
}

/**
 * delete a specific subtask
 * 
 * @param {string} x - number of subtask to be delted
 */
function deleteSubtask(x) {
    let oneSubtaskToDelete = document.getElementById(`oneSubtask${x}`);

    for (let i = 0; i < subtasks.length; i++) {
        const currentSubtask = subtasks[i];

        if (document.getElementById('rawData' + x).innerHTML === currentSubtask) {
            subtasks.splice(i, 1);
        }
    }
    oneSubtaskToDelete.innerHTML = '';
    fillSubtaskArray();
}

/**
 * reset Add Task: set white background if colored
 * 
 * @param {string} classname - id of prio button
 */
function changeWhiteBackground(classname) {
    let surface = document.getElementById(classname).classList
    if (surface.contains('white-background')) {
        surface.remove('white-background');
    }
    else {
        surface.add('white-background');
    }
}

// #endregion add Subtask

//#region Validation

/**
 * check mandatory fields of Add Task 
 * 
 * @param {string} validatedPage - superior page of calling function
 */
function custValidation(validatedPage) {

    let valid = true;

    title = document.getElementById('title');
    if (title.value == '') {
        setRedBorder('title');
        remove_d_none('titleInvalid');
        valid = false;
    }

    description = document.getElementById('description');
    if (description.value == '') {
        setRedBorder('description');
        remove_d_none('descriptionInvalid');
        valid = false;
    }

    selectAssignedTo = document.getElementById('selected-contacts-circles-below');
    if (selectAssignedTo.innerText == '') {
        setRedBorder('selectAssignedTo');
        remove_d_none('selected-contacts-circles-below');
        valid = false;
    }

    date = document.getElementById('date');
    if (date.value == '') {
        setRedBorder('date');
        remove_d_none('dateInvalid');
        valid = false;
    }

    prioStatusAsString = document.getElementById('prioStatusAsString');
    if (prioStatusAsString.innerText == '') {
        setRedBorder('all-buttons-prio');
        remove_d_none('prioInvalid');
        valid = false;
    }

    if (document.getElementById('selected-contacts-circles-below').innerText == '') {
        setRedBorder('selectContactField');
        remove_d_none('assignedToInvalid');
        valid = false;
    }

    category = document.getElementById('selectedCategory');
    if (category.innerText == 'Select task category') {
        setRedBorder('categoryId');
        remove_d_none('categoryInvalid');
        valid = false;
    }

    if (valid) {
        register_task(validatedPage);
    }
}

/**
 * invalid containers are colored red
 * 
 * @param {string} classname - id of container to color red because it is not valid
 */
function setRedBorder(classname) {
    // unsetBlueBorder(classname);
    classList = document.getElementById(classname).classList;

    if (!classList.contains('redBorder')) {
        classList.add('redBorder');
    }
}

//#endregion Validation

//#region set Date Minimum for Datepicker

/**
 * functions to set today's date for disable past calendar days
 */
async function setDateOfTodayForDatepicker(inputName) {
    let today = new Date().toISOString().split('T')[0];
    document.getElementsByName(inputName)[0].setAttribute('min', today);
}

function setDateOfTodayForDatepickerCard(inputId) {
    let today = new Date().toISOString().split('T')[0];
    document.getElementsByName(inputId)[0].setAttribute('min', today);
}
//#endregion set Date Minimum for Datepicker

/**
 * after page has been validated, reload it
 * 
 * @param {*} validatedPage - superior page of calling function
 */
function reloadPage(validatedPage) {
    clearPrioButtons();
    validatedPage == 'add_task' ? getAddTask() : getBoard();
}

/**
 * filter the contacts according user input
 */
function filterNames() {
    let search = document.getElementById('searchContactField').value;
    search = search.toLowerCase();

    document.getElementById('selectAssignedTo').innerHTML = '';
    for (let i = 0; i < users.length; i++) {
        let user = users[i].name;
        if (user.toLowerCase().includes(search)) {
            document.getElementById('selectAssignedTo').innerHTML += showDropdown(i, user);
            fillUsername(i, user);
        }
    }
}








function showOrHideDropDownAddTask(id) {

    for (let i = 0; i < id.length; i++) {
        let dropdownElement = document.getElementById(id[i]);

        if (id[i] == 'add-task-subtask') {

            if (dropdownElement.style == 'margin-top: -96px') {
                dropdownElement.removeAttribute('style');
            } else {
                dropdownElement.style = 'margin-top: -96px; z-index: -1;';
            }
        } else {
            dropdownElement.classList.toggle('d-none');
        }

    }

}