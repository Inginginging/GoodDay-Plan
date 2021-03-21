const toDoForm = document.querySelector(".js-todoform"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-todolist"),
    finishedList = document.querySelector(".js-finishedList");

const TODO_LS = "todos";
const FIN_LS = "finished";

let toDos = [];
let finished = [];

function handleDeleteToDo(event){
    let btn = event.target;
    let li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDo = toDos.filter(function(todo){  //filter로 인해 toDos의 모든 요소를 돌아. todo.id=1,2,3,4모두 반환. 하지만. li.id는 클릭한 id만 반환.
        return todo.id !== parseInt(li.id);
    });
    toDos= cleanToDo;
    saveToDos();
}

function handleDeleteFin(e){
    let btn = e.target;
	let li = btn.parentNode;

	finishedList.removeChild(li);
	const cleanFins = finished.filter(function(fin) {
		return fin.id !== parseInt(li.id);
	});
	finished = cleanFins;
	saveFinished();
}

function backTodo(e) {
    let btn = e.target;
	let li = btn.parentNode;
	toDoList.appendChild(li);
	btn.innerHTML = "👇";
	btn.removeEventListener("click", backTodo);
	btn.addEventListener("click", finishedToDo);
	const delBtn = btn.nextSibling;
	delBtn.removeEventListener("click", handleDeleteFin);
	delBtn.addEventListener("click",  handleDeleteToDo);

	let text = li.querySelector("span").innerHTML;
	let id = parseInt(li.id);
	const toDoObj = {
		text: text,
		id: id
	}
	toDos.push(toDoObj);

	const delFins = finished.filter(function(fin) {
		return fin.id !== parseInt(li.id);
	});
	finished = delFins;
	saveFinished();
}

function finishedToDo(e) {
	let btn = e.target;
	let li = btn.parentNode;
	finishedList.appendChild(li);
	btn.innerHTML = "👆";
	btn.addEventListener("click", backTodo);
	const delBtn = btn.nextSibling;
	delBtn.removeEventListener("click", handleDeleteToDo);
	delBtn.addEventListener("click", handleDeleteFin);

	let text = li.querySelector("span").innerHTML;
	let id = parseInt(li.id);
	const finObj = {
		text: text,
		id: id
	}
	finished.push(finObj);

	const delToDos = toDos.filter(function(toDo) {
		return toDo.id !== parseInt(li.id);
	});
	toDos = delToDos;
	saveToDos();
}


function saveToDos(){
    localStorage.setItem(TODO_LS,JSON.stringify(toDos)); //local storage는 모든것을 string화 하여 저장. 그러므로 obj를 저장 하면 "obj"로 저장됨
}

function paintTodos(text){
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    const newId = toDos.length+1;
    delBtn.innerText = '❌';
    delBtn.addEventListener('click',handleDeleteToDo);
    const goBtn = document.createElement("button");
    goBtn.innerText = '👇'
    goBtn.addEventListener('click', finishedToDo);
    span.innerText=text;
    const li = document.createElement("li");
    li.id=newId;
    li.appendChild(span);
    li.appendChild(goBtn);
    li.appendChild(delBtn);
    toDoList.appendChild(li);
    const toDoObj ={
        text:text,
        id:newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function saveFinished(){
    localStorage.setItem(FIN_LS,JSON.stringify(finished));
}

function paintFinished(text){
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    delBtn.innerText='❌'
    delBtn.addEventListener('click', handleDeleteFin);
    const backBtn = document.createElement("button");
    backBtn.innerText='👆'
    backBtn.addEventListener('click', backTodo);
    const newID = finished.length+1;
    const li = document.querySelector("li");
    li.appendChild(span);
    li.appendChild(backBtn);
    li.appendChild(delBtn);
    li.id=newID;
    finishedList.appendChild(li);
    const finObj ={
        text: text,
        is: newID
    };
    finished.push(finObj);
    saveFinished();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue =  toDoInput.value;
    paintTodos(currentValue);
    toDoInput.value="";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODO_LS);
    const loadedFinished = localStorage.getItem(FIN_LS);
    if(loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos); //console.log(parsedToDos)를 하면 배열임. ㅇㅇ 배열과 string은 다른것.
        parsedToDos.forEach(function(toDo){
            paintTodos(toDo.text);
        });
    }
    if(loadedFinished !== null){
        const parsedFinished = JSON.parse(loadedFinished);
        parsedFinished.forEach(function(fins){
            paintFinished(fins.text);
        });
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();