let users = [];

let contactColors = [
    {
        'number': 1,
        'name': 'orange_1',
        'style': 'rgb(255,122,0)'
    },
    {
        'number': 2,
        'name': 'pink_1',
        'style': 'rgb(255,94,179)'
    },
    {
        'number': 3,
        'name': 'blue_purple',
        'style': 'rgb(110,81,255)'
    },
    {
        'number': 4,
        'name': 'purple',
        'style': 'rgb(147,39,255)'
    },
    {
        'number': 5,
        'name': 'turquoise',
        'style': 'rgb(1,190,232)'
    },
    {
        'number': 6,
        'name': 'seagreen',
        'style': 'rgb(31,215,193)'
    },
    {
        'number': 7,
        'name': 'orange_red',
        'style': 'rgb(255,116,94)'
    },
    {
        'number': 8,
        'name': 'orange_2',
        'style': 'rgb(255,163,94)'
    },
    {
        'number': 9,
        'name': 'pink_2',
        'style': 'rgb(252,113,255)'
    },
    {
        'number': 10,
        'name': 'yellow_1',
        'style': 'rgb(252,199,1)'
    },
    {
        'number': 11,
        'name': 'blue',
        'style': 'rgb(0,56,255)'
    },
    {
        'number': 12,
        'name': 'yellow_2',
        'style': 'rgb(255,230,43)'
    },
    {
        'number': 13,
        'name': 'red',
        'style': 'rgb(255,70,70)'
    },
    {
        'number': 14,
        'name': 'ocher',
        'style': 'rgb(255,187,43)'
    }
]


let alphabet = [
    { 'number': 0, 'letter': 'a' },
    { 'number': 1, 'letter': 'b' },
    { 'number': 2, 'letter': 'c' },
    { 'number': 3, 'letter': 'd' },
    { 'number': 4, 'letter': 'e' },
    { 'number': 5, 'letter': 'f' },
    { 'number': 6, 'letter': 'g' },
    { 'number': 7, 'letter': 'h' },
    { 'number': 8, 'letter': 'i' },
    { 'number': 9, 'letter': 'j' },
    { 'number': 10, 'letter': 'k' },
    { 'number': 11, 'letter': 'l' },
    { 'number': 12, 'letter': 'm' },
    { 'number': 13, 'letter': 'n' },
    { 'number': 14, 'letter': 'o' },
    { 'number': 15, 'letter': 'p' },
    { 'number': 16, 'letter': 'q' },
    { 'number': 17, 'letter': 'r' },
    { 'number': 18, 'letter': 's' },
    { 'number': 19, 'letter': 't' },
    { 'number': 20, 'letter': 'u' },
    { 'number': 21, 'letter': 'v' },
    { 'number': 22, 'letter': 'w' },
    { 'number': 23, 'letter': 'x' },
    { 'number': 24, 'letter': 'y' },
    { 'number': 25, 'letter': 'z' },
    { 'number': 26, 'letter': 'ä' },
    { 'number': 27, 'letter': 'ö' },
    { 'number': 28, 'letter': 'ü' },
    { 'number': 29, 'letter': '.' },
];


let sidebarNavElements = [
    'summary',
    'add_task',
    'board',
    'contacts'
]

let templatesIDIndex = [
    'login_html',
    'signup_html',
    'reset_password_html'
]


/**
 * Pulling user data from backend server.
 */
async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}


/**
 * This function loads all tasks from backend.
 */
async function loadTasks() {
    tasks = JSON.parse(await getItem('tasks'));
}


/**
 * This function includes HTML templates into a document.
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    let file;

    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute('w3-include-html');
        let resp = await fetch(file);

        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found.';
        };
    }
}


/**
 * This function toggles visibility of the menu on top right of the top-navigation bar.
 */
function showOrHideContextMenu() {
    let contextMenu = document.getElementById('context-menu-panel');

    if (contextMenu.classList.contains('d-none')) {
        contextMenu.classList.remove('d-none')
    } else (
        contextMenu.classList.add('d-none')
    )
}


/**
 * This function returns the name of the user from URL parameters.
 * @returns 
 */
function queryUserName() {
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var userName = urlParams.get('name');
    return userName;
}


/**
 * This function sets the initials of the username to the top right icon of the top-navigation bar.
 */
function userInitials() {
    const userName = queryUserName();
    document.getElementById('topbar-user-profile-letter').innerHTML = getInitials(userName);
}


