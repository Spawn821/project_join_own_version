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

let templatesLoginIds = [
    'login-area',
    'login_html',
    'signup_html',
    'reset_password_html',
    'info-pages-area',
    'privacy_policy_html',
    'legal_notice_html'
];

let templatesJoinIds = [
    'summary_html',
    'add_task_html',
    'add_task_mobile_html',
    'board_html',
    'contacts_html',
    'help_html',
    'privacy_policy_html',
    'legal_notice_html'
];

let lastSelectedTemplate = '';

let currentWebsite = '';

/**
 * This functions show's the template 'login.html', 'summary.html', 'contacts.html'...
 * she decides between 'index.html' and 'join.hmtl' the main pages.
 * @param {string} name is the name from the template.
 */
function showTemplate(name) {
    let templatesIDIndex = [];

    currentWebsite == 'index' ? templatesIDIndex = templatesLoginIds : templatesIDIndex = templatesJoinIds;

    hideAllTemplates(templatesIDIndex);

    currentWebsite == 'index' ? templatesLogin(name) : templatesJoin(name);

    if (name != 'privacy_policy_html' && name != 'legal_notice_html' && name != 'help_html') {
        lastSelectedTemplate = name;
    }
}


/**
 * This function calls all actions to load the template like hide or visible elements from login page.
 * @param {string} name is the name from the template.
 */
function templatesLogin(name) {
    document.getElementById(`${name}`).classList.remove('d-none');

    if (name == 'login_html' || name == 'signup_html' || name == 'reset_password_html') {
        actionsOnTamplatesLogin(name);
    } else {
        actionsOnTamplatesInfoPages(name);
    }
}


function actionsOnTamplatesLogin(name) {
    let loginArea = document.getElementById('login-area');
    let headerRight = document.getElementById('login-header-right');
    let headerBottom = document.getElementById('login-header-bottom');

    loginArea.classList.remove('d-none');

    if (name == 'login_html') {
        headerRight.classList.remove('d-none');
        headerBottom.classList.remove('d-none');
    } else {
        headerRight.classList.add('d-none');
        headerBottom.classList.add('d-none');
    }
}


function actionsOnTamplatesInfoPages(name) {
    let infoPagesArea = document.getElementById('info-pages-area');
    let sidebarNav = document.getElementById('sidebar-nav');
    let topbarNav = document.getElementById('topbar-nav');
    const highlightId = name.substring(0, name.length - 5)

    infoPagesArea.classList.remove('d-none');
    sidebarNav.classList.add('v-hidden');
    topbarNav.classList.add('v-hidden');
    setSidebarNavActive(highlightId);
}


/**
 * This function calls all actions to load the template like hide or visible elements from login page.
 * @param {string} name is the name from the template.
 */
function templatesJoin(name) {
    const highlightId = name.substring(0, name.length - 5);
    const windowSize = window.matchMedia('(max-width: 1300px)');

    if (windowSize.matches && name == 'add_task_html') {
        document.getElementById('add_task_mobile_html').classList.remove('d-none');
    } else {
        document.getElementById(`${name}`).classList.remove('d-none');
    }

    actionsOnTamplatesJoin(name, windowSize);

    highlightId != 'help' ? setSidebarNavActive(highlightId) : null;
}


function actionsOnTamplatesJoin(name, windowSize) {
    let [helpIcon, topbarNav] = hideTobparNav();

    if (name == 'summary_html') {
        renderSummary();
    } else if (name == 'board_html') {
        startCreateBoardShortCards();
    } else if (name == 'add_task_html') {
        windowSize.matches ? currentAddTask = 'add_task_mobile_html' : currentAddTask = name;
        document.getElementById(currentAddTask).querySelector('#add-task-btn-medium').classList.add('add-new-task-priority-color-orange');
    } else if (name == 'contacts_html') {
        startCreateContacts();
    } else if (name == 'help_html') {
        removeSibebarNavActive();
        helpIcon.classList.add('v-hidden');
    } else if (name == 'privacy_policy_html' || name == 'legal_notice_html') {
        topbarNav.classList.add('v-hidden');
    }
}


function hideTobparNav() {
    let helpIcon = document.getElementById('topbar-help-icon');
    let topbarNav = document.getElementById('topbar-nav');

    helpIcon.classList.remove('v-hidden');
    topbarNav.classList.remove('v-hidden');

    return [helpIcon, topbarNav];
}


function hideAllTemplates(templatesIDIndex) {
    for (let i = 0; i < templatesIDIndex.length; i++) {
        let template = document.getElementById(`${templatesIDIndex[i]}`);

        try {
            template.classList.add('d-none');
        } catch {
            continue;
        }
    }
}

let sidebarNavElements = [
    'summary',
    'add_task',
    'board',
    'contacts',
    'privacy_policy',
    'legal_notice'
]

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

    setClassSidebar(pageName, sidebarClickedText, sidebarClickedIcon);
}


function setClassSidebar(pageName, sidebarClickedText, sidebarClickedIcon) {
    document.getElementById(`sidebar-${pageName}`).classList.add(`${sidebarClickedText}`);

    try {
        document.getElementById(`sidebar-${pageName}`).children[0].classList.add(`${sidebarClickedIcon}`);
    } catch {
        return;
    }
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
 * This function go's back to the last template expet the info pages.
 */
function callLastTemplate() {
    showTemplate(lastSelectedTemplate);
    if (lastSelectedTemplate != 'login_html' && lastSelectedTemplate != 'signup_html' && lastSelectedTemplate != 'reset_password_html') {
        setSidebarNavActive(lastSelectedTemplate.substring(0, lastSelectedTemplate.length - 5));
    }
}