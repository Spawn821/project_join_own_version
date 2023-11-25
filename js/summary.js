let numberToDo = 0, numberInPogress = 0, numberAwaitFeedback = 0, numberDone = 0;
let priorityText = ''; priorityImg = '';
let deadline;

/**
 * This function renders all elements of summary page with dynamic data.
 */
function renderSummary() {
    let numberAllTasks = tasks.length;

    structureTasksInformations();
    findTasksFromCurrentDate();
    findPriorityImgAndColor();
    setInfoValues(numberAllTasks);
    greetingsName();

    [numberToDo, numberInPogress, numberAwaitFeedback, numberDone] = [0, 0, 0, 0,];
}


function setInfoValues(numberAllTasks) {
    document.getElementById('summary-to-do-number').innerHTML = numberToDo;
    document.getElementById('summary-done-number').innerHTML = numberDone;
    document.getElementById('summary-priority-img').src = priorityImg;
    document.getElementById('summary-priority-text').innerHTML = priorityText;
    document.getElementById('summary-priority-date').innerHTML = deadline;
    document.getElementById('summary-all-tasks-number').innerHTML = numberAllTasks;
    document.getElementById('summary-progress-number').innerHTML = numberInPogress;
    document.getElementById('summary-feedback-number').innerHTML = numberAwaitFeedback;
}


/**
 * This function structure the number of the respective board status ('to do', 'in progress'...).
 */
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


/**
 * This function search after all dates that are after the current date.
 */
function findTasksFromCurrentDate() {
    const currentDate = new Date();

    const tasksDate = tasks.filter((task) => {
        const date = new Date(task.dueDate);

        if (date > currentDate) {
            return task;
        }
    });

    tasksDate.sort((a, b) => new Date(a['dueDate']) - new Date(b['dueDate']));

    [priorityText, deadline] = [tasksDate[0].prioText, convertDate(new Date(tasksDate[0].dueDate))];
}


/**
 * This function the respective priority image in the current chosen task.
 */
function findPriorityImgAndColor() {
    if (priorityText == 'Urgent') {
        priorityImg = '/assets/img/icon_urgent_white.png';
    } else if (priorityText == 'Medium') {
        priorityImg = '/assets/img/icon_medium_white.png';
    } else if (priorityText == 'Low') {
        priorityImg = '/assets/img/icon_low_white.png';
    }
}


/**
 * This function returns the most closest upcoming date of all task".
 */
function convertDate(dueDate) {
    dueDate = dueDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    return dueDate;
}


/**
 * This function sets the current user name as greeting.
 */
function greetingsName() {
    const userName = queryUserName();
    const elements = document.querySelectorAll('#summary-greeting-name');

    for (let i = 0; i < elements.length; i++) {
        let element = elements[i]

        element.innerHTML = userName;
    }
}