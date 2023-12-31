/**
 * This fuction initialise starting requirements
 */
async function initJoin() {
    await initGlobal();
    topbarUserInitials();
    setSidebarNavActive('summary');
    renderSummary();
    removeAnimateGreetings();


    lastSelectedTemplate = 'summary_html';
    currentWebsite = 'join';
}


/**
 * This function remove the greeting on the summary page after the animation.
 */
function removeAnimateGreetings() {
    const windowSize = window.matchMedia("(max-width: 1200px)");
    let panel = document.getElementById('summary-panel');
    let greetings = document.getElementById('summary-greeting-background');
    let greetingsText = document.getElementById('summary-greeting-text');

    if (windowSize.matches) {
        panel.classList.add('summary-panel-animation');
        greetings.classList.remove('d-none');

        setTimeout(() => greetingsText.classList.remove('v-hidden'), 150);

        setTimeout((() => {
            panel.classList.remove('summary-panel-animation');
            greetingsText.classList.add('v-hidden');
            greetings.classList.add('d-none');
        }), 2800);
    }
}


/**
 * This function returns the name of the user from URL parameters.
 * @returns username.
 */
function queryUserName() {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let userName = urlParams.get('name');

    return userName;
}


/**
 * This function sets the initials of the username to the top right icon of the top-navigation bar.
 */
function topbarUserInitials() {
    const userName = queryUserName();
    document.getElementById('topbar-user-profile-letter').innerHTML = getInitials(userName);
}


/**
 * This function toggles visibility of the menu on top right of the top-navigation bar.
 */
function showOrHideContextMenu(action) {
    let contextMenu = document.getElementById('context-menu-panel');

    if (action == 'open') {
        openContextMenu(contextMenu);
    } else {
        closeContextMenu(contextMenu);
    }
}


function openContextMenu(contextMenu) {
    contextMenu.classList.remove('d-none');
    contextMenu.classList.add('context-menu-panel-in');
    contextMenu.classList.remove('context-menu-panel-out');
}


function closeContextMenu(contextMenu) {
    const windowSize = window.matchMedia('(max-width: 900px)');

    contextMenu.classList.remove('context-menu-panel-in');
    contextMenu.classList.add('context-menu-panel-out');

    if (windowSize.matches) {
        setTimeout(() => {
            contextMenu.classList.add('d-none');
        }, 250);
    } else {
        contextMenu.classList.add('d-none');
    }
}


/**
 * This function is being called upon logout. It deletes its saved email address from local storage.
 */
function logoutUser() {
    window.localStorage.clear();
}



let currentOverlay;

/**
 * This fuction determines the postion of an overlay and animated by slideeffect.
 * @param {string} aciton is the acion of open or close an overly.
 * @param {object} overlayCard is the html element from the overlay.
 */
function overlayWindowPosition(action, overlayCard) {
    let { topMiddel, leftMiddel } = calculateOverlayWindowPosition(overlayCard);

    overlayCard.style = `top: ${topMiddel}px; left: ${leftMiddel}px`;

    overlaySlideAnimtaion(action, overlayCard, topMiddel, leftMiddel);
}


function overlaySlideAnimtaion(action, overlayCard, topMiddel, leftMiddel) {
    const windowSize = window.matchMedia('(max-width: 1350px)');

    if (!windowSize.matches) {
        overlaySlideFromRightToCenter(action, overlayCard, leftMiddel);
    } else {
        overlaySlideFromBottomToCenter(action, overlayCard, topMiddel);
    }
}


function overlaySlideFromRightToCenter(action, overlayCard, leftMiddel) {
    if (action == 'open') {
        overlayCard.animate([
            { left: `${document.documentElement.clientWidth + 50}px` },
            { left: `${leftMiddel}px` },
        ], {
            duration: 250,
        })
    } else {
        overlayCard.animate([
            { left: `${leftMiddel}px` },
            { left: `${document.documentElement.clientWidth + 50}px` },
        ], {
            duration: 250,
        })
    }
}


function overlaySlideFromBottomToCenter(action, overlayCard, topMiddel) {
    if (action == 'open') {
        overlayCard.animate([
            { top: `${document.documentElement.clientHeight + 50}px` },
            { top: `${topMiddel}px` },
        ], {
            duration: 250,
        })
    } else {
        overlayCard.animate([
            { top: `${topMiddel}px` },
            { top: `${document.documentElement.clientHeight + 50}px` },
        ], {
            duration: 250,
        })
    }
}


function calculateOverlayWindowPosition(overlayCard) {
    let { windowHeigth, windowWidth } = heightAndWidthFromWindow();
    let { elementHeight, elementWidth } = heightAndWidthFromElement(overlayCard);

    let topMiddel = windowHeigth / 2 - elementHeight / 2;
    let leftMiddel = windowWidth / 2 - elementWidth / 2;

    return { topMiddel, leftMiddel };
}


function heightAndWidthFromWindow() {
    let windowHeigth = document.documentElement.clientHeight;
    let windowWidth = document.documentElement.clientWidth;

    return { windowHeigth, windowWidth };
}


function heightAndWidthFromElement(element) {
    let elementHeight = element.offsetHeight;
    let elementWidth = element.offsetWidth

    return { elementHeight, elementWidth };
}


window.addEventListener('resize', () => {
    try {
        overlayWindowPosition('open', currentOverlay);
        addOrRemoveScrollbarDetailCard();
    } catch {
        return;
    }
});


window.addEventListener(('resize'), () => {
    const windowSize = window.matchMedia('(max-width: 1300px)');
    const addTaskSidebar = document.getElementById('sidebar-add_task');
    let addTask = document.getElementById('add_task_html');
    let addTaskMobile = document.getElementById('add_task_mobile_html');

    if (addTaskSidebar.classList.contains('sidebar-t-highlighted')) {
        if (windowSize.matches) {
            addTask.classList.add('d-none');
            addTaskMobile.classList.remove('d-none');
            currentAddTask = 'add_task_mobile_html';
        } else {
            addTask.classList.remove('d-none');
            addTaskMobile.classList.add('d-none');
            currentAddTask = 'add_task_html';
        }
    }
});


window.addEventListener('resize', () => {
    const windowSize = window.matchMedia('(max-width: 1200px)');

    if (windowSize.matches) {
        removeAnimateGreetings();
    }
});