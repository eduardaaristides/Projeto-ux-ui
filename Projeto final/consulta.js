document.addEventListener('DOMContentLoaded', () => {
    // Configuração do gráfico de glicose (Adicione o canvas com id 'glucose-chart' no HTML)
    const ctx = document.getElementById('glucose-chart')?.getContext('2d');
    if (ctx) {
        const glucoseChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Níveis de Glicose',
                    borderColor: '#1C446B',
                    backgroundColor: 'rgba(28, 68, 107, 0.1)',
                    data: []
                }]
            },
            options: {
                scales: {
                    x: {
                        beginAtZero: true
                    },
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        // Adicionar valor de glicose ao gráfico
        document.getElementById('add-glucose')?.addEventListener('click', () => {
            const input = document.getElementById('glucose-input');
            const value = input?.value;
            if (value) {
                const now = new Date();
                const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
                glucoseChart.data.labels.push(time);
                glucoseChart.data.datasets[0].data.push(value);
                glucoseChart.update();
                input.value = '';
            }
        });
    }

    // Adicionar consulta médica
    const appointmentsTableBody = document.querySelector('#appointments-table tbody');
    document.getElementById('add-appointment')?.addEventListener('click', () => {
        const date = document.getElementById('appointment-date')?.value;
        const description = document.getElementById('appointment-description')?.value;

        if (date && description) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${date}</td>
                <td>${description}</td>
                <td><button class="remove-appointment">Excluir</button></td>
            `;
            appointmentsTableBody.appendChild(row);

            row.querySelector('.remove-appointment')?.addEventListener('click', () => {
                row.remove();
            });

            document.getElementById('appointment-date').value = '';
            document.getElementById('appointment-description').value = '';
        }
    });

    // Adicionar lembretes de medicamentos
    const taskList = document.getElementById('task-list');
    const reminderContainer = document.getElementById('reminder-container');

    function addTask(task, time) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${task}</td>
            <td>${time}</td>
            <td><button class="delete-task">Excluir</button></td>
        `;
        taskList.appendChild(tr);
    }

    document.getElementById('add-task')?.addEventListener('click', () => {
        const taskInput = document.getElementById('task-input');
        const timeInput = document.getElementById('time-input');
        const task = taskInput?.value;
        const time = timeInput?.value;
        
        if (task && time) {
            addTask(task, time);
            taskInput.value = '';
            timeInput.value = '';
        }
    });

    taskList?.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-task')) {
            e.target.parentElement.parentElement.remove();
        }
    });

    function checkReminders() {
        const now = new Date();
        const currentTime = `${now.getHours()}:${now.getMinutes()}`; // HH:MM format
        const tasks = Array.from(taskList?.getElementsByTagName('tr') || []);
        
        let reminderMessage = '';
        
        tasks.forEach(taskRow => {
            const timeCell = taskRow.children[1].textContent;
            if (timeCell === currentTime) {
                const taskDescription = taskRow.children[0].textContent;
                reminderMessage = `Lembrete: Hora de tomar ${taskDescription}!`;
            }
        });

        reminderContainer.textContent = reminderMessage;
    }

    setInterval(checkReminders, 60000); // Checa a cada minuto

    // Adicionar contatos médicos
    const doctorContactsList = document.getElementById('doctor-list');
    document.getElementById('add-doctor')?.addEventListener('click', () => {
        const name = document.getElementById('doctor-name')?.value;
        const phone = document.getElementById('doctor-contact')?.value;

        if (name && phone) {
            const li = document.createElement('li');
            li.innerHTML = `${name} - ${phone}`;
            doctorContactsList?.appendChild(li);

            document.getElementById('doctor-name').value = '';
            document.getElementById('doctor-contact').value = '';
        }
    });

    // Adicionar histórico de medicamentos
    const medicationHistoryContainer = document.getElementById('medication-history-container');
    document.getElementById('save-medication-history')?.addEventListener('click', () => {
        const medicationHistoryInput = document.getElementById('medication-history')?.value;
        
        if (medicationHistoryInput) {
            const historyItem = document.createElement('div');
            historyItem.textContent = medicationHistoryInput;
            medicationHistoryContainer?.appendChild(historyItem);

            document.getElementById('medication-history').value = '';
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // Adicionar metas de exercício
    const goalList = document.getElementById('goal-list');

    function addGoal(type, duration, frequency) {
        const div = document.createElement('div');
        div.className = 'goal-item';
        div.innerHTML = `
            <p>Tipo: ${type}</p>
            <p>Duração: ${duration} minutos</p>
            <p>Frequência: ${frequency} vezes por semana</p>
            <button class="delete-goal">Excluir</button>
        `;
        goalList.appendChild(div);
    }

    document.getElementById('add-goal')?.addEventListener('click', () => {
        const type = document.getElementById('exercise-type')?.value;
        const duration = document.getElementById('exercise-duration')?.value;
        const frequency = document.getElementById('exercise-frequency')?.value;
        
        if (type && duration && frequency) {
            addGoal(type, duration, frequency);
            document.getElementById('exercise-type').value = '';
            document.getElementById('exercise-duration').value = '';
            document.getElementById('exercise-frequency').value = '';
        }
    });

    goalList?.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-goal')) {
            e.target.parentElement.remove();
        }
    });
});
