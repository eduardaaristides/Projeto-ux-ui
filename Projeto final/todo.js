function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    const prioritySelect = document.getElementById('priority-select');
    const successMessage = document.getElementById('success-message');
    
    if (taskInput.value.trim() !== '') {
        const li = document.createElement('li');
        li.className = `task-item ${prioritySelect.value}`;
        li.innerHTML = `
            <span>${taskInput.value}</span>
            <div>
                <button class="edit" onclick="editTask(this)">✏️</button>
                <button class="delete" onclick="removeTask(this)">🗑️</button>
            </div>
        `;
        taskList.appendChild(li);
        taskInput.value = ''; // Limpa o campo de entrada
        successMessage.textContent = "Todo item Created Successfully.";
        setTimeout(() => successMessage.textContent = '', 2000);
    }
}

function editTask(button) {
    const taskItem = button.parentElement.parentElement;
    const newTask = prompt("Edit your task:", taskItem.firstChild.textContent);
    if (newTask) {
        taskItem.firstChild.textContent = newTask;
    }
}

function removeTask(button) {
    const taskItem = button.parentElement.parentElement;
    taskItem.remove();
}
