let existLetterHeadline = '';

/* ================== */
/* CONTACTS LEFT SIDE */
/* ================== */

/**
 * This function rendes the contacts in the contactlist.
 */
function renderContacts() {
    let contactsList = document.getElementById('contacts-list');
    let i = 0;
    let iColor = 0;

    contactsList.innerHTML = '';

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


function openOrCloseContactDataDesktop(i, contactCard) {
    if (contactCard.classList.contains('contact-card-click')) {
        closeAllContactClicks();
        clearContactData();
    }
    else {
        closeAllContactClicks();
        renderContactData(i);
        contactCard.classList.toggle('contact-card-click');
        contactDataSlideInAnimation();
    }
}


function openOrCloseContactDataMobile(i, contactData = true) {
    let contactsLeftSide = document.getElementById('contacts');
    let contactsRightSide = document.getElementById('contact-data');

    contactsLeftSide.classList.toggle('contacts-half-side-mobile');
    contactsRightSide.classList.toggle('contacts-half-side-mobile');

    closeAllContactClicks();
    if (contactData) renderContactData(i);
}


function contactDataSlideInAnimation() {
    let contactData = document.getElementById('contact-data-content-parent');

    contactData.animate([
        { left: `${document.documentElement.clientWidth + 50}px` },
        { left: 0 }
    ], {
        duration: 250
    })
}


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
 * This function renders the contactdata in separate window,
 * and show this with a slide effect.
 * @param {integer} i is the index number from the array users.
 */
function renderContactData(i, slideAnimation = true) {
    let content = document.getElementById('contact-data-content');
    content.innerHTML = '';

    const name = users[i]['name'];
    const email = users[i]['email'];
    const phone = users[i]['phone'];
    const initals = getInitials(name);
    const backgroundColor = returnContactColor(i);

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


function openOrClosePointMenu(action) {
    let pointMenu = document.getElementById('contact-data-name-edit-del-area');

    if (action == 'open') {
        pointMenu.classList.remove('contact-data-point-menu-d-none');
        pointMenu.classList.add('contact-data-point-menu-slide-in');
        pointMenu.classList.remove('contact-data-point-menu-slide-out');
    } else {
        pointMenu.classList.remove('contact-data-point-menu-slide-in');
        pointMenu.classList.add('contact-data-point-menu-slide-out');
        setTimeout(() => pointMenu.classList.add('contact-data-point-menu-d-none'), 400);
    }
}


window.addEventListener('resize', () => {
    const windowSize = window.matchMedia('(max-width: 1400px)');

    console.log(windowSize);

    if (windowSize.matches) closeAllContactClicks();
})