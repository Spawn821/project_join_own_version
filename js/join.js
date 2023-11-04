let sidebarNavElements = [
    'summary',
    'add_task',
    'board',
    'contacts'
]

/**
 * This fuction initialise starting requirements
 */
function initJoin() {
    topbarUserInitials();
    setSidebarNavActive('summary');
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
 * This function returns the name of the user from URL parameters.
 * @returns username.
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
function topbarUserInitials() {
    const userName = queryUserName();
    document.getElementById('topbar-user-profile-letter').innerHTML = getInitials(userName);
}


/**
 * This function toggles visibility of the menu on top right of the top-navigation bar.
 */
function showOrHideContextMenu() {
    let contextMenu = document.getElementById('context-menu-panel');

    contextMenu.classList.toggle('d-none');
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
function overlayWindowPosition(aciton, overlayCard) {
    let { topMiddel, leftMiddel } = calculateOverlayWindowPosition(overlayCard);

    overlayCard.style = `top: ${topMiddel}px; left: ${leftMiddel}px`;

    overlaySlideAnimtaion(aciton, overlayCard, leftMiddel);
}


function overlaySlideAnimtaion(action, overlayCard, leftMiddel) {
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
    overlayWindowPosition('open', currentOverlay);
});