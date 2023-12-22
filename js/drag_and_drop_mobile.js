let tasksShortCards;
let toDoRow;
let inProgressRow;
let awaitFeedbackRow;
let doneRow;
let toDoRowPos;
let inProgressRowPos;
let awaitFeedbackRowPos;
let doneRowPos;
let onScroll;
let saveScroll;
let board;
let taskMoveX;
let taskMoveY;

document.addEventListener('touchstart', e => {
    onScroll = false;
    saveScroll = 0;

    startDragAndDropMobile(e);
})


/**
 * This function start to move the short card drag and drop if mobile.
 * @param {object} e is the object from the touchstart event.
 */
function startDragAndDropMobile(e) {
    let task = e.target;
    let shortCards = document.querySelectorAll('#board-short-card-panel');

    shortCards.forEach((shortCard) => shortCard.style = 'background-color: black');

    if (task.classList.contains('board-short-card-panel')) {
        lookForScrollAction();

        setTimeout(() => {
            touchstartShortCardMobile(task, e);
        }, 500);
    }
}

const boardStatusContainer = [
    '#board-to-do-container',
    '#board-in-progress-container',
    '#board-await-feedback-container',
    '#board-done-container'
]

/**
 * This function control if a scroll event triggert.
 */
function lookForScrollAction() {
    boardStatusContainer.map((container) => {
        const element = document.querySelector(container);

        element.addEventListener('scroll', () => {
            onScroll = true;
        })
    });

    board = document.querySelector('#board_html');

    board.addEventListener('scroll', () => {
        onScroll = true;
    });
}


function setElementsForDragAndDropMobile() {
    tasksShortCards = document.querySelectorAll('.board-short-card-panel');
    toDoRow = document.querySelector('#board-to-do-column');
    inProgressRow = document.querySelector('#board-in-progress-column');
    awaitFeedbackRow = document.querySelector('#board-await-feedback-column');
    doneRow = document.querySelector('#board-done-column');
    toDoRowPos = toDoRow.getBoundingClientRect();
    inProgressRowPos = inProgressRow.getBoundingClientRect();
    awaitFeedbackRowPos = awaitFeedbackRow.getBoundingClientRect();
    doneRowPos = doneRow.getBoundingClientRect();
}


/**
 * This function start's all requirements for touchstart or cancel touchstart.
 * @param {object} task is the short card element.
 * @param {object} e is the object from the touchstart event.
 * @returns end's the touchstart event.
 */
function touchstartShortCardMobile(task, e) {
    let detailCard = document.getElementById('board_detail_card_task_html');

    if (!detailCard.classList.contains('d-none')) return;
    else if (onScroll) return;

    let taskStartX = e.touches[0].clientX;
    let taskStartY = e.touches[0].clientY;
    currentTask = task.id.split('_')[1];
    let scrollStartY = e.touches[0].clientY;
    task.style.opacity = 0.6;

    setElementsForDragAndDropMobile();
    touchmoveShortCardMobile(task, taskStartX, taskStartY, scrollStartY);
    touchendShortCardMobile(task);
}


/**
 * This function implement all requirements for touchmove.
 * @param {object} task is the short card element.
 * @param {number} taskStartX is the coordinate to start the short card in x.
 * @param {number} taskStartY is the coordinate to start the short card in y. 
 */
function touchmoveShortCardMobile(task, taskStartX, taskStartY, scrollStartY) {
    task.addEventListener('touchmove', e => {
        if (e.cancelable) e.preventDefault();

        let [taskNextX, taskNextY] = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
        [taskMoveX, taskMoveY] = [taskNextX - taskStartX, taskNextY - taskStartY];
        let scrollNextY = e.changedTouches[0].clientY;
        let scrollMoveY = scrollNextY - scrollStartY;

        considerScrollIfMoveShortCard(scrollMoveY);
        addShortCardStyleToHover(task);
        showNoDropWithColor(task);

        scrollStartY = scrollNextY;
    });
}


/**
 * This function make the short card red if the area can't droped.
 * @param {object} task is the short card element.
 */
function showNoDropWithColor(task) {
    if (statusRowPosTopToShortCardCenter('To do', task) && statusRowPosBottomToShortCardCenter('To do', task)) {
        task.classList.remove('background-color-red');
    } else if (statusRowPosTopToShortCardCenter('In progress', task) && statusRowPosBottomToShortCardCenter('In progress', task)) {
        task.classList.remove('background-color-red');
    } else if (statusRowPosTopToShortCardCenter('Await feedback', task) && statusRowPosBottomToShortCardCenter('Await feedback', task)) {
        task.classList.remove('background-color-red');
    } else if (statusRowPosTopToShortCardCenter('Done', task) && statusRowPosBottomToShortCardCenter('Done', task)) {
        task.classList.remove('background-color-red');
    } else {
        task.classList.add('background-color-red');
    }
}


