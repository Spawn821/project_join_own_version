let existLetterHeadline = '';


/**
 * This function initalized the function to load the contacts side.
 */
async function initContacts() {
    await loadUsers();
    renderContacts();
    userInitials();
}


/**
 * This function rendes the contacts in the contactlist.
 */
function renderContacts() {
    let contactsList = document.getElementById('contacts-list');
    contactsList.innerHTML = '';
    let colorNumberIndex = 0;

    for (let i = 0; i < users.length; i++) {
        const [name, email] = [users[i]['name'], users[i]['email']];
        const firstLetter = users[i]['name'].charAt(0);
        const colorStyle = returnContactColor(i);

        addLetterHeadline(firstLetter, contactsList);

        let firstLetters = getInitials(name);
        contactsList.innerHTML += getContactCardHTML(i, colorStyle, firstLetters, name, email)

        colorNumberIndex++;
        colorNumberIndex >= contactColors.length ? colorNumberIndex = 0 : null;
    }
}


/* added the letter category for contacts A, B, C etc. */
/**
 * This fuction added the letter to display the contacts alphabetically.
 * @param {char} firstLetter is the first letter from the current username.
 * @param {object} contactsList is the container to added the content.
 */
function addLetterHeadline(firstLetter, contactsList) {
    if (existLetterHeadline.toLocaleLowerCase() != firstLetter.toLocaleLowerCase() || existLetterHeadline == '') {
        contactsList.innerHTML += getLetterHeadlineHTML(firstLetter.toUpperCase());
        existLetterHeadline = firstLetter;
    }
}


/**
 * This fuction shows all data from the clicked contcat in a separate window.
 * @param {integer} i is the index from arry users.
 */
function openContactData(i) {
    let contactCard = document.getElementById(`contactCard-${i}`);
    let conatacts = document.getElementById('contacts');
    let contactData = document.getElementById('contact-data');
    let windowSize = window.matchMedia('(max-width: 1350px)');

    if (contactCard.classList.contains('contact-card-click')) {
        contactCard.classList.remove('contact-card-click');
        clearContactData();
    } else {
        if (windowSize.matches) {
            conatacts.classList.add('contact-data-d-none');
            contactData.classList.remove('contact-data-d-none');
        } else {
            closeAllContactClicks();
            contactCard.classList.add('contact-card-click');
        }
        renderContactData(i);
    }

    currentContactIndex = i;
}


/**
 * This fuction close the contact data which were shown in a separate window.
 */
function closeContactData() {
    let conatacts = document.getElementById('contacts');
    let contactData = document.getElementById('contact-data');

    conatacts.classList.remove('contact-data-d-none');
    contactData.classList.add('contact-data-d-none');

    closeAllContactClicks();
}


/* render the screen 'contactdata' with the datas from clicked contact */
/**
 * This function renders the contactdata in separate window,
 * and show this with a slide effect.
 * @param {integer} i is the index number from the array users.
 */
function renderContactData(i) {
    let content = document.getElementById('contact-data-content');
    content.innerHTML = '';


    const name = users[i]['name'];
    const email = users[i]['email'];
    const phone = users[i]['phone'];
    const firstLetters = getInitials(name);
    const colorStyle = returnContactColor(i);

    setTimeout(() => {
        content.innerHTML = getContactDataHTML(i, colorStyle, firstLetters, name, email, phone)
        content.classList.add('contact-slide-animation')
    }, 50);
}


/**
 * This function clears the container with the contactdatas.
 */
function clearContactData() {
    let content = document.getElementById('contact-data-content');

    content.innerHTML = '';
    content.classList.remove('contact-slide-animation');
}


/**
 * This function search contacts that have been highlighted as clicket and removed this. 
 */
function closeAllContactClicks() {
    clearContactData();

    let allClicks = document.querySelectorAll('div.contact-card-click');

    for (let i = 0; i < allClicks.length; i++) {
        let currentClick = allClicks[i];

        currentClick.classList.remove('contact-card-click');
    }
}


/**
 * open the ponit menu in the responsive view and lets it slide in.
 */
function openEditContactPointMenu() {
    let editContactPointMenu = document.getElementById('contact-data-name-edit-del-area')

    editContactPointMenu.classList.remove('contact-data-name-edit-del-area-slideout-animation');
    editContactPointMenu.classList.add('contact-data-name-edit-del-area-slidein-animation');

    editContactPointMenu.classList.remove('contacts-point-menu-d-none');
}

function closeEditContactPointMenu() {
    let editContactPointMenu = document.getElementById('contact-data-name-edit-del-area')

    editContactPointMenu.classList.remove('contact-data-name-edit-del-area-slidein-animation');
    editContactPointMenu.classList.add('contact-data-name-edit-del-area-slideout-animation');

    setTimeout(() => {
        editContactPointMenu.classList.add('contacts-point-menu-d-none');
    }, 500);
}


/**
 * This function excludes a child container from the parent container's onclick method. 
 */
function notToClose(event) {
    event.stopPropagation();
}


/**
 * This function switch between contactlist and contactdata if media matches.
 */
window.addEventListener('resize', () => {
    let contactCard = document.getElementById(`contactCard-${currentContactIndex}`);
    let contacts = document.getElementById('contacts');
    let contactData = document.getElementById('contact-data');
    let contactDataContent = document.getElementById('contact-data-content');
    let windowSize = window.matchMedia('(max-width: 1350px)');
    let flag = false;
    try {
        contactDataContent.childNodes.length == 1 ? contactDataContent.innerHTML = '' : null;
        if (windowSize.matches && contactDataContent.innerHTML > '') {
            contacts.classList.add('contact-data-d-none');
            contactData.classList.remove('contact-data-d-none');
            flag = true;
        } else {
            contacts.classList.remove('contact-data-d-none');
            contactData.classList.add('contact-data-d-none');
        }

        flag == true ? contactCard.classList.add('contact-card-click') : null;
    } catch (e) { }
});