let tasksShortCards;
let toDoRow;
let inProgressRow;
let awaitFeedbackRow;
let doneRow;
let toDoRowPos;
let inProgressRowPos;
let awaitFeedbackRowPos;
let doneRowPos;
let onScroll = false;

document.addEventListener('touchstart', () => {
    startForDragAndDropMobile();
})


function startForDragAndDropMobile() {
    setElementsForDragAndDropMobile()
    controlScrollEvent();

    setTimeout(() => {
        if (!onScroll) {
            tasksShortCards.forEach(touchstartShortCardMobile);
        }
    }, 150);

    onScroll = false;
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

const boardStatusContainer = [
    '#board-to-do-container',
    '#board-in-progress-container',
    '#board-await-feedback-container',
    '#board-done-container'
]

function controlScrollEvent() {
    boardStatusContainer.map((container) => {
        const element = document.querySelector(container);

        element.addEventListener('scroll', () => {
            onScroll = true;
        })
    })

    const boardHtml = document.querySelector('#board_html');
    boardHtml.addEventListener('scroll', () => {
        onScroll = true;
    });
}


function touchstartShortCardMobile(task) {
    task.addEventListener('touchstart', e => {
        let taskStartX = e.changedTouches[0].clientX;
        let taskStartY = e.changedTouches[0].clientY;
        currentTask = task.id.split('_')[1];

        touchmoveShortCardMobile(task, taskStartX, taskStartY);
        touchendShortCardMobile(task);
    });
}


function touchmoveShortCardMobile(task, taskStartX, taskStartY) {
    task.addEventListener('touchmove', e => {
        e.preventDefault();

        let taskNextX = e.changedTouches[0].clientX;
        let taskNextY = e.changedTouches[0].clientY;

        task.style.left = taskNextX - taskStartX + 'px';
        task.style.top = taskNextY - taskStartY + 'px';
        task.style.zIndex = 9;
        task.style.position = 'absolute';
    });
}


function touchendShortCardMobile(task) {
    task.addEventListener('touchend', () => {
        insertShortCardInContainer(task);

        task.style.left = 0;
        task.style.top = 0;
        task.style.zIndex = 0;
        task.style.position = 'static';

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