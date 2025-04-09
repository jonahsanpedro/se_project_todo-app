import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import TodoCounter from "../components/TodoCounter.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
// const todoTemplate = document.querySelector("#todo-template"); -> remove, this is now handled in the Todo class. leave for now to compare.
// Removed unused todosList declaration

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
  }
  todoCounter.updateTotal(false);
}

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const name = inputValues.name;
    const dateInput = inputValues.date;

    // Create a date object and adjust for timezone
    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();

    const values = { name, date, id };
    const todo = generateTodo(values); // Generate the todo item
    section.addItem(todo); // Append the todo item to the list
    todoCounter.updateTotal(true); // Update the total count
    addTodoValidator.resetValidation(); // Reset the form validation

    addTodoPopup.close();
  },
});

addTodoPopup.setEventListeners();

// The logic in this function should all be handled in the Todo class.
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView();
  return todoElement;
};

//instantiate the section class here
const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = generateTodo(item); // Generate the todo item
    section.addItem(todo); // Append the todo item to the container
  },
  containerSelector: ".todos__list",
});
//call renderItems to render the initial todos
section.renderItems();

// const closeModal = (modal) => {
//   modal.classList.remove("popup_visible");
// };

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

addTodoCloseBtn.addEventListener("click", () => {
  addTodoPopup.close();
});

// addTodoForm.addEventListener("submit", (evt) => {
//   evt.preventDefault();
//   const name = evt.target.name.value;
//   const dateInput = evt.target.date.value;

//   // Create a date object and adjust for timezone
//   const date = new Date(dateInput);
//   date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

//   const id = uuidv4();

//   const values = { name, date, id };
//   const todo = generateTodo(values); // Generate the todo item
//   section.addItem(todo); // Append the todo item to the list

//   addTodoValidator.resetValidation(); // Reset the form validation

//   addTodoPopup.close();
// });

const addTodoValidator = new FormValidator(validationConfig, addTodoForm);
addTodoValidator.enableValidation();
// The FormValidator class is now being imported from the FormValidator.js file.
