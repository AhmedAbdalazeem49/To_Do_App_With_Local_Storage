let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

// Empty Array To Store The Tasks
let arrayOfTasks = [];

// Check if there is tasks in Local Storage

if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("task"));
}

// Trigger Get Data
getDataFromLocalStorage();

// Add Task
submit.onclick = function () {
  if (input.value !== "") {
    // Add Task To Array Of Tasks
    addTaskToArray(input.value);

    // Empty The Input
    input.value = "";
  }
};

// Click ON Task Element
tasksDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    // Remove Task From Local Storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));

    // Remove Element From Page
    e.target.parentElement.remove();
  }

  // Task Element
  if (e.target.classList.contains("task")) {
    // Toggle Completed For the task
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    // Toggle Done class
    e.target.classList.toggle("done");
  }
});

function addTaskToArray(taskText) {
  // Task Data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  // push Task To Array Of Tasks
  arrayOfTasks.push(task);

  // Add tasks to Page
  addElementsToPageFrom(arrayOfTasks);

  // Add Tasks To Local Storage
  addDataToLocalStorageFrom(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks) {
  // Empty the Tasks Div
  tasksDiv.innerHTML = "";

  // Loop On Array Of tasks
  arrayOfTasks.forEach((task) => {
    // Create Main Div
    let div = document.createElement("div");
    div.className = "task";

    // Check if Task is Done
    if (task.completed) {
      div.className = "task done";
    }

    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));

    // Create Delete Button
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));

    // Append Button to Main Div
    div.appendChild(span);

    // Add Task Div To tasks Container
    tasksDiv.appendChild(div);
  });
}

function addDataToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");

  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}

function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(arrayOfTasks);
}

function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  addDataToLocalStorageFrom(arrayOfTasks);
}
