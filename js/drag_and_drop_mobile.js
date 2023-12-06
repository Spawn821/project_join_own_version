let tasksShortCards;
let toDoRow;
let inProgressRow;
let awaitFeedbackRow;
let doneRow;
let toDoRowPos;
let inProgressRowPos;
let awaitFeedbackRowPos;
let doneRowPos;

document.ontouchstart = () => {
    console.log('First touch')
    boardElementsForDragAndDropMobile();
}


function boardElementsForDragAndDropMobile() {
    tasksShortCards = document.querySelectorAll('.board-short-card-panel');
    toDoRow = document.querySelector('#board-to-do-column');
    inProgressRow = document.querySelector('#board-in-progress-column');
    awaitFeedbackRow = document.querySelector('#board-await-feedback-column');
    doneRow = document.querySelector('#board-done-column');
    toDoRowPos = toDoRow.getBoundingClientRect();
    inProgressRowPos = inProgressRow.getBoundingClientRect();
    awaitFeedbackRowPos = awaitFeedbackRow.getBoundingClientRect();
    doneRowPos = doneRow.getBoundingClientRect();

    tasksShortCards.forEach(boardDragAndDropMobile);
}


function boardDragAndDropMobile(task) {
    task.addEventListener('touchstart', e => {
        console.log('Second touch')
        let taskStartX = e.changedTouches[0].clientX;
        let taskStartY = e.changedTouches[0].clientY;
        currentTask = task.id.split('_')[1];

        task.addEventListener('touchmove', f => {
            f.preventDefault();

            let taskNextX = f.changedTouches[0].clientX;
            let taskNextY = f.changedTouches[0].clientY;

            task.style.left = taskNextX - taskStartX + 'px';
            task.style.top = taskNextY - taskStartY + 'px';
            task.style.zIndex = 9;
            task.style.position = 'absolute';
        });

        task.addEventListener('touchend', g => {
            if (task.getBoundingClientRect().bottom < toDoRowPos.bottom) {
                console.log('To do');
                tasks[task.id.split('_')[1]].boardStatus = 'To do';
                /*                 setItem('tasks', JSON.stringify(tasks)) */
                renderBoardShortCards();
            } else if (task.getBoundingClientRect().bottom < inProgressRowPos.bottom) {
                console.log('In progress');
                tasks[task.id.split('_')[1]].boardStatus = 'In progress';
                /*                 setItem('tasks', JSON.stringify(tasks)) */
                renderBoardShortCards();
            } else if (task.getBoundingClientRect().bottom < awaitFeedbackRowPos.bottom) {
                console.log('Await feedback');
                tasks[task.id.split('_')[1]].boardStatus = 'Await feedback';
                /*                 setItem('tasks', JSON.stringify(tasks)) */
                renderBoardShortCards();
            } else if (task.getBoundingClientRect().bottom < doneRowPos.bottom) {
                console.log('Done');
                tasks[task.id.split('_')[1]].boardStatus = 'Done';
                /*                 setItem('tasks', JSON.stringify(tasks)) */
                renderBoardShortCards();
            }

            task.style.left = 0;
            task.style.top = 0;
            task.style.zIndex = 0;
            task.style.position = 'static';

            showDroppedShortCard();
        });
    });
}