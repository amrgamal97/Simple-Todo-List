let input = document.querySelector(".input")
let submit = document.querySelector(".sub")
let tasksDiv = document.querySelector(".tasks")
let clear = document.querySelector(".clearAll")

// Array To Store Tasks 
let arrayOfTasks = [];

if (localStorage.getItem("item")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("item"));
}

// Trigger Items From Local Storage
getFromLocalStorage();

submit.addEventListener("click", (e) => {
    e.preventDefault();
})

// Add Task 

submit.addEventListener("click", function () {
    if (input.value !== "") {
        // Adding The Task To An Array 
        addTaskToArray(input.value);
        input.value = "";
    }
})

clear.addEventListener("click", (e) => {
    e.preventDefault();
})
clear.addEventListener("click", () => {
    tasksDiv.innerHTML = "";
    localStorage.clear();
})

function addTaskToArray(taskText) {
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false,
    };
    // Push Task To Array
    arrayOfTasks.push(task);

    // Add Elements To My Page 
    addElementsToPage(arrayOfTasks)

    // Add Tasks To Local Storage 
    addToLocalStorage(arrayOfTasks)
    // console.log(arrayOfTasks)
    // console.log(JSON.stringify(arrayOfTasks))
}

function addElementsToPage(arrayOfTasks) {
    tasksDiv.innerHTML = "";
    // Looping On Array Of Tasks 
    arrayOfTasks.forEach((task) => {
        let div = document.createElement("div");
        div.className = "task";
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));

        // Checking Task Status 
        if (task.completed) {
            div.className = "task done"
        }
        // Create Delete Button
        let deleteBtn = document.createElement("span");
        deleteBtn.className = "del";
        deleteBtn.appendChild(document.createTextNode("Delete"));

        // Append Delete To Div
        div.appendChild(deleteBtn)
        tasksDiv.appendChild(div);

    });
}

// Delete And Update Tasks 
tasksDiv.addEventListener("click", function (e) {
    if (e.target.classList.contains("del")) {
        // Remove From Page 
        e.target.parentElement.remove();
        // Remove From LS  
        deleteFromLocal(e.target.parentElement.getAttribute("data-id"));
    }
    if (e.target.classList.contains("task")) {

        toggleTheStatus(e.target.getAttribute("data-id"));
        e.target.classList.toggle("done")
    }
})


function addToLocalStorage(arr) {
    window.localStorage.setItem("item", JSON.stringify(arr))
}

function getFromLocalStorage() {
    let data = localStorage.getItem("item")
    if (data) {
        item = JSON.parse(data);
        console.log(item)
        addElementsToPage(item)
    }
}

function deleteFromLocal(taskId) {
    arrayOfTasks = arrayOfTasks.filter((e) => e.id != taskId);
    addToLocalStorage(arrayOfTasks);
}

function toggleTheStatus(e) {
    for (let i = 0; i < arrayOfTasks.length; i++) {
        if (arrayOfTasks[i].id == e) {
            if (arrayOfTasks[i].completed === false) {
                arrayOfTasks[i].completed = true;
            }
            else {
                arrayOfTasks[i].completed = false;
            }
        }
    }

    addToLocalStorage(arrayOfTasks);
}