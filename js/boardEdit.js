/**
 * function to delete the card
 */
async function deleteCard() {
    document.getElementById('detailCard').style.display = 'none';
    await deleteItem('tasks', currentOpenCard);
    renderInit();
}
/**
 * function to check if subtask is present if no then hide the container
 * @param {*} q parameter q is passed as card number
 */
function subTaskCard(q) {
    const subtaskBoard = allTasks[q]['subtasks'];

    if (subtaskBoard.length <= 0) {
        document.getElementById(`progressBar_${q}`).style.display = 'none';
    } else {
        loadAllTaskNumber(q);
    }
}
/**
 * here the number of subtasks are loaded
 * @param {*} q parameter q is passed as card number
 */
function loadAllTaskNumber(q) {
    let subtaskState = allTasks[q]['subtaskstate'];
    let completedTasks = subtaskState.filter(status => status === 'true').length;
    let unfinishedTasks = subtaskState.length;
    document.getElementById(`allTasksNumber_${q}`).textContent = unfinishedTasks; // Anzahl der unerledigten Aufgaben
    document.getElementById(`TasksNumber_${q}`).textContent = completedTasks; // Anzeige der erledigten Aufgaben

    updateProgressBar(q, completedTasks);
}

function updateProgressBar(q) {
    const subtaskState = allTasks[q]['subtaskstate'];
    const completedTasks = subtaskState.filter(status => status === 'true').length;
    const totalTasks = subtaskState.length;

    const progressBar = document.getElementById(`bar_${q}`);
    const percent = (completedTasks / totalTasks) * 100;

    progressBar.style.width = `${percent}%`;
}

async function addFeedback(columnStatus) {
    fillAssignedTo();
    boardStatus = columnStatus
    openAndCloseAddNewEditContact('add-new-task-include-HTML', 'add-new-task')
}

function editButton(q, title, description, date, priority) {
    document.getElementById('editContacts').innerHTML = /*html*/ `
        <div class="editContain" id="editContain">
            <img src="assets/img/edit.svg" onclick="addEdit('${q}', '${title}', '${description}', '${date}', '${priority}')" class="editIcon">
        </div>
        <p class="editText">Edit</p>
    `;
}

function addEdit(q, title, description, date, priority) {
    saveEditButton(q);
    hideButton();
    document.getElementById('taskOverlayHeadline').innerHTML = /*html*/ `
    <input class="inputBoard1" id='inputTitleBoard' value='${title}'>`;

    document.getElementById('descriptionContain').innerHTML =/*html*/`
    <input class="inputBoard1" id = "inputDescriptionContain" value = '${description}'>`;

    document.getElementById('taskOverlayNumber').innerHTML =/*html*/`
    <input class="inputBoard1" type="date" name="inputBoard" id="inputBoardDate" value='${date}' onmouseover="setDateOfTodayForDatepickerCard('inputBoard');">`;
    editPrioBoard(priority);
    editSubtasks(q);
}

function editSubtasks(q) {
    if (tasks[q].subtasks && tasks[q].subtaskstate) {
        // Schleife durch die Subtasks und ihren Status
        for (let i = 0; i < tasks[q].subtasks.length; i++) {
            // Hier wird überprüft, ob der Status "true" oder "false" ist
            if (tasks[q].subtaskstate[i] === 'true') {
                // Wenn der Status bereits "true" ist, behalte ihn bei
                continue;
            }

            // Hier kannst du den Subtask-Status aktualisieren, wenn er "false" ist
            tasks[q].subtaskstate[i] = 'true';
        }
    }
    document.getElementById('subtaskContain').innerHTML += /*html*/ `
        <input class="inputBoard1" type="text" id="inputSubtasks" value=''>`;
}

function editPrioBoard(priority) {
    const priorities = ["urgent", "medium", "low"];
    const dropdown = document.getElementById('medium');
    dropdown.innerHTML = `
        <select class="inputBoard1" id="inputPrio">
            ${priorities.map(p => `<option>${p}</option>`).join('')}
        </select>`;
    const inputPrio = document.getElementById('inputPrio');
    inputPrio.value = priority;
}

function saveEditButton(q) {
    document.getElementById('saveContacts').innerHTML = /*html*/ `
        <button class="saveButton" onclick="saveEdit(${q})">Save</button>
    `;
}

async function saveEdit(q) {
    const newTitle = document.getElementById('inputTitleBoard').value;
    const newDescription = document.getElementById('inputDescriptionContain').value;
    const newDate = document.getElementById('inputBoardDate').value;
    const newPriority = document.getElementById('inputPrio').value;
    const newSubtasksInput = document.getElementById('inputSubtasks');

    const newSubtasks = newSubtasksInput.value
        .split('\n')
        .map(subtask => subtask.trim())
        .filter(subtask => subtask !== '');

    if (tasks[q].subtasks) {
        tasks[q].subtasks = tasks[q].subtasks.concat(newSubtasks);
    } else {
        tasks[q].subtasks = newSubtasks;
    }

    tasks[q].title = newTitle;
    tasks[q].description = newDescription;
    tasks[q].date = newDate;
    tasks[q].prio = newPriority;
    await setItem('tasks', JSON.stringify(tasks));

    showButton();
    await refreshData();
    closeDetailCard();
}

function hideButton() {
    document.getElementById('editContacts').style.display = 'none';
    document.getElementById('prioMedia').style.display = 'none';
    document.getElementById('deleteButtonBoard').style.display = '';
    document.getElementById('saveContacts').style.display = '';
}

function showButton() {
    document.getElementById('saveContacts').style.display = 'none';
    //document.getElementById('deleteButtonBoard').style.display = 'none';
    document.getElementById('prioMedia').style.display = '';
    document.getElementById('editContacts').style.display = '';
}

//function deleteSubtask(q) {
//    const subtas = tasks[q]['subtasks']
//    for (let w = 0; w < subtas.length; w++) {
//        const subtasksEdit = subtas[w];
//
//        if (w >= 0 && w < subtasksEdit.length) {
//            subtasksEdit.splice(w, 1);
//            tasks[q]['subtasks'] = subtasksEdit;
//            closeDetailCard();
//        } else {
//            console.error('Ungültiger Index für Subtask-Löschung.');
//        }
//    }
//}

function deleteSubtask(q, subtaskName) {
    const subtasksArray = tasks[q]['subtasks'];

    // Suche den Index des Subtasks anhand seines Namens
    const subtaskIndex = subtasksArray.indexOf(subtaskName);

    if (subtaskIndex !== -1) {
        subtasksArray.splice(subtaskIndex, 1);
        closeDetailCard();
    } else {
        console.error('Subtask mit dem Namen nicht gefunden.');
    }
}