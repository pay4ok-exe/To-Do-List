let toDoList = [];

const addBtn = document.getElementById("add-btn");
const input = document.getElementById("new-task");

function addToDoList(text){
    if(input.value!==""){
        newTask = {
            id: Date.now(),
            text: input.value,
        }
        toDoList.push(newTask);
        input.value="";
    } 

    // console.log(toDoList);
    updateToDoList();
    // console.log(toDoList)

}

addBtn.addEventListener('click', addToDoList);

// function updateToDoList(){
//     const todoList = document.getElementById("todo-list");
//     console.log(todoList.outerText)
// }

// updateToDoList();

function updateToDoList() {
    const todoListContainer = document.getElementById("todo-list");
    todoListContainer.innerHTML = ""; // Clear the existing todo list

    // Loop through the toDoList array and create HTML elements for each task
    toDoList.forEach((task, index) => {
        const listItem = document.createElement("div");
        listItem.className = "todo-item";

        // Create divs to hold text and buttons
        const textDiv = document.createElement("div");
        textDiv.className = "text-div";
        textDiv.textContent = task.text;

        const buttonDiv = document.createElement("div");
        buttonDiv.className = "button-div";

        // Create edit and remove buttons
        const editButton = document.createElement("button");
        editButton.classList.add("edit-btn", "btn", "btn-secondary", "font-monospace", "rounded-3");
        editButton.textContent = "Edit";

        const removeButton = document.createElement("button");
        removeButton.classList.add("remove-btn", "btn", "btn-danger", "font-monospace", "rounded-3");
        removeButton.textContent = "Remove";

        // Append buttons to button div
        buttonDiv.appendChild(editButton);
        buttonDiv.appendChild(removeButton);

        // Append text and button divs to task div
        listItem.appendChild(textDiv);
        listItem.appendChild(buttonDiv);

        // Append the task div to the todo list container
        todoListContainer.appendChild(listItem);












        // Edit Logic


        let originalText = ''; // Variable to store the original text of the task being edited

        editButton.addEventListener("click", () => {
            input.value = task.text;
            originalText = task.text; // Store the original text
            addBtn.textContent = "Save";
            
            addBtn.addEventListener("click", () => {
                // Check if the text has changed and is empty
                if (task.text !== input.value && input.value === '') {
                    // Remove the old task from the todo list
                    toDoList = toDoList.filter(t => t.id !== task.id);
                    // Update the displayed list
                    updateToDoList();
                } else {
                    // Update the task text and display
                    toDoList[index].text = input.value;
                    textDiv.textContent = input.value;
                    input.value = "";
                    addBtn.textContent = "Add";
                    updateToDoList();

                    
                }addBtn.textContent = "Add";
            });
            // console.log(toDoList)
        });


        removeButton.addEventListener("click", () => {
            // Remove the task from the todo list
            toDoList = toDoList.filter(t => t.id !== task.id);
            // Update the displayed list
            updateToDoList();
        });

        // if (task.text === '') {
        //     toDoList = toDoList.filter(t => t.id !== task.id);
        // }
        

        
    });

    // Toggle the display of todo list container based on whether there are tasks
    if (toDoList.length > 0) {
        todoListContainer.style.display = "block";
    } else {
        todoListContainer.style.display = "none";
    }
    
}

function saveToDo(){
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
}

window.addEventListener('beforeunload',saveToDo);

function loadTodos(){
    const storedTodos = localStorage.getItem("toDoList");
    if(storedTodos){
        toDoList = JSON.parse(storedTodos);
        updateToDoList();
    }
}
loadTodos();

updateToDoList();
