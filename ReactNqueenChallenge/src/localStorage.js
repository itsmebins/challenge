export function saveToLocalStorage(key, value){
    return window.localStorage.setItem(key, JSON.stringify(value))
}

export function loadFromLocalStorage(key){
    return JSON.parse(window.localStorage.getItem(key))
}

//localStore.save('todoList', this.state.todoList)
