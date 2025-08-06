document.addEventListener('DOMContentLoaded', function() {

    // ✅ Get references to key DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // ✅ Central array to track all tasks in memory
    // This is loaded from Local Storage if available, or starts as an empty array
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // ✅ Load all saved tasks when the page loads
    loadTasks();

    /**
     * ✅ Loads tasks from Local Storage and displays them on the page
     * Called once on page load.
     */
    function loadTasks() {
        tasks.forEach(task => {
            createTaskElement(task); // Add each saved task to the DOM
        });
    }

    /**
     * ✅ Creates a task list item and attaches a remove button with event
     * @param {string} taskText - The text content of the task
     */
    function createTaskElement(taskText) {
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        const newButton = document.createElement('button');
        newButton.textContent = 'Remove';
        newButton.classList.add('remove-btn');

        // ✅ When "Remove" is clicked:
        // Remove the task from the DOM and from both the tasks array and Local Storage
        newButton.addEventListener('click', function () {
            taskList.removeChild(listItem); // Remove from UI

            // Filter out the removed task from the tasks array
            tasks = tasks.filter(task => task !== taskText);

            // Save the updated array back to Local Storage
            localStorage.setItem('tasks', JSON.stringify(tasks));
        });

        // Append the remove button to the list item and then add to the list
        listItem.appendChild(newButton);
        taskList.appendChild(listItem);
    }

    /**
     * ✅ Handles the logic for adding a new task:
     * - Validates input
     * - Updates the task list in memory
     * - Updates Local Storage
     * - Adds task to the DOM
     */
    function addTask () {
        const taskText = taskInput.value.trim(); // Get input and remove spaces

        if (taskText === "") {
            alert('please enter a text.');
            return;
        }

        // ✅ Add task to the memory array
        tasks.push(taskText);

        // ✅ Save updated array to Local Storage
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // ✅ Create and display the task in the DOM
        createTaskElement(taskText);

        // ✅ Clear the input field after adding
        taskInput.value = "";
    }

    // ✅ Add task when "Add" button is clicked
    addButton.addEventListener('click', addTask);

    // ✅ Add task when "Enter" key is pressed inside input
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === "Enter") {
            addTask();
        }
    });
});
