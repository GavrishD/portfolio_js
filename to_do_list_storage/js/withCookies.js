// Finding elements on the page
const form = document.querySelector("#todoForm");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");

let tasks = [];

// Function - check whether there is data in the cookie - receive it and write it to the "tasks" array
function getCookie(name) {
    let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

if (getCookie("tasks")) {
    tasks = JSON.parse(getCookie("tasks"));
}

tasks.forEach(function (task) {
    // Function for generating markup for a task
    renderTask(task);
})

checkEmptyList();
checkCleanButton();

// Adding a task
form.addEventListener("submit", addTask);

// Functions
function addTask(event) {
    event.preventDefault();

    // Get the task text from the input field
    const inputText = taskInput.value;

    let taskToSave;

    const taskElement = document.querySelector(".edit-item");
    
    if (taskElement) {
        tasks = tasks.map((task) => { 
            if (task.id === taskElement.id) {
                task.text = taskInput.value;
                taskToSave = task;
            } 
            return task;
        });
        const taskTitle = taskElement.querySelector(".todo-title");
        taskTitle.innerText = taskToSave.text;
        taskElement.classList.remove('edit-item');

        const submitButton = document.querySelector(".task-button");
        submitButton.classList.remove("edit");
        submitButton.textContent = "Save";
    } else {
        // Describe the task as an object
        taskToSave = {
            id: Date.now().toString(),
            text: inputText,
            done: false,
        }

        // Adding a task to an array with tasks
        tasks.push(taskToSave);

        // Function for generating markup for a new task
        renderTask(taskToSave);
    }

    // Save the list of tasks in Cookie
    saveToCookies();

    // Clear the input field and return focus to it
    taskInput.value = "";
    taskInput.focus();

    checkEmptyList();
    checkCleanButton();
}

function deleteTask(event, taskId) {
    // const parentNode = event.target.closest(".todo-item");
    const parentNode = document.getElementById(taskId);

    // Delete a task through array filtering
    tasks = tasks.filter((task) => task.id !== taskId);

    // Save the list of tasks in Cookie
    saveToCookies();

    // Remove a task from the markup
    parentNode.remove();

    checkEmptyList();
    checkCleanButton();

    event.stopPropagation();
}

function doneTask(event, taskId) {
    const parentNode = document.getElementById(taskId);

    // Defining task IDs
    tasks = tasks.map((task) => {
        if (task.id === taskId) {
            task.done = !task.done;
        } 
        return task;
    })
    
    // Save the list of tasks in Cookie
    saveToCookies();

    const todoTitle = parentNode.querySelector('.todo-title');
    todoTitle.classList.toggle("todo-title-done");

    const buttonDone = parentNode.querySelector(".icon-done");
    buttonDone.classList.toggle("checked");

    checkCleanButton();
    event.stopPropagation();
}

function checkEmptyList() {
    if (tasks.length === 0) {
        const emptyList = `<li id="emptyList" class="empty-list">To-do list is empty</li>`;
        tasksList.insertAdjacentHTML("afterbegin", emptyList);
    }

    if (tasks.length > 0) {
        const emptyListElement = document.querySelector("#emptyList");
        emptyListElement ? emptyListElement.remove() : null;
    }
}

function saveToCookies() {
    // Option 1
    // let cookieDate = new Date (2024, 00, 01);
    // document.cookie = `tasks=${JSON.stringify(tasks)}; expires=${cookieDate.toGMTString()}`;

    // Option 2
    let cookieDate =new Date();
    cookieDate.setTime(cookieDate.getTime() + 1 * 24 * 60 * 60 * 1000);
    let expires = "expires=" + cookieDate.toUTCString();
    document.cookie = `tasks=${JSON.stringify(tasks)}` + ";" + expires;
}

function deleteCookies() {
    var cookieDate = new Date();
    cookieDate.setTime(cookieDate.getTime() - 1);
    document.cookie = tasks += `=; expires=${cookieDate.toGMTString()}`;
    location.reload();
}

function renderTask(task) {
    // Form a CSS class for the task title and button "safe"
    const cssClassTitle = task.done ? "todo-title todo-title-done" : "todo-title";
    const cssClassButton = task.done ? "icon-done checked" : "icon-done";

    // Generating markup for a new task
    const toDoItemHTML = `
        <li id=${task.id} class="todo-item" onclick="chooseTask('${task.id}')">
            <div class="${cssClassTitle}">${task.text}</div>
            <div class="todo-buttons">
                <button type="button" class="${cssClassButton}" onclick="doneTask(event, '${task.id}')"><span>Done</span></button>
                <button type="button" class="icon-delete" onclick="deleteTask(event, '${task.id}')"><span>Delete</span></button>
            </div>
        </li>
    `;

    // Add a task to a page
    tasksList.insertAdjacentHTML("afterbegin", toDoItemHTML);
}

function checkCleanButton() {
    const cleanButton = document.querySelector(".clean-button");
    cleanButton.classList.remove("visible-button");

    if (tasks.length > 0) {
        cleanButton.classList.add("visible-button");
    } return tasks.length;
}

function chooseTask(taskId) {
    const obj = tasks.find((task) => task.id == taskId);
    taskInput.value = obj.text;

    const toDoItem = document.getElementById(taskId);

    const previousEditItem = tasksList.querySelector(".edit-item");
    if (previousEditItem && previousEditItem.id !== taskId) {
        previousEditItem.classList.remove("edit-item");
    }

    const editTask = toDoItem.classList.toggle("edit-item");
    const submitButton = document.querySelector(".task-button");
    submitButton.classList.toggle("edit");

    editTask ? submitButton.textContent = "Edit" : (submitButton.textContent = "Save", taskInput.value = "");

    // Save the list of tasks in Cookie
    saveToCookies();
}

function clear(elem) {
    elem.innerHTML = '';
}

function cleanAllTasks() {
    const cleanButton = document.querySelector('.icon-clean');
    cleanButton.parentNode.removeChild(cleanButton);

    clear(tasksList);
    tasks.splice(0);

    checkEmptyList();
    saveToCookies();
    deleteCookies();
}