let tasksShortCards;
let toDoRow;
let inProgressRow;
let awaitFeedbackRow;
let doneRow;
let toDoRowPos;
let inProgressRowPos;
let awaitFeedbackRowPos;
let doneRowPos;
let boardScrollTop;
let onScroll;
let lastTouch = null;
let saveScroll = 0;

document.addEventListener('touchstart', e => {
    onScroll = false;
    boardScrollTop = 0;
    saveScroll = 0;

    startDragAndDropMobile(e);
})


function startDragAndDropMobile(e) {
    let task = e.target;

    if (task.classList.contains('board-short-card-panel')) {
        lookForScrollAction();

        setTimeout(() => {
            touchstartShortCardMobile(task, e);
        }, 300);
    }
}

const boardStatusContainer = [
    '#board-to-do-container',
    '#board-in-progress-container',
    '#board-await-feedback-container',
    '#board-done-container'
]

function lookForScrollAction() {
    boardStatusContainer.map((container) => {
        const element = document.querySelector(container);

        element.addEventListener('scroll', () => {
            onScroll = true;
        })
    });

    const board = document.querySelector('#board_html');

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


function touchstartShortCardMobile(task, e) {
    if (onScroll) return;

    lastTouch = e.touches[0];

    setElementsForDragAndDropMobile();

    let taskStartX = e.touches[0].clientX;
    let taskStartY = e.touches[0].clientY;
    currentTask = task.id.split('_')[1];

    task.style.opacity = 0.6;

    touchmoveShortCardMobile(task, taskStartX, taskStartY);
    touchendShortCardMobile(task);
}


function touchmoveShortCardMobile(task, taskStartX, taskStartY) {
    task.addEventListener('touchmove', e => {
        if (e.cancelable) e.preventDefault();

        let taskNextX = e.changedTouches[0].clientX;
        let taskNextY = e.changedTouches[0].clientY;
        let board = document.querySelector('#board_html');
        let currentTouch = e.changedTouches[0];

        if (lastTouch) {
            board.scrollTop += currentTouch.clientY - lastTouch.clientY;
            saveScroll += currentTouch.clientY - lastTouch.clientY;
        }

        task.style.left = taskNextX - taskStartX + task.offsetWidth / 2 + 'px';
        task.style.top = taskNextY - taskStartY + saveScroll + 'px';
        task.style.zIndex = 9;
        task.style.position = 'absolute';

        lastTouch = currentTouch;
    });
}


function touchendShortCardMobile(task) {
    task.addEventListener('touchend', () => {
        insertShortCardInContainer(task);

        task.style.left = 0;
        task.style.top = 0;
        task.style.zIndex = 0;
        task.style.position = 'static';
        task.style.opacity = 1;

        /*                 setItem('tasks', JSON.stringify(tasks)) */
        renderBoardShortCards();
        showDroppedShortCard();
    });
}


function insertShortCardInContainer(task) {
    let shortCardPos = task.getBoundingClientRect();
    let taskNumber = tasks[task.id.split('_')[1]];

    if (shortCardPos.bottom < toDoRowPos.bottom) {
        taskNumber.boardStatus = 'To do';
    } else if (shortCardPos.bottom < inProgressRowPos.bottom) {
        taskNumber.boardStatus = 'In progress';
    } else if (shortCardPos.bottom < awaitFeedbackRowPos.bottom) {
        taskNumber.boardStatus = 'Await feedback';
    } else if (shortCardPos.bottom < doneRowPos.bottom) {
        taskNumber.boardStatus = 'Done';
    }
}