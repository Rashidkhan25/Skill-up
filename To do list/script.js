document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('taskList');
    const taskInput = document.getElementById('taskInput');
    const reminderTime = document.getElementById('reminderTime');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const progressBar = document.getElementById('progressBar');
    const toggleFormBtn = document.getElementById('toggle-form');
    const taskForm = document.getElementById('taskForm');

    let tasks = [];

    toggleFormBtn.addEventListener('click', () => {
        taskForm.classList.toggle('active');
        taskInput.value = '';
        reminderTime.value = ''; 
    });

    addTaskBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const taskValue = taskInput.value.trim();
        const reminderValue = reminderTime.value;

        if (taskValue) {
            const task = {
                id: Date.now(),
                name: taskValue,
                reminder: reminderValue,
                completed: false,
            };
            tasks.push(task);
            taskInput.value = '';
            reminderTime.value = '';
            updateTaskList();
        }
    });

    function updateTaskList() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const taskDiv = document.createElement('div');
            taskDiv.className = 'task-wrapper';
            taskDiv.setAttribute('data-id', task.id);

            const checkmark = document.createElement('div');
            checkmark.className = 'checkmark';
            if (task.completed) checkmark.classList.add('checked');
            checkmark.addEventListener('click', () => toggleTaskCompletion(task.id));

            const taskName = document.createElement('p');
            taskName.innerText = task.name;

            const deleteBtn = document.createElement('div');
            deleteBtn.className = 'delete';
            deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
            deleteBtn.addEventListener('click', () => deleteTask(task.id));

            taskDiv.appendChild(checkmark);
            taskDiv.appendChild(taskName);
            taskDiv.appendChild(deleteBtn);
            taskList.appendChild(taskDiv);
        });
        updateProgressBar();
    }

    function toggleTaskCompletion(id) {
        tasks = tasks.map(task => {
            if (task.id === id) {
                task.completed = !task.completed;
            }
            return task;
        });
        updateTaskList();
    }

    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        updateTaskList();
    }

    function updateProgressBar() {
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.completed).length;
        const progress = totalTasks ? (completedTasks / totalTasks) * 100 : 0;
        progressBar.style.width = `${progress}%`;
    }

    function resetTaskList() {
        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        const currentMinute = currentTime.getMinutes();
        
        if (currentHour === 0 && currentMinute === 0) {
            tasks = [];
            updateTaskList();
        }
    }

    setInterval(resetTaskList, 60000);
});

function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    navMenu.classList.toggle('open');
  }