/**
 * This function initializes the "Help" page.
 */
async function initHelp() {
    await includeHTML();
    userInitials();
}


/**
 * This function return the first characters of the first and second string separated by space.
 * @param {*} contact defines the username.
 * @returns First characters of the username.
 */
function getInitials(contact) {

    initials = contact.charAt(0);

    if (contact.match(' ')) {
        initials += contact.charAt(contact.match(' ').index + 1);
    }
    return initials;
}


/**
 * This function refers to another page with URL encoded username.
 * @param {*} pageName defines the name of the page to be linked to.
 */
function linkPage(pageName) {
    saveSidebarNavHighlights(pageName);
    window.location.href = pageName + ".html?name=" + encodeURIComponent(queryUserName());
}


/**
 * This function highlighted the current pagename in the navarea on the sidebar that was clicked.
 * @param {*} pageName defines the name of the page to be linked to.
 */
function setSidebarNavActive(pageName) {
    removeSibebarNavActive();

    let sidebarClickedIcon = '';
    let sidebarClickedText = '';

    for (let i = 0; i < sidebarNavElements.length; i++) {
        const navElement = sidebarNavElements[i];

        if (navElement == pageName) {
            sidebarClickedText = 'sidebar-t-highlighted';
            sidebarClickedIcon = `sidebar-icon-${navElement}-highlighted`;
        }
    }

    document.getElementById(`sidebar-${pageName}`).classList.add(`${sidebarClickedText}`);
    document.getElementById(`sidebar-${pageName}`).children[0].classList.add(`${sidebarClickedIcon}`);
}

/**
 * This function removed all highlightes in the navarea on sidebar.
 */
function removeSibebarNavActive() {
    for (let i = 0; i < sidebarNavElements.length; i++) {
        const navElement = sidebarNavElements[i];

        try {
            document.getElementById(`sidebar-${navElement}`).classList.remove('sidebar-t-highlighted');
            document.getElementById(`sidebar-${navElement}`).children[0].classList.remove(`sidebar-icon-${navElement}-highlighted`);
        } catch {
            continue;
        }
    }
}


/**
 * This function is called on onload of pages privacypolicy and legalnotice.
 */
async function initInfoPage() {
    await includeHTML();
    document.getElementById('sidebar-nav').style.display = "none";
    document.getElementById('topbar-nav').style.display = "none";
}


/**
 * This function returns the color to set the background color of user icons.
 * @param {integer} i defines the index of the color to be returned.
 * @returns {string} is the rgb color stlyle.
 */
function returnContactColor(i) {
    let result = i % contactColors.length
    return contactColors[result]['style'];
}


/**
 * This function returns the index of the color assigned to a user.
 * @param {string} name defines the name of the user.
 * @returns {string} is the rgb color style.
 */
function returnContactColorByName(name) {
    let index = 0;

    for (let i = 0; i < users.length; i++) {
        const userName = users[i]['name'];
        if (userName == name) {
            index = i;
            break;
        }
    }

    return returnContactColor(index);
}


/**
 * This function sorts "users" array by alphabetical order of usernames.
 * @returns {(object|array)} alphabetUsers is the status from all current sortet users/contacts.
 * @returns {integer} lastAddedContactIndex is the index number from the current added contact/contacts in alphabetUsers.
 */
function sortUsers() {
    let alphabetUsers = [];
    let lastAddedContactIndex = 0;
    let outOfFunctionFirstLoop = false;

    for (let i = 0; i < users.length; i++) {
        const userName = users[i]['name'];
        let userNameWithoutSpace = returnNameWithoutSpaces(userName);

        let alphabetLetterCurrentUser = alphabet.find(element => element['letter'] == userNameWithoutSpace[0].toLowerCase());

        if (alphabetUsers.length == 0) {
            alphabetUsers.push(retrunUserJSON(i));
        } else {
            [alphabetUsers, lastAddedContactIndex] = compareUsersWithAlphabetUsersFirstLoop(i, alphabetUsers, lastAddedContactIndex, outOfFunctionFirstLoop, userNameWithoutSpace, alphabetLetterCurrentUser);
        }
    }

    return [alphabetUsers, lastAddedContactIndex];
}