/**
 * This function returns if the shord card position center and the status area position top matches.
 * @param {string} status is the name of the status area.
 * @param {object} task is the short card element.
 * @returns true or false.
 */
function statusRowPosTopToShortCardCenter(status, task) {
    let shortCardPos = task.getBoundingClientRect();
    let shortCardPosYCenter = shortCardPos.top + (shortCardPos.height / 2) + taskMoveY + saveScroll;

    switch (status) {
        case 'To do':
            return shortCardPosYCenter > toDoRowPos.top + taskMoveY;
        case 'In progress':
            return shortCardPosYCenter > inProgressRowPos.top + taskMoveY;
        case 'Await feedback':
            return shortCardPosYCenter > awaitFeedbackRowPos.top + taskMoveY;
        case 'Done':
            return shortCardPosYCenter > doneRowPos.top + taskMoveY;
    }
}


/**
 * This function returns if the shord card position center and the status area position bottom matches.
 * @param {string} status is the name of the status area.
 * @param {object} task is the short card element.
 * @returns true or false.
 */
function statusRowPosBottomToShortCardCenter(status, task) {
    let shortCardPos = task.getBoundingClientRect();
    let shortCardPosYCenter = shortCardPos.top + (shortCardPos.height / 2) + taskMoveY + saveScroll;

    switch (status) {
        case 'To do':
            return shortCardPosYCenter < toDoRowPos.bottom + taskMoveY;
        case 'In progress':
            return shortCardPosYCenter < inProgressRowPos.bottom + taskMoveY;
        case 'Await feedback':
            return shortCardPosYCenter < awaitFeedbackRowPos.bottom + taskMoveY;
        case 'Done':
            return shortCardPosYCenter < doneRowPos.bottom + taskMoveY;
    }
}


/**
 * This funcion takes into account the scrolling behavior of the page.
 * @param {object} scrollNextY is the object from the current touch if touchmove.
 */
function considerScrollIfMoveShortCard(scrollMoveY) {
    let boardPanel = document.querySelector('.board-panel');

    board.scrollTop += scrollMoveY;

    if (board.scrollTop != 0 && board.scrollTop < boardPanel.offsetHeight - board.offsetHeight) {
        saveScroll += scrollMoveY;
    }
}


/**
 * This fuction changes the style to drag the short card.
 * @param {object} task is the short card element.
 * @param {number} taskNextX is the current coordinate from the shrot card in x.
 * @param {number} taskNextY is the current coordinate from the shrot card in y.
 * @param {number} taskStartX is the start coordinate from the shrot card in x.
 * @param {number} taskStartY is the start coordinate from the shrot card in y.
 */
function addShortCardStyleToHover(task) {
    task.style.left = taskMoveX + 'px';
    task.style.top = taskMoveY + saveScroll + 'px';
    task.style.zIndex = 9;
    task.style.position = 'absolute';
}


/**
 * This function set the reqirements to end the touch and drop the short card.
 * @param {object} task is the short card element.
 */
function touchendShortCardMobile(task) {
    task.addEventListener('touchend', () => {
        insertShortCardInContainer(task);
        removeShortCardStyleToHover(task);
        setItem('tasks', JSON.stringify(tasks));
        startCreateBoardShortCards();
        showDroppedShortCard();
    });
}


function removeShortCardStyleToHover(task) {
    task.style.left = 0;
    task.style.top = 0;
    task.style.zIndex = 0;
    task.style.position = 'static';
    task.style.opacity = 1;
}


/**
 * This function controlled where droped the short card.
 * @param {object} task is the short card element. 
 */
function insertShortCardInContainer(task) {
    let taskNumber = tasks[task.id.split('_')[1]];

    if (statusRowPosTopToShortCardCenter('To do', task) && statusRowPosBottomToShortCardCenter('To do', task)) {
        taskNumber.boardStatus = 'To do';
    } else if (statusRowPosTopToShortCardCenter('In progress', task) && statusRowPosBottomToShortCardCenter('In progress', task)) {
        taskNumber.boardStatus = 'In progress';
    } else if (statusRowPosTopToShortCardCenter('Await feedback', task) && statusRowPosBottomToShortCardCenter('Await feedback', task)) {
        taskNumber.boardStatus = 'Await feedback';
    } else if (statusRowPosTopToShortCardCenter('Done', task) && statusRowPosBottomToShortCardCenter('Done', task)) {
        taskNumber.boardStatus = 'Done';
    }
}