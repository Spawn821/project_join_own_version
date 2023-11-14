/* ======== */
/* ADD TASK */
/* ======== */

/**
 * This function returns html code which is needed for the contact list in 'add task'. 
 * @param {string} name is the username from array users.
 * @param {string} initials is the initials from the usersname.
 * @returns html code.
 */
function getAddTaskContactCardHTML(name, initials, i) {
    const color = returnContactColor(i);

    return /*html*/ `
        <div class="add-task-contact" id="add-task-contact-${i}">
            <div class="contact-name-area">
                <div class="contact-initals-icon f-s-w-12px-400" style="background-color: ${color}">${initials}</div>
                <span class="f-s-w-20px-400 contact-name-color-white">${name}</span>
            </div>
            <label class="checkbox-text-area">
                <input class="contact-card-click-check" type="checkbox" id="add-task-checkbox-${i}" onclick="addedUserToTask(${i})">
                <div id="add-task-check"></div>
            </label>
        </div>
    `;
}


/**
 * This function returns html code which is neede for the added contects under assigned to.
 * @param {string} initals is the initials from user.
 * @param {string} color is the rgb stlye from array contactColors.
 * @returns html code.
 */
function getAddedContactsToTaskHTML(initals, color) {
    return /*html*/ `
        <div class="contact-initals-icon f-s-w-12px-400" style="background-color: ${color}">${initals}</div>
    `;
}


/**
 * This funcion returns html code which is need for the category entry in add task.
 * @param {string} category is the category entry.
 * @param {integer} i is the index from array categoriesTask. 
 * @returns html code.
 */
function getCategoryEntryHTML(category) {
    return /*html*/ `
        <div class="add-task-category" onclick="selectCategory('${category}')">
            <span class="f-s-w-20px-400">${category}</span>
            <img src="/assets/img/icon_delete_white.png" onclick="deleteCategoryFromList('${category}'); isolateFromOderEvents(event)">
        </div>
    `;
}


/**
 * This function returns html code which is need for only added subtask.
 * @param {*} subtask is the text from added subtask
 * @param {*} i is the index in array subtasksTask.
 * @returns html code.
 */
function getAddedSubtaskHTML(subtask, i) {
    return /*html*/ `
        <div>
            <div class="input-img-area d-none" id="add-task-edit-task(${i})">
                <input class="input-whitout-border-right add-new-task-input-subtask f-s-w-20px-400"
                    type="text" id="add-task-input-edit-subtask${i}" placeholder="Add new subtask">
                <div class="input-img" id="add-task-input-change-subtask">
                    <img src="/assets/img/icon_delete_white.png" onclick="deleteSubtask(${i})">
                    <div class="separator-1px-lightgrey"></div>
                    <img src="/assets/img/icon_done_black_small.png" onclick="editSubtask(${i})">
                </div>
            </div>

            <div class="input-img-area" id="add-task-shown-task(${i})">
                <li class="input-whitout-border-right add-new-task-input-subtask f-s-w-20px-400"
                    type="text" id="add-task-input-subtask" placeholder="Add new subtask">
                    ${subtask}
                </li>
                <div class="input-img v-hidden" id="add-task-list-change-subtask">
                    <img src="/assets/img/icon_edit_black.png" onclick="changeSubtaskFromShownToEdit(${i})">
                    <div class="separator-1px-lightgrey"></div>
                    <img src="/assets/img/icon_delete_white.png" onclick="deleteSubtask(${i})">
                </div>
            </div>
        </div>
    `;
}



/* ===== */
/* BOARD */
/* ===== */

/**
 * This function returns html code which is need for task short card on board in the status columns.
 * @param {integer} i is the index number from array tasks.
 * @param {string} category is the category from the task.
 * @param {string} title is the title from the task.
 * @param {string} description is the descripten from the task.
 * @param {integer} numberSubtasks is the number from the subtask in the task.
 * @param {string} prioImg is the url from the priority img.
 * @returns html code.
 */
function getBoardShortCardHTML(i, category, categoryBackgroundColor, title, description, numberSubtasks, prioImg) {
    return /*html*/ `
        <div>
            <div class="board-short-card-panel background-color-white" id="board-short-card-panel_${i}"
                draggable="true" ondragstart="boardDrag(${i})" onclick="openDetailCard(${i})">

                <span class="board-short-card-category f-s-w-16px-400" style="background-color: ${categoryBackgroundColor}">${category}</span>

                <div class="board-short-card-title-description">
                    <span class="f-s-w-16px-700">${title}</span>
                    <span class="f-s-w-16px-400 color-grey" id="board-short-card-description_${i}">${description}...</span>
                </div>

                <div class="board-short-card-subtasks" id="board-short-card-subtasks_${i}">
                    <div class="board-short-card-subtasks-progress-bar-should">
                        <div class="board-short-card-subtasks-progress-bar-is" id="board-short-card-progress-bar-is_${i}"></div>
                    </div>
                    <div class="board-short-card-text-subtasks f-s-w-12px-400">
                        <div class="d-flex">
                            <span id="board-short-card-checked-subtasks_${i}">0</span>
                            <span>/</span>
                            <span>${numberSubtasks}</span>
                        </div>
                        <span>Subtasks</span>
                    </div>
                </div>

                <div class="board-short-card-assigned-to-priority" id="board-short-card-assigned-to-priority_${i}">
                    <div class="board-short-card-assigned-to" id="board-short-card-contacts_${i}">

                    </div>
                    <img src=${prioImg} alt="priority icon"></img>
                </div>

            </div>
        </div>
    `;
}


