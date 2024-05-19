var black = document.querySelector(".black");
var select = document.querySelector(".select");

function task() {
    var insert = document.querySelector(".insert");
    insert.style.display = "block";
    black.style.display = "block";
}

function cancel() {
    var insert = document.querySelector(".insert");
    insert.style.display = "none";
    black.style.display = "none";
}

function addTask() {
    var taskInput = document.getElementById("taskInput").value.trim();
    var categorySelect = document.getElementById("categorySelect").value;
    var taskList = document.getElementById("taskList");

    if (taskInput !== "") {
        var container = document.createElement('li');
        container.classList.add('container');

        var taskText = document.createElement('div');
        taskText.classList.add('tasktext');
        taskText.textContent = taskInput;

        var checkbox = document.createElement('input');
        checkbox.classList.add('inputs')
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                taskText.style.textDecoration = 'line-through';
            } else {
                taskText.style.textDecoration = 'none';
            }
            saveTasksToLocalStorage();
        });

        var categoryText = document.createElement('div');
        categoryText.classList.add('categorytext');
        categoryText.textContent = categorySelect;

        var edit = document.createElement('span');
        edit.classList.add('editicon');
        edit.innerHTML = '&#9998;';

        var deleteicon = document.createElement('span');
        deleteicon.classList.add('deleteicon');
        deleteicon.innerHTML = '&#10006;';

        container.appendChild(checkbox);
        container.appendChild(taskText);
        container.appendChild(categoryText);
        container.appendChild(edit);
        container.appendChild(deleteicon);

        edit.addEventListener('click', function() {
            var edi = document.querySelector(".edi")
            var editBtn = document.querySelector("#editBtn");
            var cancelBtn = document.querySelector("#cancelBtnEdit");
            edi.style.display = "block";
            black.style.display = "block";

            editBtn.onclick=function(){
                var newTaskInput = document.getElementById("newTaskInput").value
                if (newTaskInput !== null && newTaskInput.trim()!==''){
                    taskText.textContent=newTaskInput;
                }
                edi.style.display = "none";
                black.style.display = "none";
                document.getElementById("newTaskInput").value = '';
                saveTasksToLocalStorage();
            }

            cancelBtn.onclick=function(){
                edi.style.display = "none";
                black.style.display = "none";
                saveTasksToLocalStorage();
            }
        });

        deleteicon.addEventListener('click', function() {
            var del = document.querySelector(".del");
            var deleteBtn = document.querySelector("#deleteBtn");
            var cancelBtn = document.querySelector("#cancelBtn");
            del.style.display = "block";
            black.style.display = "block";

            deleteBtn.onclick=function(){
                taskList.removeChild(container);
                del.style.display = "none";
                black.style.display = "none";
                saveTasksToLocalStorage();
            }

            cancelBtn.onclick=function(){
                del.style.display = "none";
                black.style.display = "none";
                saveTasksToLocalStorage();
            }
        });

        taskList.appendChild(container);

        // Clear input fields
        document.getElementById("taskInput").value = '';
        document.getElementById("categorySelect").value = 'none';

        // Save tasks to local storage
        saveTasksToLocalStorage();

        // Hide input section
        cancel();
    }
}

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
    var tasks = Array.from(document.querySelectorAll('.container')).map(task => {
        return {
            taskText: task.querySelector('.tasktext').textContent,
            categoryText: task.querySelector('.categorytext').textContent,
            checked: task.querySelector('.inputs').checked,
            textDecoration: task.querySelector('.tasktext').style.textDecoration
        };
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
    var tasks = localStorage.getItem('tasks');
    if (tasks) {
        tasks = JSON.parse(tasks);
        tasks.forEach(task => {
            var container = document.createElement('li');
            container.classList.add('container');

            var taskText = document.createElement('div');
            taskText.classList.add('tasktext');
            taskText.textContent = task.taskText;
            taskText.style.textDecoration = task.textDecoration;

            var checkbox = document.createElement('input');
            checkbox.classList.add('inputs')
            checkbox.type = 'checkbox';
            checkbox.checked = task.checked;
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    taskText.style.textDecoration = 'line-through';
                } else {
                    taskText.style.textDecoration = 'none';
                }
                saveTasksToLocalStorage();
            });

            var categoryText = document.createElement('div');
            categoryText.classList.add('categorytext');
            categoryText.textContent = task.categoryText;

            var edit = document.createElement('span');
            edit.classList.add('editicon');
            edit.innerHTML = '&#9998;';

            var deleteicon = document.createElement('span');
            deleteicon.classList.add('deleteicon');
            deleteicon.innerHTML = '&#10006;';

            container.appendChild(checkbox);
            container.appendChild(taskText);
            container.appendChild(categoryText);
            container.appendChild(edit);
            container.appendChild(deleteicon);

            edit.addEventListener('click', function(){
                var edi = document.querySelector(".edi")
                var editBtn = document.querySelector("#editBtn");
                var cancelBtn = document.querySelector("#cancelBtnEdit");
                edi.style.display = "block";
                black.style.display = "block";
    
                editBtn.onclick=function(){
                    var newTaskInput = document.getElementById("newTaskInput").value
                    if (newTaskInput !== null && newTaskInput.trim()!==''){
                        taskText.textContent=newTaskInput;
                    }
                    edi.style.display = "none";
                    black.style.display = "none";
                    document.getElementById("newTaskInput").value = '';
                    saveTasksToLocalStorage();
                }
    
                cancelBtn.onclick=function(){
                    edi.style.display = "none";
                    black.style.display = "none";
                    saveTasksToLocalStorage();
                }
            });

            deleteicon.addEventListener('click', function() {
                var del = document.querySelector(".del");
                var deleteBtn = document.querySelector("#deleteBtn");
                var cancelBtn = document.querySelector("#cancelBtn");
                del.style.display = "block";
                black.style.display = "block";
    
                deleteBtn.onclick=function(){
                    taskList.removeChild(container);
                    del.style.display = "none";
                    black.style.display = "none";
                    saveTasksToLocalStorage();
                }
                cancelBtn.onclick=function(){
                    del.style.display = "none";
                    black.style.display = "none";
                    saveTasksToLocalStorage();
                }
            });

            document.getElementById("taskList").appendChild(container);
        });
    }
}

// Filter tasks based on category
function filterTasks(category) {
    var taskContainers = document.querySelectorAll('.container');
    taskContainers.forEach(container => {
        var categoryText = container.querySelector('.categorytext').textContent;
        var taskText = container.querySelector('.tasktext');
        var isChecked = container.querySelector('.inputs').checked;

        if (category === "all" || category === categoryText.toLowerCase()) {
            container.classList.remove('hidden');
        } else if (category === "done" && taskText.style.textDecoration === 'line-through') {
            container.classList.remove('hidden');
        } else if (category === "notdone" && !isChecked && taskText.style.textDecoration !== 'line-through') {
            container.classList.remove('hidden');
        } else {
            container.classList.add('hidden');
        }
    });
}

// Call the function to load tasks when the page loads
document.addEventListener('DOMContentLoaded', function() {
    loadTasksFromLocalStorage();
    select.addEventListener("change", function() {
        const selected = select.value;
        filterTasks(selected);
    });
});