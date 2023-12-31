let currentContactIndex = 0;

/**
 * This function selects the opening or closing of the add new - or edit contact function depending on the parameter.
 * @param {string} id is the id from the add new - or edit contact overlay.
 * @param {string} action is the action for the overlay, 'open' or close.
 * @param {boolean} edit is the prameter to start the rendering from the edit contact overlay.
 */
function openOrCloseAddNewEditContact(id, action, edit=false) {
    let transparentBackground = document.getElementById('join-transparent-background-overlay-add-new-contact');
    let addNewEditContact = document.getElementById(id)

    if (action == 'open') {
        openAddNewEditContact(transparentBackground, addNewEditContact, edit);
    } else {
        closeAddNewEditContact(transparentBackground, addNewEditContact);
    }
}


/**
 * This function opens the add new - or edit contact overlay.
 * @param {object} transparentBackground is the background for the overlays.
 * @param {object} addNewEditContact is the overlay add new - or edit contact.
 * @param {boolean} edit is the prameter to start the rendering from the edit contact overlay.
 */
function openAddNewEditContact(transparentBackground, addNewEditContact, edit) {
    transparentBackground.classList.remove('d-none');
    addNewEditContact.classList.remove('d-none');

    currentOverlay = addNewEditContact;
    overlayWindowPosition('open', addNewEditContact);
    edit ? renderEditContact() : null;
}


/**
 * This function close the add new - or edit contact overlay.
 * @param {object} transparentBackground is the background for the overlays.
 * @param {object} addNewEditContact is the overlay add new - or edit contact.
 */
function closeAddNewEditContact(transparentBackground, addNewEditContact) {
    overlayWindowPosition('close', addNewEditContact);

    setTimeout(() => {
        transparentBackground.classList.add('d-none');
        addNewEditContact.classList.add('d-none');
    }, 240);
}


/**
 * This function rendert the contact information on 'edit contact' overlay.
 * @param {integer} i is the index number from array users.
 */
function renderEditContact() {
    const editProfileIcon = document.getElementById('edit-contact-profile-icon');
    const inputEditName = document.getElementById('edit-name');
    const inputEditEmail = document.getElementById('edit-email');
    const inputEditPhone = document.getElementById('edit-phone');
    const backgroundColor = returnContactColor(currentContactIndex);


    editProfileIcon.innerHTML = getInitials(users[currentContactIndex]['name']);
    editProfileIcon.style = `background-color: ${backgroundColor}`;

    inputEditName.value = users[currentContactIndex]['name'];
    inputEditEmail.value = users[currentContactIndex]['email'];
    inputEditPhone.value = users[currentContactIndex]['phone'];
}


/**
 * This function added a new contact to the array users.
 * @param {integer} i is the index number from array users.
 */
async function addNewContact() {
    let inputName = document.getElementById('add-new-name').value;
    let inputEmail = document.getElementById('add-new-email').value;
    let inputPhone = document.getElementById('add-new-phone').value;

    users.push({
        name: inputName,
        email: inputEmail,
        password: '',
        phone: inputPhone
    });

    [users, currentContactIndex] = sortUsers();

    await setItem('users', JSON.stringify(users))
    openOrCloseAddNewEditContact('add_new_contact_html', 'close');
    lastSelectedTemplate == 'contacts_html' ? showNewContact() : renderAddTaskContactList();
    addNewContactClear();
}


/**
* This function show the new added contact with contact data,
* and highlightetd the current card in the contactlist.
*/
function showNewContact() {
    startCreateContacts();
    contactData(currentContactIndex);

    let scrollPositionElement = document.getElementById(`contactCard-${currentContactIndex}`);
    scrollPositionElement.scrollIntoView({
        block: "end",
        behavior: "smooth"
    });

    informationSlidebox('information-slidebox-horizontal', 'Contact is succesfully created');
}


/**
 * This function clears the input fields in the 'add new contact' overlay.
 */
function addNewContactClear() {
    document.getElementById('add-new-name').value = '';
    document.getElementById('add-new-email').value = '';
    document.getElementById('add-new-phone').value = '';
}


/**
 * This fuction change the date from the current contact in array users,
 * and show the changing data.
 */
async function editContact() {
    let inputName = document.getElementById('edit-name').value;
    let inputEmail = document.getElementById('edit-email').value;
    let inputPhone = document.getElementById('edit-phone').value;

    users[currentContactIndex]['name'] = inputName;
    users[currentContactIndex]['email'] = inputEmail;
    users[currentContactIndex]['phone'] = inputPhone;

    await setItem('users', JSON.stringify(users))
    openOrCloseAddNewEditContact('edit_contact_html', 'close');
    startCreateContactData(currentContactIndex, false);
    informationSlidebox('information-slidebox-horizontal', 'Contact changed');
}


/**
 * This function delete the current contact in array users,
 * and show the result.
 * @param {integer} i is the index number from array users.
 * @param {boolean} openFalse decides whether the function is executed or not, default is true.
 */
async function deleteContact(i = currentContactIndex, openFalse = true) {
    const windowSize = window.matchMedia('(max-width: 1400px)');

    users.splice(i, 1);

    await setItem('users', JSON.stringify(users));
    startCreateContacts();
    clearContactData();
    informationSlidebox('information-slidebox-horizontal', 'Contact delete');

    if (windowSize.matches) openOrCloseContactDataMobile(currentContactIndex, false);
    if (openFalse) openOrCloseAddNewEditContact('edit_contact_html', 'close');
}


/**
 * This function check all conditions to disable or enable the button in add new - or edit contact.
 * @param {string} idInput is the id from the input field element.
 * @param {string} idWarning is the id from the warning text element.
 * @param {string} idButton is the id from the button element.
 */
function checkDisabledAddNewOrEditContactButton(idInput, idWarning, idButton) {
    let flag = validateEmailAlreadyExist(idInput, idWarning);

    let inputField = document.getElementById(idInput).value;
    let warning = document.getElementById(idWarning);
    let button = document.getElementById(idButton);

    if (!flag || flag && idInput == 'edit-email' &&
        users[currentContactIndex]['email'].toLowerCase().includes(inputField.toLowerCase())) {
        button.disabled = false;
        warning.classList.add('v-hidden');
    } else {
        button.disabled = true;
    }
}