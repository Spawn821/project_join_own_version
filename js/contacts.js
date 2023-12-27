let existLetterHeadline = '';

/* ================== */
/* CONTACTS LEFT SIDE */
/* ================== */

/**
 * This function start to render all contacts as list.
 */
function startCreateContacts() {
    let contactsList = document.getElementById('contacts-list');
    let i = 0;
    let iColor = 0;

    contactsList.innerHTML = '';

    renderContacts(contactsList, i, iColor);
}


/**
 * This function rendes the contacts in the contactlist.
 * @param {object} contactsList is the html element to list the contacts.
 * @param {number} i is the index from array users.
 * @param {number} iColor is the index from the contact color array.
 */
function renderContacts(contactsList, i, iColor) {
    users.map((user) => {
        const backgroundColor = returnContactColor(iColor);
        const initals = getInitials(user.name);

        addLetterHeadline(user['name'].charAt(0), contactsList);

        contactsList.innerHTML += getContactCardHTML(i, backgroundColor, initals, user.name, user.email)

        i++, iColor++;
        iColor >= contactColors.length ? iColor = 0 : null;
    });
}


/* added the letter category for contacts A, B, C etc. */
/**
 * This fuction added the letter to display the contacts alphabetically.
 * @param {char} firstLetter is the first letter from the current username.
 * @param {object} contactsList is the container to added the content.
 */
function addLetterHeadline(firstLetter, contactsList) {
    if (existLetterHeadline.toLocaleLowerCase() != firstLetter.toLocaleLowerCase() || existLetterHeadline == '') {
        contactsList.innerHTML += getContactsLetterHeadlineHTML(firstLetter.toUpperCase());
        existLetterHeadline = firstLetter;
    }
}



/* =================== */
/* CONTACTS RIGHT SIDE */
/* =================== */

/**
 * This fuction shows all data from the clicked contcat in a separate window.
 * @param {integer} i is the index from arry users.
 */
function contactData(i) {
    let contactCard = document.getElementById(`contactCard-${i}`);
    let windowSize = window.matchMedia('(max-width: 1400px)');

    if (!windowSize.matches) {
        openOrCloseContactDataDesktop(i, contactCard);
    } else {
        openOrCloseContactDataMobile(i, contactCard);
    }

    currentContactIndex = i;
}


/**
 * This function opens or close the contact data from the clicked contact in the desktop mode.
 * @param {number} i is the index fromt array users.
 * @param {object} contactCard is the clicked contact card.
 */
function openOrCloseContactDataDesktop(i, contactCard) {
    if (contactCard.classList.contains('contact-card-click')) {
        closeAllContactClicks();
        clearContactData();
    }
    else {
        closeAllContactClicks();
        startCreateContactData(i);
        contactCard.classList.toggle('contact-card-click');
        contactDataSlideInAnimation();
    }
}


/**
 * This function opens or close the contact data from the clicked contact in the mobile mode.
 * @param {number} i is the index fromt array users.
 * @param {object} contactCard is the clicked contact card.
 * @param {boolean} contactData is the boolean value to say if contact data rendert or not.
 */
function openOrCloseContactDataMobile(i, contactData = true) {
    let contactsLeftSide = document.getElementById('contacts');
    let contactsRightSide = document.getElementById('contact-data');

    contactsLeftSide.classList.toggle('contacts-half-side-desktop');
    contactsRightSide.classList.toggle('contacts-half-side-desktop');

    closeAllContactClicks();
    if (contactData) startCreateContactData(i);
}


/**
 * This function set a slide in effect to the clicked contact data.
 */
function contactDataSlideInAnimation() {
    let contactData = document.getElementById('contact-data-content-parent');

    contactData.animate([
        { left: `${document.documentElement.clientWidth + 50}px` },
        { left: 0 }
    ], {
        duration: 250
    })
}


/**
 * This function set a slide out effect to the clicked contact data.
 */
function contactDataSlideOutAnimation() {
    let contactData = document.getElementById('contact-data-content-parent');

    contactData.animate([
        { left: 0 },
        { left: `${document.documentElement.clientWidth + 50}px` }
    ], {
        duration: 250
    })
}


/* render the screen 'contactdata' with the datas from clicked contact */
/**
 * This function start to create the contactdata in separate window,
 * and show this with a slide effect.
 * @param {integer} i is the index number from the array users.
 */
function startCreateContactData(i, slideAnimation = true) {
    let content = document.getElementById('contact-data-content');
    content.innerHTML = '';

    const name = users[i]['name'];
    const email = users[i]['email'];
    const phone = users[i]['phone'];
    const initals = getInitials(name);
    const backgroundColor = returnContactColor(i);

    renderContactData(content, slideAnimation, i, backgroundColor, initals, name, email, phone)
}


/**
 * This function renders all datas from the current contact.
 * @param {object} content is the contant area from the contact data.
 * @param {boolean} slideAnimation switches the slideanimation on or off.
 * @param {number} i is the index from array users.
 * @param {string} backgroundColor is the rgb color from the contact.
 * @param {string} initals is the initials from the first and the last name.
 * @param {string} name is the name from the contact.
 * @param {string} email is the email address from the contact.
 * @param {number} phone is the phone number from the contact.
 */
function renderContactData(content, slideAnimation, i, backgroundColor, initals, name, email, phone) {
    if (slideAnimation) {
        setTimeout(() => {
            content.innerHTML = getContactDataHTML(i, backgroundColor, initals, name, email, phone);
            content.classList.add('contact-slide-animation');
        }, 50);
    } else {
        content.innerHTML = getContactDataHTML(i, backgroundColor, initals, name, email, phone);
    }
}


/**
 * This function clears the container with the contactdatas.
 */
function clearContactData() {
    contactDataSlideOutAnimation();

    setTimeout(() => {
        let content = document.getElementById('contact-data-content');
        content.innerHTML = '';
    }, 240);
}


/**
 * This function search contacts that have been highlighted as clicket and removed this. 
 */
function closeAllContactClicks() {
    let allClicks = document.querySelectorAll('div.contact-card-click');

    for (let i = 0; i < allClicks.length; i++) {
        let currentClick = allClicks[i];

        currentClick.classList.remove('contact-card-click');
    }
}


/**
 * This function opens the point menu in the mobile version.
 * @param {string} action say open or close.
 * @returns is the backdoor if try canceld.
 */
function openOrClosePointMenu(action) {
    let pointMenu = document.getElementById('contact-data-name-edit-del-area-mobile');

    if (action == 'open') {
        pointMenu.classList.remove('contact-data-point-menu-d-none');
        pointMenu.classList.add('contact-data-point-menu-slide-in');
        pointMenu.classList.remove('contact-data-point-menu-slide-out');
    } else {
        try {
            pointMenu.classList.remove('contact-data-point-menu-slide-in');
            pointMenu.classList.add('contact-data-point-menu-slide-out');
            setTimeout(() => pointMenu.classList.add('contact-data-point-menu-d-none'), 400);
        } catch {
            return;
        }
    }
}


/**
 * This event returns the class from all contact cards to marked as clicked.
 */
window.addEventListener('resize', () => {
    const windowSize = window.matchMedia('(max-width: 1400px)');

    if (windowSize.matches) closeAllContactClicks();
})