import { addNewToDo } from '../models/toDoListModel';

let form;

export function addToDoController() {
    form = document.querySelector('#add-todo-form');

    form.addEventListener('submit', onSubmit);
}

function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const todoData = {};
    
    for (let [key, value] of formData.entries()) {
        todoData[key] = value;
    }

    addNewToDo(todoData);

    form.reset();
}
