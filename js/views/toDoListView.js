import { toDoItemTemplate } from "../templates/toDoItemTemplate";
import { subscribe } from '../models/toDoListModel';
import { deleteToDoController } from "../controllers/deleteToDoController";
import { updateToDoController } from "../controllers/updateToDoController";
import { addNewToDoController } from "../controllers/addNewToDoController"; 

export function toDoListView() {
    const addButton = document.querySelector('#add');
    addButton.addEventListener('click', addNewToDoController); 
}

subscribe(render);

function render(data) {
    const div = document.createElement('div');
    const toDoList = document.querySelector('#item-container');
    toDoList.replaceChildren();

    data.forEach((item) => {
        div.prepend(toDoItemTemplate(item));
    });

    toDoList.append(div);
}

function onHandleClick(e) {
    switch (e.target.id) {
        case 'delete':
            deleteToDoController(e.target.dataset.uid);
            break;
        case 'edit':
            console.log(e.target.dataset.uid);
            updateToDoController(e.target.dataset.uid);
            break;
        default:
            null;
    }
}
