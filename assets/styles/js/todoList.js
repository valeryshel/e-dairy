const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const clearButtonTask = document.getElementById('clearButtonTask')
const taskList = document.getElementById("taskList");
const task = taskInput.value;
const errorValidation =document.getElementById('errorTask')

function showTask() {
    let taskItemsResponse = JSON.parse(localStorage.getItem('taskItems'));
    if (taskItemsResponse === null || taskItemsResponse.length === 0) { 
      taskList.classList.toggle("nonexisttask");
      taskList.innerHTML = 'Задачи отсутствуют'; 
      clearButtonTask.disabled = true;
    } else {
      taskList.innerHTML = '';
      clearButtonTask.disabled = false;
      taskList.classList.toggle("existtask");

      taskItemsResponse.forEach(task => {
        const newElementli = document.createElement('li');
        newElementli.classList.add('elementsTaskLi');
        const newElemenSpan = document.createElement('span');
        newElemenSpan.classList.add('spanList');

        newElemenSpan.textContent = task.name;
        if (task.completed) {
          newElemenSpan.style.textDecoration = 'line-through';
        }

        const elementsButton = document.createElement('div');
        elementsButton.classList = 'elementsButton'
        const buttonDone = document.createElement('button');
        buttonDone.classList.add('btn-action', 'done');
        buttonDone.innerHTML = '&#10004;';

    
        const buttonDelete = document.createElement('button');
        buttonDelete.classList.add('btn-action', 'delete');
        buttonDelete.innerHTML = '&#10006;';

    
        newElementli.appendChild(newElemenSpan);
        newElementli.appendChild(elementsButton);
        elementsButton.appendChild(buttonDone);
        elementsButton.appendChild(buttonDelete);
        taskList.appendChild(newElementli);

          
  
function deleteOneTask(taskId) {
    let taskItems = JSON.parse(localStorage.getItem('taskItems'));
    taskItems = taskItems.filter(item => item.idTask !== taskId);
    localStorage.setItem('taskItems', JSON.stringify(taskItems));
    showTask();
}

function completedTask(taskId) {
    let taskItems = JSON.parse(localStorage.getItem('taskItems'));
    taskItems.forEach(task => {
      if (task.idTask === taskId) {
        task.completed = task.completed ? false : true;

      }
    });
    localStorage.setItem('taskItems', JSON.stringify(taskItems));
    showTask();
}

buttonDone.addEventListener('click', () => {
    const taskId = task.idTask;
    completedTask(taskId);
});

buttonDelete.addEventListener('click', () => {
    const taskId = task.idTask;
    deleteOneTask(taskId);
});


      });
    }
  }



taskInput.addEventListener('input', function() {
  errorValidation.innerHTML = ''; // Очистить поле ошибки при вводе текста
  });
  


function createTask() {
    const task = taskInput.value;
    if (task.trim() !== '') {
      let taskItems = JSON.parse(localStorage.getItem('taskItems')) || [];
      taskItems.push({ idTask: taskItems.length + 1, name: task, completed: false });
      localStorage.setItem('taskItems', JSON.stringify(taskItems));
      showTask();
      taskList.classList.remove("nonexisttask");
      taskInput.value = '';
      errorValidation.innerHTML = ''; // Очистить поле ошибки
    } else {
      errorValidation.innerHTML = 'Кажется, вы что-то забыли заполнить';
    }

  }

addButton.addEventListener("click", createTask);


function clearTasks() {
    let taskItems = JSON.parse(localStorage.getItem('taskItems'));
    if (taskItems !== null) {
        localStorage.removeItem('taskItems');
        showTask();
        taskList.classList.add("nonexisttask");
        clearButtonTask.disabled = true; // Запретить повторное нажатие на кнопку "Очистить"
    } else {
        showTask();
    }
}

clearButtonTask.addEventListener("click", clearTasks);


document.addEventListener("DOMContentLoaded", showTask);
