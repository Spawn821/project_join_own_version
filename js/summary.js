/**
 * This function initialize the summary page.
 */
async function initSummary() {
    await loadTasks();
    renderSummary();
    userInitials();
    mobileGreetings();
}

/**
 * This function renders all elements of summary page with dynamic data.
 */
function renderSummary() {
    document.getElementById('variablePanel1').innerHTML = tasks.length;
    document.getElementById('variablePanel2').innerHTML = filterTasks('column', 'inProgress');
    document.getElementById('variablePanel3').innerHTML = filterTasks('column', 'feedback');
    document.getElementById('variablePanel4').innerHTML = filterTasks('prio', 'urgent');
    document.getElementById('deadlineDate').innerHTML = upcomingDeadline();
    document.getElementById('variablePanel5').innerHTML = filterTasks('column', 'to do');
    document.getElementById('variablePanel6').innerHTML = filterTasks('column', 'done');
    document.getElementById('greetingName').innerHTML = queryUserName();
}

/**
 * This function returns the number of tasks of a category "key" filtered by "filter".
 * @param {string} key key to be used in JSON object.
 * @param {string} filter criteria to filter for
 * @returns total number of tasks which match criteria "filter" in element "key" of a task-object. 
 */
function filterTasks(key, filter) {
    let count = 0;
    for (let i = 0; i < tasks.length; i++) {
        const element = tasks[i][key];
        if (element === filter) {
            count += 1;
        }
    }
    return count;
}

/**
 * This function returns the most closest upcoming date of all task".
 */
function upcomingDeadline() {
    let deadline;
    const currentDate = new Date();
    const taskDates = tasks.map(task => new Date(task['date']));
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

/**
 * This function sets the Username into the Greeting animation.
 */
function mobileGreetings() {
    const username = queryUserName();
    
    document.getElementById('greetingMobileMessage').innerHTML = `Welcome,`;
    document.getElementById('greetingMobileName').innerHTML = username;

}
     