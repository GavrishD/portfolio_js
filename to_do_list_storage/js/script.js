// const clean = `
//             <div class="clean">
//                 <button class="icon-clear"></button>
//                 <span>Clean items</span>
//             </div>
//         `;
// userList.insertAdjacentHTML("beforeend", clean);
// ============================================================


// Finding elements on the page
const form = document.querySelector("#toDoForm");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");

// Adding a task
form.addEventListener("submit", addTask);

// Deleting a task
tasksList.addEventListener('click', deleteTask);


// Functions
function addTask(event) {
    event.preventDefault();

    // Get the task text from the input field
    const inputText = taskInput.value;

    // Generating markup for a new task
    const toDoItemHTML = `
        <li class="todo-item">
            <div class="todo-title">${inputText}</div>
            <div class="todo-buttons">
                <button type="button" data-action="done" class="icon-safe"><span>Safe</span></button>
                <button type="button" data-action="delete" class="icon-delete"><span>Delete</span></button>
            </div>
        </li>
    `;

    // Add a task to a page
    tasksList.insertAdjacentHTML("afterbegin", toDoItemHTML);

    // Clear the input field and return focus to it
    taskInput.value = "";
    taskInput.focus();

    // Checking if there is more than 1 element in the list, then hide the block "emptyList"
    if (tasksList.children.length > 1) {
        emptyList.classList.add("none-empty-list");
    }
}

function deleteTask(event) {
    // Check that the click was on the “delete task” button
    if (event.target.dataset.action === 'delete') {
        const parentNode = event.target.closest('.todo-item');
        parentNode.remove();
    }
}