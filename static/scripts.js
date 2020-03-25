console.log('Welcome to UMinho 2020 FE class')


class BaseComponent {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.state = {};

    // hack to make sure that these methods are binded to the current object
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind
    this.setState = this.setState.bind(this);
    this.render = this.render.bind(this);
  }

  setState(newState) {
    Object.assign(this.state, newState);

    this.render();
  }

  render() {}
}

class TodosList extends BaseComponent {
  constructor(rootElement) {
    super(rootElement);
    this.listElement = rootElement.querySelector(".todo-list");

    const initialTodos = [
      {
        id: 'init1',
        title: "Learn CSS",
        completed: true
      },
      {
        id: 'init2',
        title: "Learn HTML",
        completed: true
      },
      {
        id: 'init3',
        title: "Learn JavaScript",
        completed: false
      }
    ];

    this.state = {
      todos: initialTodos
    };

    // binds
    this.toggleTodo = this.toggleTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.resetTodosList = this.resetTodosList.bind(this);

    // initial render
    this.render();
  }

  handleKeyPress(event) {
    const value = event.target.value;
    const key = event.key;

    if (key === "Enter" && value !== "") {
      this.addTodo(value);
      event.target.value = "";
    }
  }

  resetTodosList() {
    //return fetch('https://jsonplaceholder.typicode.com/todos')
    fetch("https://www.mocky.io/v2/5e7a000b3000007800930554")
      .then(r => r.json())
      .then(todosList => todosList.filter(todo => todo.userId === 1))
      .then(todosList => this.setState({ todos: todosList}));
  }

  addTodo(title) {
    const { todos } = this.state;

    const newTodo = {
      id: 'newtodo_' + Math.random().toString(36).substr(2),
      title: title,
      completed: false
    };

    this.setState({ todos: [...todos, newTodo]})
  }

  toggleTodo(id) {
    const newTodos = this.state.todos.map(todo => {
      return todo.id !== id ? todo : { ...todo, completed: !todo.completed };
    });

    this.setState({ todos: newTodos });
  }

  removeTodo(id) {
    const newTodos = this.state.todos.filter(todo => todo.id !== id);

    this.setState({ todos: newTodos });
  }

  // this version is the most inefficient because it recreates all of the elements everytime we have a change
  render() {
    const { todos } = this.state;

    /*
      <div id="root">
        <div class="todo-app">
          <h1 class="title">todos</h1>
          <div class="todos">
            <input class="add-todo" type="text" placeholder="Add new todo" />
            <input class="reset-todos" type="button" value="Reset Todos" />
            <ul class="todo-list">
              <!-- todos go here -->
            </ul>
          </div>
        </div>
      </div>
    */

    // remove content
    this.rootElement.innerHTML = "";

    // todo-app
    const todoAppElem = document.createElement("div");
    todoAppElem.setAttribute("class", "todo-app");

    // title
    const headerElem = document.createElement("h1");
    headerElem.setAttribute("class", "title");
    headerElem.innerText = 'todos';
    todoAppElem.appendChild(headerElem);

    // todos
    const todosElem = document.createElement("div");
    todosElem.setAttribute("class", "todos");
    todoAppElem.appendChild(todosElem);

    // text input
    const textInpuElem = document.createElement("input");
    textInpuElem.setAttribute("class", "add-todo");
    textInpuElem.setAttribute("type", "text");
    textInpuElem.setAttribute("placeholder", "Add new todo");
    textInpuElem.addEventListener("keypress", this.handleKeyPress);
    todosElem.appendChild(textInpuElem);

    // reset button
    const buttonElem = document.createElement("input");
    buttonElem.setAttribute("class", "reset-todos");
    buttonElem.setAttribute("type", "button");
    buttonElem.setAttribute("value", "Reset Todos");
    buttonElem.addEventListener("click", this.resetTodosList);
    todosElem.appendChild(buttonElem);

    // todos list
    const todosListElem = document.createElement("ul");
    todosListElem.setAttribute("class", "todo-list");
    todosElem.appendChild(todosListElem);

    todos.forEach(todo => {
      // create todo `li` with `todo-item` class
      const todoElem = document.createElement("li");
      todoElem.setAttribute("class", "todo-item");

      if (todo.completed) {
        todoElem.classList.add("done")
      }

      // create description `span` with description text
      const descriptionElem = document.createElement("span");
      descriptionElem.setAttribute("class", "description");
      descriptionElem.innerText = todo.title;

      // register toggle click event listener
      descriptionElem.addEventListener("click", event =>
        this.toggleTodo(todo.id)
      );

      // create remove `span`
      const removeElem = document.createElement("span");
      removeElem.setAttribute("class", "remove");
      removeElem.innerText = "\u2716";

      // register remove click event listener
      removeElem.addEventListener("click", event => this.removeTodo(todo.id));

      // add DOM elements to list
      todoElem.appendChild(descriptionElem);
      todoElem.appendChild(removeElem);

      todosListElem.appendChild(todoElem);
    });

    this.rootElement.appendChild(todoAppElem);
  }
}

new TodosList(document.getElementById("root"));
new TodosList(document.getElementById("root2"));
