let numberToDo = 0, numberInPogress = 0, numberAwaitFeedback = 0, numberDone = 0;
let priorityText = []; priorityImg = []; deadlineDates = [];
let deadline;

/**
 * This function initialize the summary page.
 */
function initSummary() {
    renderSummary();
    upcomingDeadline();
}


/**
 * This function renders all elements of summary page with dynamic data.
 */
function renderSummary() {
    let numberAllTasks = tasks.length;
    let deadline = upcomingDeadline();

    structureTasksInformations();

    document.getElementById('summary-to-do-number').innerHTML = numberToDo;
    document.getElementById('summary-progress-number').innerHTML = numberInPogress;
    document.getElementById('summary-feedback-number').innerHTML = numberAwaitFeedback;
    document.getElementById('summary-done-number').innerHTML = numberDone;
    document.getElementById('summary-all-tasks-number').innerHTML = numberAllTasks;
    document.getElementById('summary-priority-number').innerHTML = numberDueDate;
    document.getElementById('summary-priority-date').innerHTML = deadline;
}


function structureTasksInformations() {
    tasks.map((task) => {
        if (task.boardStatus == 'To do') {
            numberToDo++;
        } else if (task.boardStatus == 'In progress') {
            numberInPogress++;
        } else if (task.boardStatus == 'Await feedback') {
            numberAwaitFeedback++;
        } else if (task.boardStatus == 'Done') {
            numberDone++;
        }
    });
}


function test() {
    const currentDate = new Date();
    
    const tasksDate = tasks.filter((task) => {
        const date = new Date(task.dueDate);

        if (date > currentDate) {
            return task;
        }
    });

    tasksDate.sort((a, b) => a - b);

    console.log(tasksDate);
}


/**
 * This function returns the most closest upcoming date of all task".
 */
function upcomingDeadline() {
    let deadline;
    const currentDate = new Date();
    const taskDates = tasks.map(task => new Date(task['dueDate']));
    const futureDates = taskDates.filter(taskDate => taskDate > currentDate);

    if (futureDates.length > 0) {
        futureDates.sort((a, b) => a - b);
        deadline = futureDates[0].toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    } else {
        deadline = null;
    }

    return deadline;
}