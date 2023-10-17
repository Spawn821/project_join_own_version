let users = [];

let tasks = [];

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

let templatesIDIndex = [
    'login_html',
    'signup_html',
    'reset_password_html',
    'summary_html',
    'add_task_html',
    'borad_html',
    'contacts_html',
    'help_html'
]


async function initGlobal() {
    await loadUsers();
    await loadTasks();
    await includeHTML();
}


/**
 * Pulling user data from backend server.
 */
async function loadUsers() {
    users = JSON.parse(await getItem('users'));
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

    try {
        if (name != 'login_html') {
            header.classList.add('d-none');
        } else {
            header.classList.remove('d-none');
        }
    } catch {
        return;
    }
}


/**
 * This function close all templates on the index side.
 */
function hideAllTemplates() {
    for (let i = 0; i < templatesIDIndex.length; i++) {
        const template = document.getElementById(`${templatesIDIndex[i]}`);

        try {
            template.classList.add('d-none');
        } catch {
            continue;
        }
    }
}