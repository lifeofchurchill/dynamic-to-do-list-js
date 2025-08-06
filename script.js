document.addEventListener('DOMContentLoaded', function() {

    const addButton = document.getElementById('add-task-btn')
    const taskInput = document.getElementById('task-input')
    const taskList = document.getElementById('task-list')

    function addTask () {
        let taskText = document.getElementById('task-input')

        if (taskText === "") {
            alert('please enter a text.')
            return;
        } 

        const listItem = document.createElement('li')
        listItem.textContent = taskText

        const newButton = document.createElement('button')
        newButton.textContent = 'Remove'
        newButton.classList.add('remove-btn')

        newButton.addEventListener('click', function () {
            taskList.removeChild(listItem)
        })

        listItem.appendChild(newButton)
        taskList.appendChild(listItem)

        taskInput.value.trim() = ""
    }

    addButton.addEventListener('click', function() {
        addTask()
    })

    taskInput.addEventListener('keypress', function(event) {
        if(event.key === "Enter"){
            addTask();
        }
    })
})

