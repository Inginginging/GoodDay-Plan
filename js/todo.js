const toDoForm = document.querySelector(".js-todoform"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-todolist");

const TODO_LS = "todos"

let toDos = [];

function handleDelete(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDo = toDos.filter(function(todo){  //filter로 인해 toDos의 모든 요소를 돌아. todo.id=1,2,3,4모두 반환. 하지만. li.id는 클릭한 id만 반환.
        return todo.id !== parseInt(li.id);
    });
    toDos= cleanToDo;
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODO_LS,JSON.stringify(toDos)); //local storage는 모든것을 string화 하여 저장. 그러므로 obj를 저장 하면 "obj"로 저장됨
}

function paintTodos(text){
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    const newId = toDos.length+1;
    delBtn.innerText = '⭕';
    delBtn.addEventListener('click',handleDelete);
    span.innerText=text;
    const li = document.createElement("li");
    li.id=newId;
    li.appendChild(span);
    li.appendChild(delBtn);
    toDoList.appendChild(li);
    const toDoObj ={
        text:text,
        id:newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue =  toDoInput.value;
    paintTodos(currentValue);
    toDoInput.value="";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODO_LS);
    if(loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos); //console.log(parsedToDos)를 하면 배열임. ㅇㅇ 배열과 string은 다른것.
        parsedToDos.forEach(function(toDo){
            paintTodos(toDo.text);
        })
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();