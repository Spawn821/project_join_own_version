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
 * This function calls all actions to load the template like hide or visible elements from index page.
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


/**
 * This function controlled all actions to load pages from index page.
 * @param {string} name is the id from the respective page.
 */
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


/**
 * This function controlled all actions to load the info pages from index page.
 * @param {string} name is the id from the respective page.
 */
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
 * This function calls all actions to load the template like hide or visible elements from index page.
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


/**
 * This function controlled all actions to load the pages from join page.
 * @param {string} name is the id from the respective page.
 */
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


/**
 * This function hide the topbar element on the index page.
 * @returns the help icon and the topbar element.
 */
function hideTobparNav() {
    let helpIcon = document.getElementById('topbar-help-icon');
    let topbarNav = document.getElementById('topbar-nav');

    helpIcon.classList.remove('v-hidden');
    topbarNav.classList.remove('v-hidden');

    return [helpIcon, topbarNav];
}


/**
 * This function hide all templates before the current page is loaded.
 * @param {*} templatesIDIndex 
 */
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


/**
 * This function highlighted the crrent page on the sidebar with the respective class.
 * @param {string} pageName is a part of the id
 * @param {string} sidebarClickedText is the class to highlighted the text.
 * @param {string} sidebarClickedIcon is the class to highlighted the icon.
 * @returns 
 */
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