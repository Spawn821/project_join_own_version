let users = [];

let tasks = [];

let categoriesTask = [];

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

/**
 * This fuction initialise starting requirements
 */
async function initGlobal() {
    await loadUsers();
    await loadTasks();
    await loadCategoriesTask();
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
 * This function loads all tasks from backend.
 */
async function loadCategoriesTask() {
    categoriesTask = JSON.parse(await getItem('categoriesTask'));
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
 * Animates a message (sliding up box) upon successfull registration and other events.
 */
function informationSlidebox(id, message) {
    let slidebox = document.getElementById(id);

    slidebox.classList.remove('d-none');
    slidebox.innerHTML = message;

    setTimeout(function () {
        slidebox.classList.add('d-none');
    }, 1050);
}


/**
 * This function checks if the input mail address allready exist.
 * @returns true or false.
 */
function validateEmailAlreadyExist(idInput, idWarning) {
    let inputField = document.getElementById(idInput);
    let warning = document.getElementById(idWarning);
    let flag = false;

    users.map((user) => {
        if (!flag) {
            warning.classList.add('v-hidden');

            if (validInput(inputField, user)) {
                warning.classList.remove('v-hidden');
                flag = true;
            }
        }
    })

    return flag;
}


/**
 * This function validate the input from a email input field.
 * @param {object} inputField is the current input field.
 * @param {object} user is the current user from arrray users.
 * @returns true or false.
 */
function validInput(inputField, user) {
    const validInput = inputField.value != '';
    const validWithUsers = user['email'].toLowerCase().includes(inputField.value.toLowerCase());
    const validWithSign = inputField.value.includes('@');

    return validInput && validWithUsers && validWithSign;
}