const todoList = [{
  name: 'make dinner',
  dueDate: '08-08-2025'
}, {
  name: 'wash dishes',
  dueDate: '08-08-2025'
}];

renderTodoList();
 
function renderTodoList() {
  let todoListHTML = '';

  todoList.forEach((todoObject, index) => {
    const {name,dueDate} = todoObject;
    
    const html = `
        <div>${name}</div>
        <div>${dueDate}</div>
        <button class="delete-todo-button js-delete-todo-button">Delete</button>
      `;
    todoListHTML += html;
  });

  document.querySelector('.js-todo-list').innerHTML = todoListHTML;
  document.querySelectorAll('.js-delete-todo-button')
    .forEach((deleteButton,index) => {
      deleteButton.addEventListener('click',() => {
        todoList.splice(index,1);
        renderTodoList();
      });
    });
}

document.querySelector('.js-add-todo-button').addEventListener('click',() => {
  addTodo();
})

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const dateInputElement = document.querySelector('.js-due-date-input');
  
  todoList.push(
    {
      name: inputElement.value,
      dueDate: dateInputElement.value
    }
  );

  inputElement.value = '';

  renderTodoList();
}