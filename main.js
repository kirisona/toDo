//псевдокод

// task = {
//   id: {
//     type: String,
//     required: true
//   },
//   title: {
//     type: String,
//     required: true
//   },
//   text: {
//     type: String,
//     required: false
//   }
// };

(function() {
  let storage = {
    todo: []
  };

  const table = document.querySelector(".table tbody");
  const form = document.querySelector("form");
  const title = document.querySelector("input[name=title]");
  const text = document.querySelector("input[name=text]");
  const alertContainer = document.querySelector('.container');

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    console.log(event.target);

    if (title.value === "") {
      console.log("Title is empty");
      alertMessage('alert-danger', 'Title is empty');
      return;
    }
    console.log("title", title.value);
    addNewToDoToStorage(title.value, text.value);
    alertMessage('alert-info', 'Task added');

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
  console.log(generateId());

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

  addNewToDoToStorage("Do homework", "dedline 22.08 09:00");
  // addNewToDoToStorage("Sleep", "today");
  // addNewToDoToStorage("Go home");

  console.log(storage.todo);

  console.log(storage);
  console.log(storage.todo);

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

  storage.todo[0].id = "123";

  editTaskStorage("123", "Edit title", "New edited text");
  console.log(storage.todo);

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
      </td>
    </tr>
    `;
  }

  function alertMessage(className, message) {
    removeAlert();
    const currentAllert = alertTemplate(className, message);

    alertContainer.insertAdjacentHTML('afterbegin', currentAllert);

    setTimeout(removeAlert, 2000);
  }

  function alertTemplate(className, message) {
    return `<div class="alert ${className}">${message}</div>`;
  }

  function removeAlert() {
    const currentAllert = document.querySelector('.alert');
    if (currentAllert) {
      alertContainer.removeChild(currentAllert);
    }
  }
})();
