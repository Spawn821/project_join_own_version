/**
 * This function returns html code which is needed for the kontaktlist.
 * @param {char} firstLetter is the first letter by the named contact.
 * @returns {object} html code.
 */
function getLetterHeadlineHTML(firstLetter) {
    return /*html*/`
        <span class="contacts-letter-headline">${firstLetter}</span>
        <div class="contacts-separator"></div>
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
function getContactCardHTML(i, colorStyle, firstLetters, name, email) {
    return /*html*/`
        <div class="contact-card" onclick="openContactData(${i}, '${colorStyle}')" id='contactCard-${i}'>
            <div class="contact-icon" style="background-color: ${colorStyle}">
                <span>${firstLetters}</span>
            </div>
            <div class="contact">
                <span class="contact-name">${name}</span>
                <span class="contact-email">${email}</span>
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
function getContactDataHTML(i, colorStyle, firstLetters, name, email, phone) {
    return /*html*/ `
        <div class="contact-data-name-area">
            <span class="contact-data-name-icon" style="background-color: ${colorStyle}">${firstLetters}</span>
            <div class="contact-data-name-headline">
                <h1 class="contact-data-name">${name}</h1>
                <div class="contact-data-name-edit-del-area contacts-point-menu-d-none" id="contact-data-name-edit-del-area">
                    <div class="contact-data-name-edit-del" onclick="openAndCloseAddNewEditContact('edit-contact-include-HTML', 'edit-contact', true, ${i})">
                        <div class="contact-data-name-edit"></div>
                        <span>Edit</span>
                    </div>
                    <div class="contact-data-name-edit-del" onclick="deleteContact(${i}, false)">
                        <div class="contact-data-name-delete"></div>
                        <span>Delete</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="contact-data-info-area">
            <span class="contact-data-info-headline">Contact Information</span>
            <div class="contact-data-info-content">
                <span class="contact-data-info-content-headline">Email</span>
                <span class="contact-email">${email}</span>
                <span class="contact-data-info-content-headline">Phone</span>
                <span class="contact-data-info-content-phone">${phone}</span>
            </div>
        </div>

        <button class="btn-menu-contact" onclick="openEditContactPointMenu(${i}); notToClose(event)">
            <img class="btn-menu-contact-img" src="./assets/img/point_menu.png" alt="">
        </button>
    `;
}