/**
 * This fuction loops through the array alphabetUsers.
 * @param {integer} i is the index number from array users.
 * @param {(object|array)} alphabetUsers is the status from all current sortet users/contacts.
 * @param {integer} lastAddedContactIndex is the index number from the current added contact/contacts in alphabetUsers.
 * @param {boolean} outOfFunctionFirstLoop is the exit to leave the loop in the function compareUsersWithAlphabetUsersFirstLoop.
 * @param {string} userNameWithoutSpace is the current user/contact without space from array users.
 * @param {char} alphabetLetterCurrentUser is the current letter from the current user/contact from array users.
 * @returns {(object|array)} alphabetUsers is the status from all current sortet users/contacts.
 * @returns {integer} lastAddedContactIndex is the index number from the current added user/contact in alphabetUsers.
 */
function compareUsersWithAlphabetUsersFirstLoop(i, alphabetUsers, lastAddedContactIndex, outOfFunctionFirstLoop, userNameWithoutSpace, alphabetLetterCurrentUser) {
    for (let k = 0; k < alphabetUsers.length; k++) {
        const alphabetUsersName = alphabetUsers[k]['name'];
        let alphabetUserNameWithoutSpace = returnNameWithoutSpaces(alphabetUsersName);

        [alphabetUsers, lastAddedContactIndex, outOfFunctionFirstLoop] = compareUsersWithAlphabetUsersSecondLoop(i, k, alphabetUsers, lastAddedContactIndex, outOfFunctionFirstLoop, userNameWithoutSpace, alphabetLetterCurrentUser, alphabetUserNameWithoutSpace);

        if (outOfFunctionFirstLoop) {
            outOfFunctionFirstLoop = false;
            break;
        }
    }

    return [alphabetUsers, lastAddedContactIndex];
}


/**
 * This function loops throuhg the string alphabetUserNameWithoutSpace,
 * and compare the letters with those from the current user from the user array.
 * @param {integer} i is the index number from array users.
 * @param {integer} k  is the index number from array alphabetUsers.
 * @param {(object|array)} alphabetUsers is the status from all current sortet users/contacts. 
 * @param {integer} lastAddedContactIndex is the index number from the current added user/contact in alphabetUsers.
 * @param {boolean} outOfFunctionFirstLoop is the exit to leave the looper in the funtion compareUsersWithAlphabetUsersFirstLoop.
 * @param {string} userNameWithoutSpace is the current user/contact without space from array users.
 * @param {char} alphabetLetterCurrentUser is the current letter from the current user/contact from array users.
 * @param {string} alphabetUserNameWithoutSpace is the current user/contact without space from array alphabetUsers.
 * @returns {(object|array)} alphabetUsers is the status from all current sortet users/contacts.
 * @returns {integer} lastAddedContactIndex is the index number from the current added user/contact in alphabetUsers.
 * @returns {boolean} outOfFunctionFirstLoop is the exit to leave the looper in the funtion compareUsersWithAlphabetUsersFirstLoop.
 */
function compareUsersWithAlphabetUsersSecondLoop(i, k, alphabetUsers, lastAddedContactIndex, outOfFunctionFirstLoop, userNameWithoutSpace, alphabetLetterCurrentUser, alphabetUserNameWithoutSpace) {
    let outOfFunctionSecondLoop = false;

    for (let l = 0; l < alphabetUserNameWithoutSpace.length; l++) {
        const alphabetUserNamerCurrentLetter = alphabetUserNameWithoutSpace[l].toLowerCase();
        const alphabetLetterCurrentAlphabetUser = alphabet.find(element => element['letter'] == alphabetUserNamerCurrentLetter);

        if (alphabetLetterCurrentUser['number'] > alphabetLetterCurrentAlphabetUser['number'] && k < alphabetUsers.length - 1 && l < 1) {
            break;
        }

        [alphabetUsers, lastAddedContactIndex, outOfFunctionFirstLoop, outOfFunctionSecondLoop] = addContactToAlphabetUsers(i, k, l, alphabetUsers, lastAddedContactIndex, outOfFunctionFirstLoop, outOfFunctionSecondLoop, alphabetLetterCurrentUser, alphabetLetterCurrentAlphabetUser, alphabetUserNameWithoutSpace);

        if (outOfFunctionSecondLoop) {
            outOfFunctionSecondLoop = false;
            break;
        } else {
            alphabetLetterCurrentUser = alphabet.find(element => element['letter'] == userNameWithoutSpace[l + 1].toLowerCase());
        }
    }

    return [alphabetUsers, lastAddedContactIndex, outOfFunctionFirstLoop];
}


