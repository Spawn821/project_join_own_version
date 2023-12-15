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
let lastTouch = null;
let saveScroll = 0;
let taskStartY;
let taskNextY;
let board;

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
    let taskStartX = e.touches[0].clientX;

    if (!detailCard.classList.contains('d-none')) return;
    else if (onScroll) return;

    taskStartY = e.touches[0].clientY;
    currentTask = task.id.split('_')[1];
    lastTouch = e.touches[0];
    task.style.opacity = 0.6;

    document.getElementById('board-short-card-separator_' + currentTask).classList.remove('d-none');

    setElementsForDragAndDropMobile();
    touchmoveShortCardMobile(task, taskStartX, taskStartY);
    touchendShortCardMobile(task);
}


/**
 * This function implement all requirements for touchmove.
 * @param {object} task is the short card element.
 * @param {number} taskStartX is the coordinate to start the short card in x.
 * @param {number} taskStartY is the coordinate to start the short card in y. 
 */
function touchmoveShortCardMobile(task, taskStartX, taskStartY) {
    task.addEventListener('touchmove', e => {
        if (e.cancelable) e.preventDefault();

        let taskNextX = e.changedTouches[0].clientX;
        taskNextY = e.changedTouches[0].clientY;
        let currentTouch = e.changedTouches[0];

        considerScrollIfMoveShortCard(currentTouch);
        addShortCardStyleToHover(task, taskNextX, taskNextY, taskStartX, taskStartY);

        lastTouch = currentTouch;
    });
}


/**
 * This funcion takes into account the scrolling behavior of the page.
 * @param {object} currentTouch is the object from the current touch if touchmove.
 */
function considerScrollIfMoveShortCard(currentTouch) {
    let boardPanel = document.querySelector('.board-panel');

    if (lastTouch) {
        board.scrollTop += currentTouch.clientY - lastTouch.clientY;

        if (board.scrollTop != 0 && board.scrollTop < boardPanel.offsetHeight - board.offsetHeight) {
            saveScroll += currentTouch.clientY - lastTouch.clientY;
        }
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
function addShortCardStyleToHover(task, taskNextX, taskNextY, taskStartX, taskStartY) {
    task.style.left = taskNextX - taskStartX + task.offsetWidth / 2 + 'px';
    task.style.top = taskNextY - taskStartY + saveScroll + 'px';
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
        renderBoardShortCards();
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
    let [shortCardPos, taskNumber] = [task.getBoundingClientRect(), tasks[task.id.split('_')[1]]];

    if (shortCardPos.top + (taskNextY - taskStartY) + saveScroll > toDoRowPos.top + saveScroll &&
        shortCardPos.top + (taskNextY - taskStartY) + saveScroll < toDoRowPos.bottom + saveScroll) {
        taskNumber.boardStatus = 'To do';
    } else if (shortCardPos.top + (taskNextY - taskStartY) + saveScroll > inProgressRowPos.top + saveScroll
        && shortCardPos.top + (taskNextY - taskStartY) + saveScroll < inProgressRowPos.bottom + saveScroll) {
        taskNumber.boardStatus = 'In progress';
    } else if (shortCardPos.top + (taskNextY - taskStartY) + saveScroll > awaitFeedbackRowPos.top + saveScroll
        && shortCardPos.top + (taskNextY - taskStartY) + saveScroll < awaitFeedbackRowPos.bottom + saveScroll) {
        taskNumber.boardStatus = 'Await feedback';
    } else if (shortCardPos.top + (taskNextY - taskStartY) + saveScroll > doneRowPos.top + saveScroll
        && shortCardPos.top + (taskNextY - taskStartY) + saveScroll > doneRowPos.bottom + saveScroll) {
        taskNumber.boardStatus = 'Done';
    }
}