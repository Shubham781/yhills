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
    taskInput.value = ''; 
}

var editTask = function() {
    console.log("edit Task");
    var listItem = this.parentNode;
    var label = listItem.querySelector('label');
    var editInput = listItem.querySelector('input[type=text]');
    var editButton = listItem.querySelector('button.edit');
    var containsClass = listItem.classList.contains('editMode');
    
    if (containsClass) {
        label.innerText = editInput.value;
        editButton.innerText = 'Edit';
    } else {
        editInput.value = label.innerText;
        editButton.innerText = 'Save';
    }

    listItem.classList.toggle('editMode');
}

var deleteTask = function() {
    console.log("delete Task");
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
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

addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

for (var i = 0; i < incompletedTaskHolder.children.length; i++) {
    bindTaskEvents(incompletedTaskHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTaskHolder.children.length; i++) {
    bindTaskEvents(completedTaskHolder.children[i], taskIncomplete);
}