/**
 * This fuction returns html code which is need for only contact in the task.
 * @param {string} initals is the initials from the contact.
 * @param {string} backgroundColor is the respective rgb color from the contact.
 * @returns html code.
 */
function getBoardShortCardContactsHTML(initals, backgroundColor) {
    return /*html*/ `
        <div class="contact-initals-icon" style="background-color: ${backgroundColor}">${initals}</div>
    `;
}


function getBoardDetialCardContactsHTML(initals, name, backgroundColor) {
    return /*html*/ `
        <li class="contact-name-area">
            <div class="contact-initals-icon f-s-w-12px-400" style="background-color: ${backgroundColor}">${initals}</div>
            <span class="f-s-w-19px-400">${name}</span>
        </li>
    `;
}


function getBoardDetialCardSubtasksHTML(i, subtask) {
    return /*html*/ `
        <li>
            <label class="checkbox-text-area" onclick="isSubtaskChecked(${i})">
                <input type="checkbox" id="detailCardSubtask-${i}">
                <div></div>
                <span class="f-s-w-19px-400">${subtask}</span>
            </label>
        </li>
    `;
}



/* ======== */
/* CONTACTS */
/* ======== */

/**
 * This function returns html code which is needed for the kontaktlist.
 * @param {char} firstLetter is the first letter by the named contact.
 * @returns {object} html code.
 */
function getContactsLetterHeadlineHTML(firstLetter) {
    return /*html*/`
        <span class="contacts-letter-headline">${firstLetter}</span>
        <div class="separator-1px-lightgrey"></div>
    `;
}


/**
 * This function returns html code which is needed for the kontaktlist.
 * @param {integer} i is the index number from array users.
 * @param {string} colorStyle is the rgb code from array contactColors. 
 * @param {string} firstLetters is the first letter from the frist and second name from the contact.
 * @param {string} name is the full name from the contact.
 * @param {string} email is the email address from the contact.
 * @returns {object} html code.
 */
function getContactCardHTML(i, backgroundColor, initals, name, email) {
    return /*html*/`
        <div class="contact-card" onclick="openOrCloseContactData(${i})" id='contactCard-${i}'>
            <div class="contact-initals-icon f-s-w-12px-400" style="background-color: ${backgroundColor}">${initals}</div>
            <div class="contact">
                <span class="f-s-w-20px-400 contact-name-color-white">${name}</span>
                <span class="f-s-w-16px-400 color-blue">${email}</span>
            </div>
        </div>
    `;
}


/**
 * This function returns html code which is needed for the contact data window.
 * @param {integer} i is the index number from array users.
 * @param {string} colorStyle is the rgb code from array contactColors. 
 * @param {string} firstLetters is the first letter from the frist and second name from the contact.
 * @param {string} name is the full name from the contact.
 * @param {string} email is the email address from the contact.
 * @param {string} phone is the phone number from the contact.
 * @returns {object} html code.
 */
function getContactDataHTML(i, backgroundColor, initals, name, email, phone) {
    return /*html*/ `
        <div class="contact-data-name-area">
            <span class="contact-data-name-icon contact-initals-icon f-s-w-47px-500" style="background-color: ${backgroundColor}">${initals}</span>
            <div class="contact-data-name-headline">
                <h1 class="contact-data-name f-s-w-47px-500">${name}</h1>
                <div class="contact-data-name-edit-del-area contacts-point-menu-d-none" id="contact-data-name-edit-del-area">
                    <div class="contact-data-name-edit-del" onclick="openOrCloseAddNewEditContact('edit_contact_html', 'open', true)">
                        <div class="contact-data-name-edit"></div>
                        <span class="f-s-w-16px-400">Edit</span>
                    </div>
                    <div class="contact-data-name-edit-del" onclick="deleteContact(${i}, false)">
                        <div class="contact-data-name-delete"></div>
                        <span class="f-s-w-16px-400">Delete</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="contact-data-info-area">
            <span class="f-s-w-20px-400">Contact Information</span>
            <div class="contact-data-info-content">
                <span class="f-s-w-16px-700">Email</span>
                <span class="f-s-w-16px-400 color-blue">${email}</span>
                <span class="f-s-w-16px-700">Phone</span>
                <span class="f-s-w-16px-400">${phone}</span>
            </div>
        </div>
    `;
}