function addTask() {
    const taskInput = document.getElementById('task-input');
    const prioritySelect = document.getElementById('priority-select');
    const daySelect = document.getElementById('day-select');
    const successMessage = document.getElementById('success-message');
    
    if (taskInput.value.trim() !== '') {
        const taskColumn = document.getElementById(daySelect.value);
        const li = document.createElement('div');
        li.className = `task-item ${prioritySelect.value}`;
        li.innerHTML = `
            <span>${taskInput.value}</span>
            <div>
                <button class="edit" onclick="editTask(this)">✏️</button>
                <button class="delete" onclick="removeTask(this)">🗑️</button>
            </div>
        `;
        taskColumn.appendChild(li);
        taskInput.value = ''; // Limpa o campo de entrada
        successMessage.textContent = "Tarefa adicionada com sucesso!";
        setTimeout(() => successMessage.textContent = '', 2000);
    }
}

function editTask(button) {
    const taskItem = button.parentElement.parentElement;
    const newTask = prompt("Edite sua tarefa:", taskItem.firstChild.textContent);
    if (newTask) {
        taskItem.firstChild.textContent = newTask;
    }
}

function removeTask(button) {
    const taskItem = button.parentElement.parentElement;
    taskItem.remove();
}