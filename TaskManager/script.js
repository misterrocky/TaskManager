let taskList = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(taskList));
}

function displayTasks() {
  const taskUl = document.getElementById("task-list");
  const filterStatus = document.getElementById("filter-status").value;
  taskUl.innerHTML = "";

  taskList.forEach((task, index) => {
    if (filterStatus !== "All" && task.status !== filterStatus) return;

    const li = document.createElement("li");

    li.innerHTML = `
      <div class="task-details">
        <strong>${task.text}</strong> — ${task.status}
        ${task.deadline ? `(Due: ${task.deadline})` : ""}
      </div>
      <div class="actions">
        <button onclick="updateStatus(${index})">Update</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    taskUl.appendChild(li);
  });
}

document.getElementById("task-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const text = document.getElementById("task-input").value;
  const status = document.getElementById("status").value;
  const deadline = document.getElementById("deadline").value;

  taskList.push({ text, status, deadline });
  saveTasks();
  displayTasks();

  this.reset();
});

function updateStatus(index) {
  const currentStatus = taskList[index].status;
  const newStatus = prompt("Enter new status (Pending, In Progress, Completed):", currentStatus);
  if (newStatus) {
    taskList[index].status = newStatus;
    saveTasks();
    displayTasks();
  }
}

function deleteTask(index) {
  if (confirm("Are you sure you want to delete this task?")) {
    taskList.splice(index, 1);
    saveTasks();
    displayTasks();
  }
}

document.getElementById("filter-status").addEventListener("change", displayTasks);

// Initial display
displayTasks();
