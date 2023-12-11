function touchmoveShortCardMobile(task, taskStartX, taskStartY) {
    task.addEventListener('touchmove', e => {
        e.preventDefault();

        let taskNextX = e.changedTouches[0].clientX;
        let taskNextY = e.changedTouches[0].clientY;
        let shortCardPos = task.getBoundingClientRect();

        if (doneRowPos.bottom < taskNextY - taskStartY || taskNextY - taskStartY < 0) {
            boardScrollTop = 0;
        } else {
            boardScrollTop = document.querySelector('#board_html').scrollTop;
        }

        task.style.left = taskNextX - taskStartX + 'px';
        task.style.top = taskNextY - taskStartY + boardScrollTop + 'px';
        task.style.zIndex = 9;
        task.style.position = 'absolute';

        document.querySelector('#board_html').scrollTo({
            top: shortCardPos.bottom + 100,
            behavior: 'smooth'
        });

        /*         scrollIntoViewBoard(shortCardPos); */
    });
}
