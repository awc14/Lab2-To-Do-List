import {ref, set, get, push, remove, update} from 'firebase/database';
import {db} from '../lib/firebase/config/firebaseInit';
import {createStore, removeFromStore, updateStore} from './store';

let observers = [];

export function subscribe(fn) {
    observers.push(fn);
    console.log(observers);
}

export function notify(data) {
    observers.forEach((observer) => observer(data));
}

export async function getToDoData() {
    const dbRef = ref(db, 'todos');
    const response = await get(dbRef);
    let payload = await response.val();
    payload = Object.entries(payload);
    let toDoItems = payload.map((item) => {
        return {...item[1], uid: item[0]};
    });
    if (await createStore(toDoItems)) {
        notify(toDoItems);
    }
}

export function deleteToDo(uid) {
    const dbRef = ref(db, `todos/${uid}`);  
    remove(dbRef);
    const store = removeFromStore(uid);
    notify(store);
}

export function updateToDo(updatedToDo) {
    let payload = updatedToDo;
    const dbRef = ref(db, `todos/${payload.uid}`);
    update(dbRef, payload);
    const store = updateStore(payload);
    notify(store);
}

export async function addNewToDo(todoData) {
    const dbRef = ref(db, 'todos');
    const newTodoRef = push(dbRef);
    await set(newTodoRef, todoData);
    const snapshot = await get(newTodoRef);
    const newTodo = snapshot.val();
    const newTodoWithUid = { ...newTodo, uid: newTodoRef.key };
    if (await createStore(newTodoWithUid)) {
        notify(newTodoWithUid);
    }
}