/**
 * This function checks whether where a user/contact needs to be classified.
 * @param {*} i is the index number from array users.
 * @param {*} k is the index number from array alphabetUsers.
 * @param {*} l is the index number from the letter in alphabetUserNameWithouSpace.
 * @param {*} alphabetUsers is the status from all current sortet users/contacts.
 * @param {*} lastAddedContactIndex is the index number from the current added user/contact in alphabetUsers.
 * @param {*} outOfFunctionFirstLoop is the exit to leave the looper in function compareUsersWithAlphabetUsersFirstLoop.
 * @param {*} outOfFunctionSecondLoop is the exit to leave the looper in function compareUsersWithAlphabetUsersSecondLoop.
 * @param {*} alphabetLetterCurrentUser is the current letter from the current user/contact from array users.
 * @param {*} alphabetLetterCurrentAlphabetUser is the current letter from the current user/contact from array alphabetUsers.
 * @param {*} alphabetUserNameWithoutSpace is the current user/contact without space from array alphabetUsers.
 * @returns {(object|array)} alphabetUsers is the status from all current sortet users/contacts.
 * @returns {integer} lastAddedContactIndex is the index number from the current added user/contact in alphabetUsers.
 * @returns {boolean} outOfFunctionFirstLoop is the exit to leave the looper in the funtion compareUsersWithAlphabetUsersFirstLoop.
 * @returns {boolean} outOfFunctionSecondLoop is the exit to leave the looper in the funtion compareUsersWithAlphabetUsersSecondLoop.
 */
function addContactToAlphabetUsers() {
    if (arguments[7]['number'] > arguments[8]['number']) {
        if (arguments[1] == arguments[3].length - 1) {
            arguments[3].splice(arguments[1] + 1, 0, retrunUserJSON(arguments[0]));
            arguments[5] = true;
        }

        arguments[6] = true;

        arguments[4] = arguments[1] + 1;
    } else if (arguments[7]['number'] < arguments[8]['number']) {
        arguments[3].splice(arguments[1], 0, retrunUserJSON(arguments[0]));
        arguments[4] = arguments[1];
        arguments[5] = true;
        arguments[6] = true;
    }
    else if (arguments[2] == arguments[9].length - 1) {
        arguments[3].splice(arguments[1] + 1, 0, retrunUserJSON(arguments[0]));
        arguments[4] = arguments[1] + 1;
        arguments[5] = true;
        arguments[6] = true;
    }

    return [arguments[3], arguments[4], arguments[5], arguments[6]];
}


/**
 * This function returns a registered users data as an JSON object.
 * @param {integer} i is the index number from array users.
 * @returns {object} JSON object.
 */
function retrunUserJSON(i) {
    return {
        name: users[i]['name'],
        email: users[i]['email'],
        password: users[i]['password'],
        phone: users[i]['phone']
    };
}


/**
 * This function splitet the input name and returns this name withouht space.
 * @param {string} name the name from the current user/contact
 * @returns {string} nameWithoutSpace is the input name without space.
 */
function returnNameWithoutSpaces(name) {
    let splitName = name.split(' ');
    let nameWithoutSpaces = '';

    for (let m = 0; m < splitName.length; m++) {
        nameWithoutSpaces += splitName[m];
    }

    return nameWithoutSpaces;
}

/**
 * This function is being called upon logout. It deletes its saved email address from local storage.
 */
function logoutUser() {
    window.localStorage.clear();
}






/**
 * Animates a message (sliding up box) upon successfull registration and other events.
 */
function informationSlidebox(message) {
    const slidebox = document.getElementById("information-slidebox");

    slidebox.classList.remove('d-none');
    slidebox.innerHTML = message;

    setTimeout(function () {
        slidebox.classList.add('d-none');
    }, 1500);
}


/**
 * This function show the in 'name' saved template.
 * @param {string} name is the name from the template.
 */
function showTemplate(name) {
    hideAllTemplates();

    let header = document.getElementById('login-header-right');

    document.getElementById(`${name}`).classList.remove('d-none');

    if (name != 'login_html') {
        header.classList.add('d-none');
    } else {
        header.classList.remove('d-none');
    }
}


/**
 * This function close all templates on the index side.
 */
function hideAllTemplates() {
    for (let i = 0; i < templatesIDIndex.length; i++) {
        const template = document.getElementById(`${templatesIDIndex[i]}`);

        template.classList.add('d-none');
    }
}