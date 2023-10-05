document.addEventListener('DOMContentLoaded', function() {
    const taskList = document.getElementById('taskList');
    const newTaskInput = document.getElementById('newTask');
    const addTaskButton = document.getElementById('addTask');
    const removeCompletedButton = document.getElementById('removeCompleted');
    const removeAllButton = document.getElementById('removeAll');

    let tasks = [];

    function formatDate(date) {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    }

    removeCompletedButton.addEventListener('click', function() {
        tasks = tasks.filter(task => !task.completed && !task.deleted);
        renderTasks();
    });

    taskList.addEventListener('dblclick', function(e) {
        if (e.target.tagName === 'SPAN' && !e.target.parentElement.classList.contains('deleted')) {
            const index = parseInt(e.target.nextElementSibling.getAttribute('data-index'));
            newTaskInput.value = tasks[index].text;
            newTaskInput.focus();
            newTaskInput.addEventListener('keydown', function(event) {
                if (event.key === 'Enter') {
                    tasks[index].text = newTaskInput.value.trim();
                    tasks[index].date = new Date();
                    newTaskInput.value = '';
                    renderTasks();
                } else if (event.key === 'Escape') {
                    newTaskInput.value = '';
                }
            });
        }
    });

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.sort((a, b) => b.date - a.date);
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${task.text} <small>(${formatDate(task.date)})</small></span> <button class='delete' data-index='${index}'>Delete</button>`;
            if (task.deleted) {
                li.classList.add('deleted');
            }
            if (task.completed) {
                li.classList.add('completed');
            }
            li.addEventListener('click', function(e) {
                if (e.target.tagName !== 'BUTTON') {
                    tasks[index].completed = !tasks[index].completed;
                    renderTasks();
                }
            });
            taskList.appendChild(li);
        });
        const deleteButtons = document.querySelectorAll('.delete');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(button.getAttribute('data-index'));
                tasks[index].deleted = true;
                renderTasks();
            });
        });
    }

    addTaskButton.addEventListener('click', function() {
        const taskText = newTaskInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, date: new Date(), completed: false, deleted: false });
            newTaskInput.value = '';
            renderTasks();
        }
    });

    removeCompletedButton.addEventListener('click', function() {
        tasks = tasks.filter(task => !task.completed);
        renderTasks();
    });

    removeAllButton.addEventListener('click', function() {
        if (tasks.some(task => !task.completed)) {
            const confirmDelete = confirm('Are you sure you want to delete all tasks, including uncompleted ones?');
            if (confirmDelete) {
                tasks = [];
                renderTasks();
            }
        } else {
            tasks = [];
            renderTasks();
        }
    });
});