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

        i++;
        iColor++;
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
function openOrCloseContactData(i) {
    let contactCard = document.getElementById(`contactCard-${i}`);

    if (contactCard.classList.contains('contact-card-click')) {
        closeAllContactClicks();
        clearContactData();
    } else {
        closeAllContactClicks();
        contactCard.classList.toggle('contact-card-click');
        renderContactData(i);
        contactDataSlideInAnimation();
    }

    currentContactIndex = i;
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
function renderContactData(i) {
    let content = document.getElementById('contact-data-content');
    content.innerHTML = '';

    const name = users[i]['name'];
    const email = users[i]['email'];
    const phone = users[i]['phone'];
    const initals = getInitials(name);
    const backgroundColor = returnContactColor(i);

    setTimeout(() => {
        content.innerHTML = getContactDataHTML(i, backgroundColor, initals, name, email, phone)
        content.classList.add('contact-slide-animation')
    }, 50);
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