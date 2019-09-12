(function() {
  let storage = {
    todo: []
  };

  const table = document.querySelector(".table tbody");
  const mainTable = document.querySelector("table");
  const form = document.querySelector("form");
  const title = document.querySelector("input[name=title]");
  const text = document.querySelector("input[name=text]");
  const alertContainer = document.querySelector(".container");
  const wrapperForm = document.querySelector(".card");
  const trTable = table.getElementsByTagName("tr");

  const allTaskList = document.createElement("button");
  allTaskList.textContent = "All tasks";
  allTaskList.classList.add("btn", "btn-info", "mb-3");
  mainTable.insertAdjacentElement("beforebegin", allTaskList);

  const incompliteTasks = document.createElement("button");
  incompliteTasks.textContent = "Incomplite";
  incompliteTasks.classList.add("btn", "btn-info", "mb-3", "ml-3");
  mainTable.insertAdjacentElement("beforebegin", incompliteTasks);

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    if (title.value === "") {
      // console.log("Title is empty");
      alertMessage("alert-danger", "Title is empty");
      return;
    }
    // console.log("title", title.value);
    addNewToDoToStorage(title.value, text.value);
    alertMessage("alert-info", "Task added");
    emptyTodoList();
    doneTask();
    deleteTask();

    form.reset();
  });

  function generateId() {
    const words =
      "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
    let id = "";
    for (let char of words) {
      let index = Math.floor(Math.random() * words.length);
      id += words[index];
    }

    return id;
  }
  // console.log(generateId());

  function addNewToDoToStorage(title, text) {
    if (!title) return console.log("Enter title of task");

    const newTask = {
      id: generateId(),
      title: title, //title, - равнозначно
      text: text || ""
    };

    storage.todo.push(newTask);

    addNewTodoToView(newTask);
    return storage.todo;
  }

  /**
   * Add new task to view
   * @param {Object} task
   */

  function addNewTodoToView(task) {
    const template = todoTemplate(task);
    table.insertAdjacentHTML("afterbegin", template);
  }

  // console.log(storage.todo);

  // console.log(storage);
  // console.log(storage.todo);

  function deliteTaskFromStorage(id) {
    if (!id) return console.log("No ID!");

    let removedTask;

    for (let i = 0; i < storage.todo.length; i++) {
      if (storage.todo[i].id === id) {
        removedTask = storage.todo.splice(1, 1);
        break;
      }
    }
    return removedTask;
  }

  // addNewToDoToStorage("Hello", "World");

  deliteTaskFromStorage(1);

  function editTaskStorage(id, title, text) {
    if (!id) return console.log("Передайте id задачи");

    const todoList = storage.todo;

    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].id === id) {
        todoList[i].title === title;
        todoList[i].text === text;
        break;
      } else {
        console.log("ID is not fined!");
      }
    }
    storage.todo = todoList;
  }

  // storage.todo[0].id = "123";

  editTaskStorage("123", "Edit title", "New edited text");
  // console.log(storage.todo);

  /**
   * Create html template
   *
   * @parem {Object} task
   */

  function todoTemplate(task) {
    return `
    <tr data-id="${task.id}">
      <td>${task.title}</td>
      <td>${task.text}</td>
      <td>
        <i class="fas fa-trash"></i>
        <i class="fas fa-edit"></i>
        <button class="done btn btn-success ml-2">Done</button>
      </td>
    </tr>
    `;
  }

  function alertMessage(className, message) {
    removeAlert();
    const currentAllert = alertTemplate(className, message);

    alertContainer.insertAdjacentHTML("afterbegin", currentAllert);

    setTimeout(removeAlert, 2000);
  }

  function alertTemplate(className, message) {
    return `<div class="alert ${className}">${message}</div>`;
  }

  function removeAlert() {
    const currentAllert = document.querySelector(".alert");
    if (currentAllert) {
      alertContainer.removeChild(currentAllert);
    }
  }

  //Если массив с задачами пустой то под формой нужно выводить сообщение об этом, также это же сообщение нужно выводить если вы удалите все задачи.

  function emptyTodoList() {
    let templateEmpty = ` 
  <p class="font-weight-light">Task list is empty!</p> 
  `;

    document
      .querySelectorAll(".font-weight-light")
      .forEach(item => item.parentElement.removeChild(item));

    if (trTable.length === 0) {
      wrapperForm.insertAdjacentHTML("afterend", templateEmpty);
    }
  }

  emptyTodoList();

  //В каждую задачу добавить кнопку которая будет делать задачу выполненой. завершенные задачи должны быть подсвечены любым цветом.

  function doneTask() {
    let allTasks = table.querySelectorAll("tr");

    for (let i = 0; i < allTasks.length; i++) {
      let btn = trTable[i].querySelector(".done");

      btn.addEventListener("click", function(event) {
        if (allTasks[i].contains(btn) === true) {
          return allTasks[i].classList.add("bg-info");
        }
      });
    }
  }

  doneTask();

  function deleteTask() {
    let allTasks = table.querySelectorAll("tr");

    for (let i = 0; i < allTasks.length; i++) {
      let deleteTableRow = trTable[i].querySelector(".fa-trash");

      deleteTableRow.addEventListener("click", function(event) {
        if (allTasks[i].contains(deleteTableRow) === true) {
          return allTasks[i].remove();
        }
      });
    }
  }

  deleteTask();
  /* при удалении задания строка о пустом тасклисте не появляется. я пыталась вызывать функцию при условии, пыталась передавать ее как callback, пробовала вызывать в 3-х местах, не срослось */

  /**Добавить функционал отображения незавершенных задач и всех задач. т.е у вас будет две кнопки над таблицей 1-я "показать все задачи" и 2-я "показать незавершенные задачи", определить завершена задача или нет можно по полю completed в объекте задачи. По умолчанию при загрузке отображаются все задачи. */

  incompliteTasks.addEventListener("click", function(event) {
    let allTasks = table.querySelectorAll("tr");

    for (let i = 0; i < allTasks.length; i++) {
      if (allTasks[i].classList.contains("bg-info")) {
        return allTasks[i].classList.add("d-none");
      }
    }
  });

  allTaskList.addEventListener("click", function(event) {
    let allTasks = table.querySelectorAll("tr");

    for (let i = 0; i < allTasks.length; i++) {
      if (allTasks[i].classList.contains("d-none")) {
        return allTasks[i].classList.remove("d-none");
      }
    }
  });
})();
