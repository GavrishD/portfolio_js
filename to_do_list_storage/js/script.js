// Finding elements on the page
const form = document.querySelector("#toDoForm");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");

let tasks = [];

// Check whether there is data in the local storage - receive it and write it to the "tasks" array
if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
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
            if (task.id === Number(taskElement.id)) {
                task.text = taskInput.value;
                taskToSave = task;
            } 
            return task;
        });
        const taskTitle = taskElement.querySelector(".todo-title");
        taskTitle.innerText = taskToSave.text;
        taskElement.classList.remove('edit-item');

        const submitButton = document.querySelector(".list-button");
        submitButton.classList.remove("edit");
        submitButton.textContent = "Save";
    } else {
        // Describe the task as an object
        taskToSave = {
            id: Date.now(),
            text: inputText,
            done: false,
        }

        // Adding a task to an array with tasks
        tasks.push(taskToSave);

        // Function for generating markup for a new task
        renderTask(taskToSave);
    }

    // Save the list of tasks in LocalStorage
    saveToLocalStorage();

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
    tasks = tasks.filter( (task) => task.id !== taskId);

    // Save the list of tasks in LocalStorage
    saveToLocalStorage();

    // Remove a task from the markup
    parentNode.remove();

    checkEmptyList();
    checkCleanButton();

    event.stopPropagation();
}

function doneTask(event, taskId) {
    const parentNode = document.getElementById(taskId);

    // Defining task IDs
    const task = tasks.find((task) => task.id === taskId);
    task.done = !task.done

    // Save the list of tasks in LocalStorage
    saveToLocalStorage();

    const todoTitle = parentNode.querySelector('.todo-title');
    todoTitle.classList.toggle("todo-title-done");

    const buttonSafe = parentNode.querySelector(".icon-safe");
    buttonSafe.classList.toggle("checked");

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

    removeCleanButton();
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task) {
    // Form a CSS class for the task title and button "safe"
    const cssClassTitle = task.done ? "todo-title todo-title-done" : "todo-title";
    const cssClassButton = task.done ? "icon-safe checked" : "icon-safe";

    // Generating markup for a new task
    const toDoItemHTML = `
        <li id="${task.id}" class="todo-item" onclick="chooseTask(${task.id})">
            <div class="${cssClassTitle}">${task.text}</div>
            <div class="todo-buttons">
                <button type="button" data-action="done" class="${cssClassButton}" onclick="doneTask(event, ${task.id})"><span>Safe</span></button>
                <button type="button" data-action="delete" class="icon-delete" onclick="deleteTask(event, ${task.id})"><span>Delete</span></button>
            </div>
        </li>
    `;

    // Add a task to a page
    tasksList.insertAdjacentHTML("afterbegin", toDoItemHTML);
}

function removeCleanButton(){
    const main = document.querySelector("main");
    while (main.children.length > 3) {
        main.removeChild(main.lastChild);
    }
}

function checkCleanButton() {
    if (tasks.length === 0) {
        const cleanButton = document.querySelector(".icon-clear");
        cleanButton ? cleanButton.remove() : null;
    }

    if (tasks.length > 0) {
        const main = document.querySelector("main");
        const cleanItems = `<button type="button" class="icon-clear" onclick="cleanAllTasks()"><span>Clean items</span></button>`;
        main.insertAdjacentHTML("beforeend", cleanItems);

        removeCleanButton();
    }
}

function chooseTask(taskId) {
    const obj = tasks.find((task) => task.id == taskId);
    taskInput.value = obj.text;

    const toDoItem = document.getElementById(taskId);

    const previousEditItem = tasksList.querySelector(".edit-item");
    if (previousEditItem && Number(previousEditItem.id) !== taskId) {
        previousEditItem.classList.remove("edit-item");
    }

    const editTask = toDoItem.classList.toggle("edit-item");

    if (editTask) {
        const submitButton = document.querySelector(".list-button");
        submitButton.classList.add("edit");
        submitButton.textContent = "Edit" ;
    } else {
        const submitButton = document.querySelector(".list-button");
        submitButton.classList.remove("edit");
        submitButton.textContent = "Save" ;

        taskInput.value = "";
    }

    // Save the list of tasks in LocalStorage
    saveToLocalStorage();
}

function clear(elem) {
    elem.innerHTML = '';
}

function cleanAllTasks() {
    const cleanButton = document.querySelector('.icon-clear');
    cleanButton.parentNode.removeChild(cleanButton);

    clear(tasksList);
    tasks.splice(0);

    checkEmptyList();
    saveToLocalStorage();
}
