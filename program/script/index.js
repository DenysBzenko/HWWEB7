document.addEventListener('DOMContentLoaded', function() {
    const taskList = document.getElementById('taskList');
    const newTaskInput = document.getElementById('newTask');
    const addTaskButton = document.getElementById('addTask');
    const removeCompletedButton = document.getElementById('removeCompleted');
    const removeAllButton = document.getElementById('removeAll');

    let tasks = [];

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.sort((a, b) => b.date - a.date);
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${task.text}</span> <button class='delete' data-index='${index}'>Delete</button>`;
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
                tasks.splice(index, 1);
                renderTasks();
            });
        });
    }

    addTaskButton.addEventListener('click', function() {
        const taskText = newTaskInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, date: new Date(), completed: false });
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