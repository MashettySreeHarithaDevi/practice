// ---------- TO-DO APP ----------
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

document.addEventListener('DOMContentLoaded', () => {
    getTasks();
    updateClock();
});

function addTask() {
    const taskValue = taskInput.value.trim();
    if (taskValue === "") return;

    createTaskElement(taskValue);
    saveLocalTask(taskValue);
    taskInput.value = "";
}

function createTaskElement(taskValue) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span onclick="toggleTask(this)">${taskValue}</span>
        <button onclick="deleteTask(this)">Delete</button>
    `;
    taskList.appendChild(li);
}

function deleteTask(element) {
    const taskText = element.parentElement.firstChild.textContent;
    removeLocalTask(taskText);
    element.parentElement.remove();
}

function toggleTask(element) {
    element.parentElement.classList.toggle('completed');
}

function saveLocalTask(task) {
    let tasks = localStorage.getItem("tasks")
        ? JSON.parse(localStorage.getItem("tasks"))
        : [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
    let tasks = localStorage.getItem("tasks")
        ? JSON.parse(localStorage.getItem("tasks"))
        : [];
    tasks.forEach(task => createTaskElement(task));
}

function removeLocalTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks.filter(t => t !== task))
    );
}

// ---------- CALCULATOR ----------
const display = document.getElementById('display');

function appendToDisplay(input) {
    display.value += input;
}

function clearDisplay() {
    display.value = "";
}

function calculate() {
    try {
        display.value = eval(display.value);
    } catch {
        display.value = "Error";
        setTimeout(clearDisplay, 1500);
    }
}

function backspace() {
    display.value = display.value.slice(0, -1);
}

// ---------- FORM VALIDATION ----------
const form = document.getElementById('registrationForm');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    const user = document.getElementById('username').value;
    if (user.length < 5) {
        showError('userError', 'Username must be at least 5 characters');
        isValid = false;
    } else clearError('userError');

    const email = document.getElementById('email').value;
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
        showError('emailError', 'Enter a valid email');
        isValid = false;
    } else clearError('emailError');

    const pass = document.getElementById('password').value;
    if (pass.length < 8) {
        showError('passError', 'Password must be at least 8 characters');
        isValid = false;
    } else clearError('passError');

    if (isValid) {
        alert("Form Submitted Successfully!");
        form.reset();
    }
});

function showError(id, msg) {
    document.getElementById(id).textContent = msg;
}

function clearError(id) {
    document.getElementById(id).textContent = "";
}

// ---------- DIGITAL CLOCK ----------
function updateClock() {
    const now = new Date();

    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();

    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;

    const timeString = `${h.toString().padStart(2,'0')}:` +
                       `${m.toString().padStart(2,'0')}:` +
                       `${s.toString().padStart(2,'0')} ${ampm}`;

    document.getElementById('clock').textContent = timeString;

    document.getElementById('date').textContent =
        now.toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
}

setInterval(updateClock, 1000);