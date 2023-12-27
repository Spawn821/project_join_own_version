/* === DROPDOWNS === */

const dropDownIdsAssignedTo = [
    'add-task-contact-btn-area',
    'add-task-wrapper-contact',
    'add-task-contact-arrow-open',
    'add-task-contact-arrow-close'
];

const dropDownIdsCategory = [
    'add-task-category-list',
    'add-task-wrapper-category',
    'add-task-category-arrow-open',
    'add-task-add-new-category'
];

let currentAddTask = '';

/**
 * This function show or hide elements, based on the given array list.
 * @param {string} area is the element to be filled with content.
 * @param {string} action is the action for the element, 'open' or 'close'.
*/
function dropDownAddTask(area, action) {
    let ids = area == 'assigned to' ? dropDownIdsAssignedTo : dropDownIdsCategory;

    ids.map((element) => {
        let dropdownElement = document.getElementById(currentAddTask).querySelector('#' + element);

        if (action == 'open') {
            openDropDonwsAddTask(element, dropdownElement)
        } else {
            closeDropDonwsAddTask(element, dropdownElement)
        }

    });
}


/**
 * This function executes all option so that the element (dropdown) can be opened.
 * @param {string} element is the id from a element.
 * @param {object} dropdownElement is the dropdown element.
 */
function openDropDonwsAddTask(element, dropdownElement) {
    if (element == 'add-task-wrapper-contact' || element == 'add-task-wrapper-category') {
        if (dropdownElement.querySelector('.p-absolute')) {
            dropdownElement.classList.remove('b-bottom-left-radius');
            dropdownElement.classList.remove('b-bottom-right-radius');
        }
        dropdownElement.classList.add('box-shadow-0-2-4-0');
    } else {
        if (element == 'add-task-contact-arrow-open' || element == 'add-task-category-arrow-open') {
            dropdownElement.classList.add('d-none');
        } else {
            dropdownElement.classList.remove('d-none');
        }
    }
}


/**
 * This function executes all option so that the element (dropdown) can be closed.
 * @param {string} element is the id from a element.
 * @param {object} dropdownElement is the dropdown element.
 */
function closeDropDonwsAddTask(element, dropdownElement) {
    if (element == 'add-task-wrapper-contact' || element == 'add-task-wrapper-category') {
        dropdownElement.classList.add('b-bottom-left-radius');
        dropdownElement.classList.add('b-bottom-right-radius');
        dropdownElement.classList.remove('box-shadow-0-2-4-0');
    } else {
        if (element == 'add-task-contact-arrow-open' || element == 'add-task-category-arrow-open') {
            dropdownElement.classList.remove('d-none');
        } else {
            dropdownElement.classList.add('d-none');
        }
    }
}


/* === ASSIGNED TO === */

/**
 * This function rendert the contact list in 'add task' dropdown 'assigend to'.
*/
function renderAddTaskContactList() {
    let search = document.getElementById(currentAddTask).querySelector('#add-task-input-assigned-to').value;
    let contact = document.getElementById(currentAddTask).querySelector('#add-task-contact-list');
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

/**
 * This function set a css class to marked a clicked contact in the dropdown list.
 */
function markedUserAsClicked() {
    addedUsersToTask.map((user) => {
        const checkbox = document.getElementById(currentAddTask).querySelector(`#add-task-checkbox-${user.id}`);

        alreadyMarkedUsersAsClicked(user.id, 'add');

        try {
        checkbox.checked = true;
        } catch {
            return;
        }
    })
}


/**
 * This fuction shows all data from the clicked contact in a separate window.
 * @param {integer} i is the index from arry users.
*/
function addedUserToTask(i) {
    const contact = document.getElementById(currentAddTask).querySelector(`#add-task-contact-${i}`);
    const checkbox = document.getElementById(currentAddTask).querySelector(`#add-task-checkbox-${i}`);

    if (!contact.classList.contains('contact-card-click')) {
        checkbox.checked = true;
        addedUsersToTask.push({ name: users[i]['name'], id: i }); //if task createt array reset to default.
    } else {
        checkbox.checked = false;
        addedUsersToTask.splice(removeUserFromTask(i), 1);
        alreadyMarkedUsersAsClicked(i, 'remove');
    }

    renderAddedUserToTask();
}


/**
 * This function rendert the area under 'assigned to' with added user to task.
 */
function renderAddedUserToTask() {
    let container = document.getElementById(currentAddTask).querySelector('#add-task-contact-added-users');
    container.innerHTML = '';

    addedUsersToTask.map((user) => {
        const initals = getInitials(user.name);
        const color = returnContactColor(user.id);

        container.innerHTML += getAddedContactsToTaskHTML(initals, color);

        alreadyMarkedUsersAsClicked(user.id, 'add');
    });
}


/**
 * This function marked already clicked users.
 * @param {index} i is the index from array users.
 * @param {string} action is the action to remove or add the click style.
 */
function alreadyMarkedUsersAsClicked(i, action) {
    let contact = document.getElementById(currentAddTask).querySelector(`#add-task-contact-${i}`);

    try {
        if (action == 'add') {
            contact.classList.add('contact-card-click');
        } else {
            contact.classList.remove('contact-card-click');
        }
    } catch {
        return;
    }
}


/**
 * This function removes a contact initials symbole under assigned to.
 * @param {number} i is the index number from the contact.
 * @returns the found index number from array addedUsersToTask.
 */
function removeUserFromTask(i) {
    const index = addedUsersToTask.findIndex((user) => user.id == i);

    return index;
}