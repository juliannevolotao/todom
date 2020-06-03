let todoList = [];


// Ao clicar no botão salvar, cria-se uma tarefa
const createTodo = () => {

  let inputData = document.getElementById('inpt_todo').value;

  if(inputData.length !== 0){

    let formatedData = {
      id: todoList.length,
      text: inputData,
      done: false
    }

    todoList.push(formatedData);
    
    createTable(formatedData);

    localStorage.setItem('list', JSON.stringify(todoList));
  } 

}

// Cria-se uma linha da tabela
const createTable = (data, index) => {

  let line = document.createElement('tr');
  line.id

  let checkbox = document.createElement('input');
  checkbox.type = "checkbox";
 
  let deleteIcon = document.createElement('i');
  deleteIcon.className = "material-icons";
  deleteIcon.innerText = "delete";
  
  let colCheck = document.createElement('td');
  let colText = document.createElement('td');
  let colDelete = document.createElement('td');
  
  colCheck.appendChild(checkbox);
  colText.innerText = data.text;
  colDelete.appendChild(deleteIcon);
  
  line.appendChild(colCheck);
  line.appendChild(colText);
  line.appendChild(colDelete);

  // Se a tarefa já foi feita, mostrar visualmente
  if(data.done === true) {
    line.className="done";
    checkbox.checked = true;
  }

  // Evento de clique ao check
  checkbox.addEventListener('click',() => {

    // se foi concluído, muda sua aparência
    // e encontra o elemento concluído para alterá-lo no array de elementos
    if(checkbox.checked){
      line.className="done";
      checkTheTodo(data.id);

    } else{
      line.className="";
      checkTheTodo(data.id);
    }
  })

  line.addEventListener('click',() => {

    // se foi concluído, muda sua aparência
    // e encontra o elemento concluído para alterá-lo no array de elementos
    if(checkbox.checked){
      line.className="";
      checkTheTodo(data.id);
      checkbox.checked=false;

    } else{ 
      line.className="done";
      checkTheTodo(data.id);
      checkbox.checked=true;
    }
  })


  deleteIcon.addEventListener('click', () => {
    document.getElementById('table').removeChild(line);
    deleteTodo(data, index);
  })


  document.getElementById('table').appendChild(line); // Adiciona a linha criada à tabela
}

// 
const deleteTodo = (data, idx) => {
  
  console.log(data)
  console.log(todoList)
  console.log("index:" + idx)

  todoList.find((todo, index) => {
    if(idx === index){
      todoList.splice(index, 1);
    }
  })

  localStorage.setItem('list', JSON.stringify(todoList)); // atualiza o localStorage
}


// Procura o elemento no array para alterar seu valor para Done = true
const checkTheTodo = (id) => {
  todoList.find(todo => {
    if(todo.id === id) {
      todo.done ? todo.done = false : todo.done = true;
    }
  });

  localStorage.setItem('list', JSON.stringify(todoList)); // atualiza o localStorage
}


// Ao recarregar a página retorna os valores do localStorage
const loadPage = () => {
  if(localStorage.getItem('list')){
    todoList = JSON.parse(localStorage.getItem('list') );

    todoList.forEach((todo, index) => {
      createTable(todo, index);
    })
  }
  else {
    todoList = [];
  }
  
}
loadPage();