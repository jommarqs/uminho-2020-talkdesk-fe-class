console.log('Welcome to UMinho 2020 FE class')

// find the elements
const rootElement = document.getElementById('root');
const list = rootElement.querySelector('.todo-list');

// Add Todo Function
function addTodo(description) {
  // create todo `li` with `todo-item` class
  const todoElem = document.createElement('li');
  todoElem.setAttribute('class', 'todo-item');

  // create description `span` with description text
  const descriptionElem = document.createElement('span');
  descriptionElem.setAttribute('class', 'description');
  descriptionElem.innerText = description;

  // register toggle click event listener
  descriptionElem.addEventListener('click', event => toggleTodo(todoElem));

  // create remove `span`
  const removeElem = document.createElement('span');
  removeElem.setAttribute('class', 'remove');
  removeElem.innerText = '\u2716';

  // register remove click event listener
  removeElem.addEventListener('click', event => removeTodo(todoElem));

  // add DOM elements to list
  todoElem.appendChild(descriptionElem);
  todoElem.appendChild(removeElem);
  list.appendChild(todoElem);
}

addTodo('Learn CSS');
addTodo('Learn HTML');
addTodo('Learn JavaScript');

function handleKeyPress(event) {
  const value = event.target.value;
  const key = event.key;

  if (key === 'Enter' && value !== '') {
    addTodo(value);
    event.target.value = '';
  }
}

// register keypress on the input
const input = rootElement.querySelector('.add-todo');
input.addEventListener('keypress', handleKeyPress);


function toggleTodo(todoElem) {
  todoElem.classList.toggle('done');
}

function removeTodo(todoElem) {
  list.removeChild(todoElem);
}

function resetTodosList() {
  //return fetch('https://jsonplaceholder.typicode.com/todos')
  fetch('https://www.mocky.io/v2/5e7a000b3000007800930554')
    .then(r => r.json())
    .then(todosList => todosList.filter(todo => todo.userId === 1))
    .then(todosList => {
      console.log(todosList);
      return todosList;
    })
    .then(todosList => {
      list.innerHTML = "";
      todosList.forEach(todo => {
        addTodo(todo.title);
      })
    })
}

// register todos click handler
const resetTodo = rootElement.querySelector('.reset-todos');
resetTodo.addEventListener('click', resetTodosList);
