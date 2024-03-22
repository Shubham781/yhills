// Find elements and give them a variable
var taskInput = document.getElementById("tasktext");
var addButton = document.getElementById("createtask");
var incompletedTaskHolder = document.getElementById("taskincomplete");
var completedTaskHolder = document.getElementById("taskcomplete");

var createNewTaskElement = function(taskString) {
    var listItem = document.createElement("li");
    var checkBox = document.createElement("input");
    var label = document.createElement("label");
    var editInput = document.createElement("input");
    var editButton = document.createElement("button");
    var deleteButton = document.createElement("button");

    // Each element needs modifying

    checkBox.type = "checkbox";
    editInput.type = "text";

    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";

    label.innerText = taskString;

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
}

var addTask = function() {
    console.log("add Task");
    var listItem = createNewTaskElement(taskInput.value);
    incompletedTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = ''; // Clear the input field after adding task
}

var editTask = function() {
    console.log("edit Task");
    var listItem = this.parentNode;
    var label = listItem.querySelector('label');
    var editInput = listItem.querySelector('input[type=text]');
    var editButton = listItem.querySelector('button.edit');
    var containsClass = listItem.classList.contains('editMode');

    // If the class of the parent is .editmode
    if (containsClass) {
        // Switch from .editmode
        // Label text become the input's value
        label.innerText = editInput.value;
        editButton.innerText = 'Edit';
    } else {
        // Switch to .editmode
        // input value becomes the label's text
        editInput.value = label.innerText;
        editButton.innerText = 'Save';
    }

    // Toggle .editmode on the parent
    listItem.classList.toggle('editMode');
}

var deleteTask = function() {
    console.log("delete Task");
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    // Remove the parent list item from the ul
    ul.removeChild(listItem);
}

var taskCompleted = function() {
    console.log("task completed");
    var listItem = this.parentNode;
    completedTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

var taskIncomplete = function() {
    console.log("task incomplete");
    var listItem = this.parentNode;
    incompletedTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
    var checkbox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("button.edit");
    var deleteButton = taskListItem.querySelector("button.delete");

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkbox.onchange = checkBoxEventHandler;
}

var ajaxRequest = function() {
    console.log("AJAX request");
}

// Set the click handler to the addTask function
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

// Loop through each task holder and bind task events
for (var i = 0; i < incompletedTaskHolder.children.length; i++) {
    bindTaskEvents(incompletedTaskHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTaskHolder.children.length; i++) {
    bindTaskEvents(completedTaskHolder.children[i], taskIncomplete);
}
